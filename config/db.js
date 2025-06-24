import mongoose from 'mongoose';

export const connection = () => {
    mongoose.connect(process.env.MONGODB_URI, {
        dbName : "zamazon",
    }).then(() => {
        console.log("connected to database");
    }).catch(() => {
        console.log("Something went wrong");
    });
};