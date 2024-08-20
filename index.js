const connectToMongo = require('./config');
const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors')
const path = require('path');
const bcrypt = require('bcrypt')
const auth = require('./routes/auth.js');
const User = require('./models/User.js')
const cart = require('./routes/cart')
const wishlist = require('./routes/wishlist')
const product = require('./routes/product')
const review = require('./routes/review')
const paymentRoute = require('./routes/paymentRoute')
const forgotPassword = require('./routes/forgotPassword')
const AdminRoute = require('./routes/Admin/AdminAuth')
const dotenv = require('dotenv');
const checkOrigin = require('./middleware/apiAuth');
dotenv.config()


connectToMongo();

const port = 5000

const app = express()

// Serve static files from the "public" directory
app.use('/images', express.static(path.join(__dirname, 'public/images')));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.urlencoded({ extended: true }))



app.use(express.json())
app.use(cors());
app.use(express.static(path.join(__dirname, 'build')));


app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000', // Default origin if not set
    credentials: true,
}));

app.use('/api/auth', auth)

app.use('/api/product', product)

app.use('/api/cart', cart)

app.use('/api/wishlist', wishlist)

app.use('/api/review', review)

app.use('/api/admin', AdminRoute)

app.use('/api', paymentRoute)

app.use('/api/password', forgotPassword)

app.listen(port, () => {
    console.log(`E-commerce backend listening at http://localhost:${port}`)
})
