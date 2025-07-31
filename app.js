import express from 'express';
import exphbs from 'express-handlebars';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import campaignRoutes from './routes/campaign.js';
import './scheduler.js'; 

const app = express();
app.use(express.static('public'));


import dotenv from 'dotenv';
dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(() => console.log('MongoDB Atlas connected'))
  .catch(err => console.error('MongoDB connection error:', err));


app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => res.render('home'));

app.get('/campaigns', async (req, res) => {
  const { default: Campaign } = await import('./models/Campaign.js');
  const campaigns = await Campaign.find().lean(); 
  res.render('campaigns', { campaigns });
});




app.use('/api/campaigns', campaignRoutes);

const PORT = process.env.PORT || 3000;


app.listen(PORT, () => console.log(`Server started at ${PORT}`));
