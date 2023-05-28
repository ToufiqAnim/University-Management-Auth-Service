import mongoose from "mongoose";
import app from "./app";
import config from "./config/index";
async function uniManagement() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log("Database is connected Successfylly");
    app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (err) {
    console.log(`Failled to connect database`, err);
  }
}
uniManagement();
