import express from "express";
import cors from "cors";
import db from './config/db.js';
import errorHandler from "./middleware/errorHandler.js";
import userRoute from './routes/userRoutes.js';
import faqRoute from './routes/faqRoutes.js';
import categoryRoute from './routes/categoryRoutes.js';
import blogRoute from './routes/blogRoutes.js';
import commentRoute from './routes/commentRoute.js';
import regionRoute from './routes/regionRoutes.js';
import contactRoute from './routes/contactRoute.js';
import destinationRoute from './routes/destinationRoutes.js';
import type_experienceRoutes from './routes/type&experienceRoutes.js';
import tourRoutes from './routes/tourRoutes.js';
import tourdestinationRoutes from './routes/tourdestinationRoutes.js';
import hotelcategory from './routes/hotelcategoryRoutes.js';
import hotelRoutes from './routes/hotelRoutes.js';
import visaRoutes from './routes/visaRoutes.js';
import searchRoutes from './routes/searchRoute.js';
import billingRoutes from './routes/addressRoutes.js';
import whatsappnumRoutes from './routes/whatsappnumRoutes.js';
import discountRoutes from './routes/discountRoutes.js';
import companyRoutes from './routes/companyRoutes.js';
import guideRoutes from './routes/guideRoutes.js';
import visaApplicationRoutes from './routes/visaapplicationRoute.js';
import cartRoutes from './routes/cartRoutes.js';
import placeOrderRoutes from './routes/placeOrderRoutes.js';



import dotenv from 'dotenv';
dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.get('/', (req, res) => {
  res.send('API is running...');
});


app.use('/api', userRoute);
app.use('/api', faqRoute);
app.use('/api', categoryRoute);
app.use('/api', blogRoute);
app.use('/api', commentRoute);
app.use('/api', regionRoute);
app.use('/api', contactRoute);
app.use('/api', destinationRoute);
app.use('/api', type_experienceRoutes);
app.use('/api', tourRoutes);
app.use('/api', tourdestinationRoutes);
app.use('/api', hotelcategory);
app.use('/api', hotelRoutes);
app.use('/api', visaRoutes);
app.use('/api', searchRoutes);
app.use('/api', billingRoutes);
app.use('/api', whatsappnumRoutes);
app.use('/api', discountRoutes);
app.use('/api', companyRoutes);
app.use('/api', guideRoutes);
app.use('/api', visaApplicationRoutes);
app.use('/api', cartRoutes);
app.use('/api', placeOrderRoutes);



app.use('/uploads', express.static('uploads'));


app.use(errorHandler);


const port = process.env.PORT || 5000;

app.listen(port, async () => {
  try {
    const [rows] = await db.query('SELECT 1');
    console.log(`✅ MySQL Connected! Test Result: ${rows[0]['1']}`);
  } catch (err) {
    console.error('❌ MySQL Connection Failed:', err.message);
  }

  console.log(`🚀 Server running on: http://localhost:${port}`);
});