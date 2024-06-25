const express = require("express");
const connectDB = require("./connectDB");
const cors = require("cors");
const dotenv = require('dotenv').config()
const userRoute = require("./routes/userRoute");
const bookRoute = require("./routes/bookRoute");
const bodyParser = require("body-parser");
const path = require("path"); 
const port = process.env.PORT || 5000;
const app = express();
const http = require("http").createServer(app);

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors(
{
    origin: ["http://localhost:5173"],
    credentials: true
}));
app.use(bodyParser.json());
app.use("/api/users", userRoute);
app.use("/api/books", bookRoute);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

async function startServer()
{
    try
    {
        await connectDB();
        http.listen(port, () => 
        {
            console.log(`Server is running on port ${port}`);
        });
    }
    catch (error)
    {
        console.log(error);
    }
}

startServer();