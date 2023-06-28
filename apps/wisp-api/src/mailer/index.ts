import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";

export class Mailer {
  transporter: any;
  readonly user: string | undefined = process.env.USERID;
  readonly pass: string | undefined = process.env.PASSWORD;
  constructor() {
    console.log(this.user, this.pass);
    if (this.user && this.pass) {
      this.transporter = nodemailer.createTransport({
        service: "hotmail",
        auth: {
          user: this.user,
          pass: this.pass,
        },
      });
      console.log("mailer created");
    } else {
      console.error("issue with mailer configuration");
    }
  }

  sendEmail(message: Mail.Options) {
    this.transporter.sendMail(message, (err: any, info: any) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(info.response);
    });
  }
}
