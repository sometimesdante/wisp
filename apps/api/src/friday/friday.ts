import { Configuration, OpenAIApi } from "openai";
import { IConversation, IFridayQuery } from "../types/IFridayQuery";

export class Friday {
  readonly configuration: Configuration;
  readonly openAi: OpenAIApi;
  constructor() {
    this.configuration = new Configuration({
      apiKey: process.env.FRIDAY_KEY,
    });

    this.openAi = new OpenAIApi(this.configuration);
  }
  async sendMessage(message: string, old: Array<IConversation>): Promise<any> {
    const query: IConversation = { role: "user", content: message };
    const conversationTillNow: Array<IConversation> = [...old, query];

    return await this.openAi
      .createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: conversationTillNow,
      })
      .then((chatCompletion) => {
        return {
          new: chatCompletion.data.choices,
          old: [...conversationTillNow, chatCompletion.data.choices[0].message],
        };
      })
      .catch((err) => console.log(err));
  }
}
