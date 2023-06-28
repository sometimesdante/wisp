import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import Mail from "nodemailer/lib/mailer";
import { Friday } from "./friday/friday";
import bodyParser from "body-parser";
import { IFridayQuery } from "./types/IFridayQuery";
import { Mailer } from "./mailer";

dotenv.config({ path: "src/.env" });

const app: Express = express();
const port = process.env.PORT;
const friday = new Friday();
const mailer = new Mailer();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req: Request, res: Response) => res.send("Echo"));
app.post("/", (req: Request, res: Response) => res.send("Echo"));

app.post("/send-mail", (req: Request, res: Response) => {
  let { to, subject, text }: Mail.Options = req.body;
  console.log("sending email");
  const message: Mail.Options = {
    from: "meudco@outlook.com",
    to,
    subject,
    html: `
      <html>
      <style>
          .mail-body{
              border: 2px solid red;
          }
          b {
              color: red;
          }
      </style>
      <div class="mail-body">
          ${text}
      </div>
      </html>
      `,
  };

  mailer.sendEmail(message);
  res.send("Triggered");
});

app.post("/ask-friday", async (req: Request, res: Response) => {
  let body: IFridayQuery = req.body;
  await friday
    .sendMessage(body.query, body.conversation)
    .then((d) => res.send(d));
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
