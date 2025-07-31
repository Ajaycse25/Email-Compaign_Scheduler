import mongoose from 'mongoose';

const recipientSchema = new mongoose.Schema({
  email: String,
  status: {
    type: String,
    enum: ['pending', 'sent', 'failed'],
    default: 'pending'
  }
});

const campaignSchema = new mongoose.Schema({
  title: String,
  message: String,
  recipients: [recipientSchema],
  scheduledTime: Date,
  status: {
    type: String,
    enum: ['pending', 'sent', 'failed'],
    default: 'pending'
  }
});

export default mongoose.model('Campaign', campaignSchema);
