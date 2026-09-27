require("dotenv").config();

const mongoose = require("mongoose");
const app = require("./app");

const port = process.env.PORT || 4000;


// =====================================================
// MongoDB Connection
// =====================================================

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {

        console.log("Connected to MongoDB");

        // =====================================================
        // Start Server
        // =====================================================

        app.listen(port, () => {

            console.log(
                `Server running on port ${port}`
            );

        });

    })
    .catch((error) => {

        console.error(
            "MongoDB connection failed:",
            error
        );

        process.exit(1);

    });