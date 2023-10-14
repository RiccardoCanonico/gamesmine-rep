import {Game} from './app/shared/models/Game'; 
export const sample_games: Game[] = [
    {
        id: '1',
        name: 'Dark Souls 3',
        price: 20,
        genre: ['RPG', 'Soulslike'],
        imageUrl: 'assets/img/DarkSouls3.png',
        stars: 5.0
    },
    {
        id: '2',
        name: 'Mortal Kombat 1',
        price: 60,
        genre: ['Fighting Game', 'Multiplayer'],
        imageUrl: 'assets/img/MortalKombat1.png',
        stars: 4.0
    },
    {
        id: '3',
        name: 'Red Dead Redemption 2',
        price: 60,
        genre: ['Open World', 'Action', 'Singleplayer'],
        imageUrl: 'assets/img/RDR2.png',
        stars: 5.0
    },
]