import nodemailer from "nodemailer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import Handlebars from "handlebars";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const verifyEmail = async (email, token) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  const emailTemplateSource = fs.readFileSync(
    path.join(__dirname, "emailTemplate.hbs"),
    "utf-8"
  );
  const template = Handlebars.compile(emailTemplateSource);
  const htmlToSend = template({ token: encodeURIComponent(token) });

  const mailConfigurations = {
    from: process.env.MAIL_USER,
    to: email,
    subject: "Email verification",
    html: htmlToSend,
  };

  transporter.sendMail(mailConfigurations, function (error, info) {
    if (error) {
      throw new Error(error);
    }
    console.log("Mail send successfully");
    console.log(info);
  });
};
