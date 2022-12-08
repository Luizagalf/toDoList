import { Note } from "types/Note";

export type Col = { name: string; items: Note[] };
export type Cols = { [key: string]: Col };
