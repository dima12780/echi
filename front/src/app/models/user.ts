import { score } from './score';
import { operation } from './operation';


export class user {
  public readonly id: number;
  public Name: string;
  public Email: string;
  public Password: string;
  public scores?: score[];
  public friends?: number[];
  public history?: operation[];


    constructor(id: number, name: string, email: string, pass: string, scores?: score[], friends?: number[], history?: operation[]) {
      this.id = id;
      this.Name = name;
      this.Email = email;
      this.Password = pass;
      this.scores = scores;
      this.friends = friends;
      this.history = history;
    }
  }