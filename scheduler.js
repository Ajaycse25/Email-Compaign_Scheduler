import cron from "node-cron";
import Campaign from "./models/Campaign.js";
import { sendEmail } from "./emailSender.js";

cron.schedule("* * * * *", async () => {
  console.log("Checking for campaigns to send...");

  const now = new Date();
  const campaigns = await Campaign.find({
    status: "pending",
    scheduledTime: { $lte: now }
  });

  for (const campaign of campaigns) {
    let allSuccess = true;

    for (const recipient of campaign.recipients) {
      try {
        await sendEmail(recipient.email, campaign.title, campaign.message);
        console.log(` Email sent to ${recipient.email}`);
        recipient.status = "sent";
      } catch (err) {
        console.error(` Failed to send to ${recipient.email}:`, err.message || err);
        recipient.status = "failed";
        allSuccess = false;
      }
    }

    campaign.status = allSuccess ? "sent" : "failed";
    await campaign.save();
  }
});
