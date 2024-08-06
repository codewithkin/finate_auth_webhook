import cors from "cors";

import {config} from "dotenv";
config()
const port = 3000;
import express from "express"
const app = express();
app.use(cors());
import updateSupabaseUser from "./utils/supabase.js";

app.use(express.json()); // for parsing application/json

import { Webhook } from "svix";
import bodyParser from "body-parser";

app.post(
  "/api/webhooks",
  bodyParser.raw({ type: "application/json" }),
  async function (req, res) {
    // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
    const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
    if (!WEBHOOK_SECRET) {
      throw new Error("You need a WEBHOOK_SECRET in your .env");
    }

    // Get the headers and body
    const headers = req.headers;
    const payload = `${req.body}`;
    console.log("Signature: ", headers["svix-signature"])

    console.log(payload);

    // Get the Svix headers for verification
    const svix_id = headers["svix-id"];
    const svix_timestamp = headers["svix-timestamp"];
    const svix_signature = headers["svix-signature"];

    // If there are no Svix headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
      return new Response("Error occured -- no svix headers", {
        status: 400,
      });
    }

    // Create a new Svix instance with your secret.
    const wh = new Webhook(WEBHOOK_SECRET);

    let evt;

    // Create a new user in supabase
    const { id, email_addresses } = evt.data;

    console.log("REQUEST MADE");
    console.log(evt.data);

    try {
      // Update Supabase with the new user
      await updateSupabaseUser(evt.data);

      res.status(200).send('User updated successfully');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error updating user');
    }

    return res.status(200).json({
      success: true,
      message: "Webhook received",
    });
  }
);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});