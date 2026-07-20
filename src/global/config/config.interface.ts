import { Note } from "src/notes/notes.interface";
import { Users } from "src/users/users.interface";

export interface ConfigOptions {
  appName: string;
  maxNotes: number;
  apiVersion: string;
  environment: string;
  readOnlyMode: boolean;
  database: Note[];
  userDatabase: Users[];
}