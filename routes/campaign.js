import express from 'express';
import Campaign from '../models/Campaign.js';

const router = express.Router();

// POST route to create a new campaign
router.post('/', async (req, res) => {
  try {
    const { title, message, recipients, scheduledTime } = req.body;

  
    const emailArray = recipients
      .split(',')
      .map(email => ({ email: email.trim(), status: 'pending' }));

    const campaign = new Campaign({
      title,
      message,
      recipients: emailArray,
      scheduledTime,
      status: 'pending'
    });

    await campaign.save();
    res.redirect('/campaigns');
  } catch (error) {
    console.error('Error creating campaign:', error);
    res.status(500).send('Failed to create campaign.');
  }
});

router.get('/', async (req, res) => {
  try {
    const campaigns = await Campaign.find();
    res.render('campaigns', { campaigns });
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    res.status(500).send('Failed to fetch campaigns.');
  }
});

export default router;
