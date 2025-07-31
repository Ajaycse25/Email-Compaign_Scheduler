import cron from 'node-cron';
import Campaign from './models/Campaign.js';
import { sendEmail } from './emailSender.js';

cron.schedule('* * * * *', async () => {
  const now = new Date();
  const campaigns = await Campaign.find({ scheduledTime: { $lte: now }, status: 'pending' });

  for (const campaign of campaigns) {
    let allSent = true;
    for (let recipient of campaign.recipients) {
      try {
        await sendEmail(recipient.email, campaign.title, campaign.message);
        recipient.status = 'sent';
      } catch {
        recipient.status = 'failed';
        allSent = false;
      }
    }

    campaign.status = allSent ? 'sent' : 'failed';
    await campaign.save();
  }
});
