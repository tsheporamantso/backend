import "dotenv/config";
import nodemailer from "nodemailer";
import Contact from "../models/Contact";
import { StatusCodes } from "http-status-codes";
import { asyncWrapper } from "../middleware/async";
import { NextFunction, Request, Response } from "express";
import { BadRequest } from "../errors/bad-request";
import { createCustomError } from "../errors/custom-error";

export const sendContact = asyncWrapper(async (req: Request, res: Response) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    throw new BadRequest("All fields required");
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
});

export const getContacts = asyncWrapper(async (req: Request, res: Response) => {
  const contacts = await Contact.find({}).sort({ createdAt: -1 });

  res.status(StatusCodes.OK).json({
    success: true,
    nbHits: contacts.length,
    contacts,
  });
});

export const deleteContact = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id: contactId } = req.params;

    const contact = await Contact.findOneAndDelete({ _id: contactId });

    if (!contact) {
      return next(
        createCustomError(
          `No contact found with id: ${contactId}`,
          StatusCodes.NOT_FOUND,
        ),
      );
    }
    res.status(StatusCodes.OK).json({
      success: true,
      msg: "Message deleted",
    });
  },
);
