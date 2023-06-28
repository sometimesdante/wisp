export interface IConversation {
  role: "user" | "assistant";
  content: string;
}

export interface IFridayQuery {
  query: string;
  conversation: Array<IConversation>;
}
