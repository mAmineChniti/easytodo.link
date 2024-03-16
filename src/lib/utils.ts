import { generateRandomString, alphabet } from "oslo/crypto";

export type Task = {
  id: string;
  description: string;
  is_completed: boolean;
}

export type List = {
  id: string;
  title: string;
  tasks: Task[];
}

export function generateId() {
  return generateRandomString(10, alphabet("a-z", "0-9"));
}
