"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const nodemailer_1 = __importDefault(require("nodemailer"));
const custom_error_1 = require("../errors/custom-error");
const Contact_1 = __importDefault(require("../models/Contact"));
const http_status_codes_1 = require("http-status-codes");
const sendContact = async (req, res, next) => {
    try {
        const { name, email, message } = req.body;
        if (!name || !email || !message) {
            return next((0, custom_error_1.createCustomError)("All fields required", http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
        await Contact_1.default.create({
            name,
            email,
            message,
            ip: req.ip,
        });
        const transporter = nodemailer_1.default.createTransport({
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
        res.status(http_status_codes_1.StatusCodes.OK).json({
            success: true,
            msg: "Email sent successfully",
        });
    }
    catch (error) {
        console.error(error);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            msg: "Failed to send message",
        });
    }
};
exports.default = sendContact;
