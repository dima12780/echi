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
    },

]