import express from "express";
const app = express();
const port = 3000;

import {config} from "dotenv";
config()

app.use(cors());

app.use(express.json()); // for parsing application/json

app.post('/webhook/clerk', async (req, res) => {
  const { id, email_addresses } = req.body;

  console.log("REQUEST MADE");
  console.log(req.body);

  // Extract user details from the request
  const userId = id;
  const email = email_addresses[0]?.email_address;

  try {
    // Update Supabase with the new user
    await updateSupabaseUser(userId, email);

    res.status(200).send('User updated successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating user');
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});