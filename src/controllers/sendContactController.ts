require("dotenv").config();
import nodemailer from "nodemailer";
import { NextFunction, Request, Response } from "express";
import { createCustomError } from "../errors/custom-error";
import Contact from "../models/Contact";
import { StatusCodes } from "http-status-codes";

const sendContact = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return next(
        createCustomError("All fields required", StatusCodes.BAD_REQUEST),
      );
    }

    // Save to DB
    await Contact.create({
      name,
      email,
      message,
      ip: req.ip,
    });

    // Send email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: email,
      subject: `New email from ${name}`,
      html: `
      <h2>New Contact Message</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong> ${message}</p>
    `,
    });
    res.status(StatusCodes.OK).json({
      success: true,
      msg: "Email sent successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      msg: "Failed to send message",
    });
  }
};

module.exports = sendContact;
