import express from "express";
import Stripe from "stripe";
import { getEnvVariable } from "../utils/env";
import { authenticateUser } from "../middleware/authMiddleware";

const router = express.Router();

const stripe = new Stripe(getEnvVariable("STRIPE_SECRET_KEY"));

router.post("/create-checkout", async (req, res) => {
  try {
    const { amount, name } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "zar",
            product_data: { name: `☕ Tip from ${name || "Anonymous"}` },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/?tip=success`,
      cancel_url: `${process.env.CLIENT_URL}/?tip=cancelled`,
      metadata: { name: name || "Anonymous" },
    });
    res.json({ url: session.url });
  } catch (err: any) {
    console.error("Stripe error:", err.message);
    res.status(500).json({ msg: err.message });
  }
});

router.get("/", authenticateUser, async (req, res) => {
  try {
    const sessions = await stripe.checkout.sessions.list({
      limit: 50,
      expand: ["data.line_items"],
    });
    const paid = sessions.data.filter((s) => s.payment_status === "paid");
    res.json({ tips: paid });
  } catch (err: any) {
    console.error("Stripe fetch error:", err.message);
    res.status(500).json({ msg: err.message });
  }
});

export default router;
