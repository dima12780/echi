import { score } from './score';
import { operation } from './operation';


export interface user {
    id: number;
    Name: string;
    Email: string;
    Password: string;
    scores: score [];
    friends?: number[];
    history?: operation[];
  }