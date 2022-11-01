import Mongoose from "mongoose";
let database: Mongoose.Connection;
export const connect = async () => {

    const uri = process.env.DATABASE_URI as string
    if (database) {
        return;
    }
    await Mongoose.connect(uri)
        .then(() => console.log("Connected to db"))
        .catch((err) => console.log("Connection to db failed", err));

};
export const disconnect = () => {
    if (!database) {
        return;
    }
    Mongoose.disconnect();
};
