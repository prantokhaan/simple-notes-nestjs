import { Note } from "src/notes/notes.interface";
import { Users } from "src/users/users.interface";

export interface ConfigOptions {
  maxNotes: number;
  apiVersion: string;
  environment: string;
  readOnlyMode: boolean;
  database: Note[];
  userDatabase: Users[];
}