import "dotenv/config";
import nodemailer from "nodemailer";
import Contact from "../models/Contact";
import { StatusCodes } from "http-status-codes";
import { asyncWrapper } from "../middleware/async";
import { NextFunction, Request, Response } from "express";
import { BadRequest } from "../errors/bad-request";
import { createCustomError } from "../errors/custom-error";

/**
 * @swagger
 * tags:
 *   name: Contacts
 *   description: Contact form submissions and message management
 */

/**
 * @swagger
 * /contacts:
 *   post:
 *     summary: Submit a contact message
 *     tags: [Contacts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - message
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               message:
 *                 type: string
 *                 example: I'd love to collaborate with you!
 *     responses:
 *       200:
 *         description: Message sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 msg:
 *                   type: string
 *                   example: Email sent successfully
 *       400:
 *         description: Missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
export const sendContact = asyncWrapper(async (req: Request, res: Response) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    throw new BadRequest("All fields required");
  }

  await Contact.create({ name, email, message, ip: req.ip });

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

  res
    .status(StatusCodes.OK)
    .json({ success: true, msg: "Email sent successfully" });
});

/**
 * @swagger
 * /contacts:
 *   get:
 *     summary: Retrieve all contact messages
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all contact messages
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 nbHits:
 *                   type: integer
 *                   example: 3
 *                 contacts:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Contact'
 *       401:
 *         description: Unauthorized — JWT token missing or invalid
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
export const getContacts = asyncWrapper(async (req: Request, res: Response) => {
  const contacts = await Contact.find({}).sort({ createdAt: -1 });

  res.status(StatusCodes.OK).json({
    success: true,
    nbHits: contacts.length,
    contacts,
  });
});

/**
 * @swagger
 * /contacts/{id}:
 *   delete:
 *     summary: Delete a contact message by ID
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the contact message
 *         example: 64b7f2c9e4b0a12345678901
 *     responses:
 *       200:
 *         description: Message deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 msg:
 *                   type: string
 *                   example: Message deleted
 *       401:
 *         description: Unauthorized — JWT token missing or invalid
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Contact not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
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

    res.status(StatusCodes.OK).json({ success: true, msg: "Message deleted" });
  },
);
