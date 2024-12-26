import {MailtrapClient} from "mailtrap";
import dotenv from "dotenv";
dotenv.config();
export const mailTrapClient = new MailtrapClient({
    token: process.env.MAILTRAP_KEY,

});

export const sender = {
    email: "Anonymous@demomailtrap.com",
    name: "Anonymous 👁‍🗨",
};
