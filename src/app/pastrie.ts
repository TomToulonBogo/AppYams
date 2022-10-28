import { Favorite } from "./pastrie-details/pastrie-details.component";

export interface Pastrie {
    id: string;
    ref: string;
    name: string;
    description: string;
    quantity: number;
    order: number;
    url?: string;
    tags?: Array<string>
    like?: string;
    priority: Favorite;
  }
  
  export interface List {
    id: string;
    list: Array<string>;
  }