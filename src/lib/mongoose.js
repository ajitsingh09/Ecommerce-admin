import mongoose from "mongoose";

//setting up mongoDB connection
export function mongooseConnect() {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection.asPromise();
  } else {
    let uri = process.env.MONGODB_URI;
    return mongoose.connect(uri);
  }
}
