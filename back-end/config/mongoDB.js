import  mongoose from "mongoose";
const connectDB =async ()=>{
    mongoose.connection.on('connected',()=>{
        console.log("DataBase Connected")
    })
    try{
    await mongoose.connect(`${process.env.MONGODB_URI}/Mern_Auth`)
    }catch (error){
        console.log(`Error Related to mongoDB Connection ${error}`);
        process.exit(1)//filer Code
    }
}
export default  connectDB;