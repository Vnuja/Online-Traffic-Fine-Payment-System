import { MailtrapClient } from "mailtrap";

const TOKEN = "04e40ee3fc64e8c14a4b789825833a7c";

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