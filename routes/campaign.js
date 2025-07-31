import express from 'express';
import Campaign from '../models/Campaign.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { title, message, recipients, scheduledTime } = req.body;
  const emailArray = recipients.split(',').map(email => ({ email: email.trim() }));
  const campaign = new Campaign({ title, message, recipients: emailArray, scheduledTime });
  await campaign.save();
  res.redirect('/campaigns');
});

router.get('/', async (req, res) => {
  const campaigns = await Campaign.find();
  res.json(campaigns);
});

export default router;
