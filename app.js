import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import morgan from 'morgan';
import cors from 'cors';
import authRoutes from './routes/authRouters.js'
import userRouters from './routes/userRouters.js'
import resturantRouters from './routes/resturantRouters.js'
import categoryRouters from './routes/categoryRouters.js'
import foodRouters from './routes/foodRouters.js'
dotenv.config()
const app = express();
connectDB();

// Middleware to parse JSON
// middlewar
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

//router
app.use('/api/v1/user', authRoutes)
app.use('/api/v1/user',userRouters)
app.use('/api/v1/resturant',resturantRouters)
app.use('/api/v1/category',categoryRouters)
app.use('/api/v1/food',foodRouters);



const PORT = process.env.PORT || 6000

app.listen(PORT, () => {
    console.log(`server runnimg on PORT ${PORT}`);
})
