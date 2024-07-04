import dotenv from "dotenv";
import {app} from "./app.js";
import connectDB from "./config/db.js";

dotenv.config({
    path: './.env'
});

try {
    connectDB();
    app.on("error", (error) => {
        console.log("Errors: ",error)
        throw error
    });
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });

} catch (error) {
    console.log("MONGODB CONNECTION FAILED!!!!: ",error);
}


