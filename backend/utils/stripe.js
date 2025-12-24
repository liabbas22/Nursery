import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config(); // Load env if not already done

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY not found in .env");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-04-10",
});

export default stripe;
