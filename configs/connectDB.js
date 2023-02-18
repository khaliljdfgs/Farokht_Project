import mongoose from "mongoose"
mongoose.set('strictQuery', false)

const connectDB = async (url) => {
    try {
        const conn = await mongoose.connect(url)
        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
        return conn
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
    
}

export default connectDB