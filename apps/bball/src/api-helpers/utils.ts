import mongoose from "mongoose";

const uri: string = process.env.MONGODB_URI;

export const connectToDatabase = async () => {
	try {
		await mongoose.connect(uri);
		console.log("connected to mongoDB");
	} catch (e) {
		console.log("cannot connect to mongoDB: ", e);
	}
};
