import express from 'express'
import colors from 'colors'
import dotenv from 'dotenv'
dotenv.config()
import 'express-async-errors'
import morgan from 'morgan'
// DB 
import connectDB from './configs/connectDB.js'

// Routers
import authRouter from './routes/authRoutes.js'
import uomRouter from './routes/uomRoutes.js'

// middleware
import notFoundMiddleware from './middleware/notFound.js'
import errorHandlerMiddleware from './middleware/errorHandler.js'
import authenticateUser from './middleware/auth.js'
import adminAuthorization from './middleware/adminAuthorization.js'




const app = express()

if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'))
}

app.use(express.json())
app.get('/', (req, res) => {
    res.send('Welcome')
})
app.get('/api/v1', (req, res) => {
    res.send({msg: 'Hey From Server'})
})


// app.get('/api/v1/testing', async (req, res) => {
//     const user = await User.create({ name:"Khalil Admin", 
//             email: "admffffgin@admin.com", 
//             password:"1223355325681",
//             phoneNumber1: "02164515184"
//          });
//     res.send({msg: user})
// })




app.use('/api/v1/auth', authRouter)
app.use('/api/v1/uom', authenticateUser, adminAuthorization, uomRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000


const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`.magenta.underline)
        })
    } catch (error) {
        console.log(error);
    }
}

start()