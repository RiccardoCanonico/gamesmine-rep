const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const mysql = require("mysql2");
const bodyParser = require('body-parser');

const app = express();
app.use(express.json());

app.use(cors({
    credentials:true,
    origin:["http://localhost:4200"]
}));

let conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Riccardo.2001",
    database: "gamesmine"
});

conn.connect(function(err){
    if(err) throw err;
    console.log("Connessione avvenuta");
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get("/api/games", (req, res) => {
    getAllGames(res);
});

app.get("/api/games/search/:searchTerm", (req, res) => {
    //const searchTerm = req.params.searchTerm;
    //const games = sample_games.filter((game) => game.name.toLowerCase().includes(searchTerm.toLowerCase()));
    getGameBySearch(req.params.searchTerm, res);
});

app.get("/api/games/:gameId", (req, res) => {
    getGameById(req.params.gameId, res);
});

app.post("/api/users/login", (req, res) => {
    const {email, password} = req.body;
    login({email, password}, res);
});

app.post("/api/users/register", (req, res) => {
    let user = req.body;
    register(user, res);
});

app.post("/api/order", (req, res) => {
    const {userId, gameId, totalPrice} = req.body;
    addOrder({userId, gameId, totalPrice}, res);
})

app.get("/api/users/orders/:userToken", (req, res) => {
    getAllUserOrders(req.params.userToken, res);
})

app.get("/api/admin/orders", (req, res) => {
    getAllOrdersAdmin(res);
})

app.get("/api/admin/users", (req, res) => {
    getAllUsersAdmin(res);
})

app.post("/api/admin/insert-product", (req, res) => {
    let game=req.body;
    insertProduct(game, res);
})

app.delete("/api/admin/delete-product/:gameId", (req, res) => {
    deleteProduct(req.params.gameId, res);
})

app.put("/api/admin/update-product/:gameId", (req, res) => {
    let game = req.body;
    updateProduct(req.params.gameId, game, res);
})

const generateTokenResponse = (user) => {
    const token = jwt.sign({
        email:user.email, isAdmin:user.isAdmin
    }, "Random", {
        expiresIn: "30d"
    });

    user.token = token;
    return user;
};


function getAllGames(res) {
    conn.query("SELECT * FROM game", 
        function(errSQL, resSQL) {
            if(errSQL) {
                resSQL="null";
            } 
            res.json(resSQL);
        }
    );
}

function getGameById(gameId, res) {
    conn.query(`SELECT * FROM game WHERE id=${parseInt(gameId)}`, 
        function(errSQL, resSQL) {
            if(errSQL) {
                resSQL="null";
            } 
            res.json(resSQL[0]);
        }
    );
}

function getGameBySearch(searchTerm, res) {
    conn.query(`SELECT * FROM game WHERE name LIKE '%${searchTerm}%'`, 
        function(errSQL, resSQL) {
            if(errSQL){
                resSQL = "null";
            }
            res.json(resSQL);
        }
    );    
}

function login({email, password}, res){
    let user;
    conn.query(`SELECT * FROM user WHERE email="${email}" AND password="${password}"`, 
        function(errSQL, resSQL){
            if(errSQL){
                resSQL="null";
            }

            user = resSQL[0];

            if(user){
                res.json(generateTokenResponse(user));
                conn.query(`UPDATE user SET token="${user.token}" WHERE id=${user.id}`);
            }
            else{
                res.status(400).send("Email or password not valid")
            }
        }
    );
}

function register(user, res){
    conn.query(`SELECT email FROM user WHERE email="${user.email}"`, 
        (errSQL, resSQL) => {
            if(errSQL){
                resSQL="null";
            }
            else if(resSQL[0]){
                res.end("User already registered");
            }
            else{
                conn.query(`INSERT INTO user (email, password, name, address, isAdmin) VALUES ("${user.email}", "${user.password}", "${user.name}", "${user.address}", 0)`,
                    function(errSQL, resSQL){
                        if(errSQL) 
                            res.end("Error: "+errSQL);
                        else 
                            res.json(user);
                    }
                );
            }
        }
    );
}

function addOrder({userId, gameId, totalPrice}, res){
    conn.query(`INSERT INTO orders (userId, totalPrice) VALUES (${userId}, ${totalPrice})`,
        function(errSQL, resSQL){
            if(errSQL){
                res.end("Error: "+errSQL);
            }
            else{
                conn.query(`SELECT LAST_INSERT_ID()`, 
                    function(errSQL, resSQL){
                        if(errSQL){
                            resSQL="null";
                        }
                        else{
                            let orderId = resSQL[0]["LAST_INSERT_ID()"];
                    
                            let query = `INSERT INTO order_games (orderId, gameId) VALUES `;
                            for(let i=0; i < gameId.length; i++){
                                query+=`(${parseInt(orderId)}, ${parseInt(gameId[i])}),`;
                            }

                            query=query.slice(0, -1);
                           
                            conn.query(query, 
                                function(errSQL, resSQL){
                                    if(errSQL){
                                        res.end("Error: "+errSQL);
                                    }
                                    else{
                                        res.json({userId, gameId, totalPrice});
                                    }
                            });
                        }
                    }
                );
            }
        } 
    );
}

function getAllUserOrders(userToken, res){
    conn.query(`SELECT id FROM user WHERE token = "${userToken}"`, 
        function(errSQL, resSQL){
            if(errSQL){
                resSQL = "null";
            }
            else{
                let userId;
                userId = resSQL[0]["id"];
                conn.query(`SELECT orders.id, userId, totalPrice, name, imageUrl FROM ((orders INNER JOIN order_games ON orders.id = order_games.orderId) INNER JOIN game ON order_games.gameId = game.id) WHERE userId=${userId} ORDER BY orders.id`,
                    function(errSQL, resSQL){
                        if(errSQL){
                            resSQL = "null";
                        }
                        else{
                            res.json(resSQL);
                        }
                    }
                );
                 
            }
        }
    );
}

function getAllOrdersAdmin(res){
    conn.query(`SELECT orders.id, userId, totalPrice, game.name, imageUrl, email FROM user, ((orders INNER JOIN order_games ON orders.id = order_games.orderId) INNER JOIN game ON order_games.gameId = game.id) WHERE orders.userId = user.id ORDER BY orders.id`,
        function(errSQL, resSQL){
            if(errSQL){
                resSQL = "null";
            }
            else{
                res.json(resSQL);
            }
        }
    );
}

function getAllUsersAdmin(res){
    conn.query(`SELECT id, email, name, address FROM user WHERE isAdmin != 1`, 
        function(errSQL, resSQL){
            if(errSQL){
                resSQL="null";
            }
            else{
                res.json(resSQL);
            }
        }
    );
}

function insertProduct(game, res){
    conn.query(`SELECT * FROM game WHERE name = "${game.name}"`, 
        function(errSQL, resSQL){
            if(errSQL){
                resSQL="null";
            }
            else if(resSQL[0]){
                res.end("Product already existing");
            }
            else{
                conn.query(`INSERT INTO game (name, price, genre, imageUrl, stars, description) VALUES ("${game.name}", ${game.price}, json_array('${game.genre}'), "${game.imageUrl}", ${game.stars}, "${game.description}")`, 
                    function(errSQL, resSQL){
                        if(errSQL){
                            res.end("Error: "+errSQL);
                        }
                        else{
                            res.json(game);
                        }
                    }
                );
            }
        }
    );
}

function deleteProduct(gameId, res){
    conn.query(`DELETE FROM order_games WHERE gameId = ${gameId}`, 
        function(errSQL, resSQL){
            if(errSQL){
                res.end("Error: "+errSQL);
            }
            else{
                conn.query(`DELETE FROM game WHERE id = ${gameId}`, 
                   function(errSQL, resSQL){
                    if(errSQL){
                        res.end("Error: "+errSQL);
                    }
                    else{
                        res.json("Product eliminated");
                    }
                   }
                );
            }
        }
    );
}

function updateProduct(gameId, game, res){
    conn.query(`UPDATE game SET name="${game.name}", price=${game.price}, genre=json_array('${game.genre}'), imageUrl="${game.imageUrl}", stars=${game.stars}, description="${game.description}" WHERE id=${gameId}`, 
        function(errSQL, resSQL){
            if(errSQL){
                res.end("Error: "+errSQL);
            }
            else{
                res.json(game);
            }
        }
    );
}


const port = 5000;
app.listen(port, () => {
    console.log("Website served on http://localhost:" + port);
});
