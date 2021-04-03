import { user } from '../models/user';
import { Scores } from './mock-score';
import { Operation } from './mock-operation';

export const Users: user[] = [
    {
        id: 1,
        Name: 'Dima',
        Email: "dima@yandex.ru",
        Password: "123",
        scores: Scores,
        friends: [2, 3],
        history: Operation
    },{
        id: 2,
        Name: 'Weren',
        Email: "@google.com",
        Password: "345",
        scores: [Scores[1]] 
    },{
        id: 3,
        Name: 'Marina',
        Email: "@org.su",
        Password: "456",
        scores: [Scores[2]]
    },{
        id: 4,
        Name: 'Wow',
        Email: "",
        Password: "1",
        scores: []
    },{
        id: 5,
        Name: 'Anna Maria',
        Email: "",
        Password: "1",
        scores: []
    },{
        id: 6,
        Name: 'Tony Stark',
        Email: "",
        Password: "111",
        scores: [Scores[6]],
        friends: [5, 7, 3],
        history: Operation
    },{
        id: 7,
        Name: 'Vasya Pypcin',
        Email: "",
        Password: "0",
        scores: []
    },{
        id: 8,
        Name: 'Lida Pypcina',
        Email: "",
        Password: "0",
        scores: []
    },{
        id: 9,
        Name: 'asd',
        Email: "",
        Password: "0",
        scores: []
    },{
        id: 10,
        Name: 'abcde',
        Email: "",
        Password: "0",
        scores: []
    },{
        id: 11,
        Name: 'asd_1',
        Email: "",
        Password: "0",
        scores: []
    },{
        id: 12,
        Name: 'waw"WWW"',
        Email: "",
        Password: "0",
        scores: []
    },

]