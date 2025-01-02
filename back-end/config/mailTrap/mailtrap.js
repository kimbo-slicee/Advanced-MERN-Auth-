import {MailtrapClient} from "mailtrap";
import dotenv from "dotenv";
dotenv.config();
export const mailTrapClient = new MailtrapClient({
    token: process.env.MAILTRAP_KEY,

});

export const sender = {
    email: "no-replay@demomailtrap.com",
    name: "no-reply",
};
