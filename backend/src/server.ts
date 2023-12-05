import express from "express";
import cors from "cors";
import { sample_games } from "./data";

const app = express();
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

const port = 5000;
app.listen(port, () => {
    console.log("Website served on http://localhost:" + port);
})


