export type reaction = "good" | "bad" | "ok";

export type Question = {
  uid: string;
  id: number;
  type: string;
  question: number;
  chats: string[2];
  choices: string[3];
  reactions_table: reaction[3][4];
};
