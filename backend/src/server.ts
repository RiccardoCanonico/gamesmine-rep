import express from "express";
import cors from "cors";
import { sample_games, sample_users } from "./data";
import jwt from "jsonwebtoken";

const app = express();
app.use(express.json());

app.use(cors({
    credentials:true,
    origin:["http://localhost:4200"]
}))

app.get("/api/games", (req, res) => {
    res.send(sample_games);
})

app.get("/api/games/search/:searchTerm", (req, res) => {
    const searchTerm = req.params.searchTerm;
    const games = sample_games.filter((game) => game.name.toLowerCase().includes(searchTerm.toLowerCase()));
    res.send(games);
})

app.get("/api/games/:gameId", (req, res) => {
    const gameId = req.params.gameId;
    const game = sample_games.find((game) => game.id == gameId);
    res.send(game);
})

app.post("/api/users/login", (req, res) => {
    const {email, password} = req.body
    const user = sample_users.find(user => user.email === email && user.password === password);

    if(user){
        res.send(generateTokenResponse(user));
    }
    else{
        res.status(400).send("Email or password not valid")
    }
})

const generateTokenResponse = (user:any) => {
    const token = jwt.sign({
        email:user.email, isAdmin:user.isAdmin
    }, "Random", {
        expiresIn: "30d"
    });

    user.token = token;
    return user;
}

const port = 5000;
app.listen(port, () => {
    console.log("Website served on http://localhost:" + port);
})


