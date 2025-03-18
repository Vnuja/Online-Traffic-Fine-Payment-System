import { MailtrapClient } from "mailtrap";
import dotenv from 'dotenv';

dotenv.config({path: "backend/DB/config.env"});

const TOKEN = process.env.MAILTRAP_TOKEN;

const client = new MailtrapClient({
  token: TOKEN,
  testInboxId: 3526291,
});

const sender = {
  email: "hello@example.com",
  name: "Mailtrap Test",
};
const recipients = [
  {
    email: "haritha15sandaruwan@gmail.com",
  }
];

client.testing
  .send({
    from: sender,
    to: recipients,
    subject: "You are awesome!",
    text: "Congrats for sending test email with Mailtrap!",
    category: "Integration Test",
  })
  .then(console.log, console.error);