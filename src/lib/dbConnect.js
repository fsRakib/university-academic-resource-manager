import mongoose from "mongoose";

const connection = {}; // An object to hold the connection state

async function dbConnect() {
  if (connection.isConnected) {
    console.log("Already connected to the database");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI || "", {
      dbName: "URM_db",
    });
    console.log("MongoDB URI:", process.env.MONGODB_URI);
    connection.isConnected = db.connections[0].readyState;

    console.log("------------ Database connected successfully ------------");
  } catch (error) {
    console.error("----------------xxxxx-------- Database connection failed --------xxxxx----------------:", error);

    throw new Error("Failed to connect to the database");
  }
}

export default dbConnect;
