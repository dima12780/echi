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
  public hash: string;

    constructor(data : any) {
      this.id = data.id;
      this.Name = data.name;
      this.Email = data.email;
      this.Password = data.pass;
      this.scores = data.scores ?? [];
      this.friends = data.friends ?? [];
      this.history = data.history ?? [];
      this.hash = data.hash;
    }
  }