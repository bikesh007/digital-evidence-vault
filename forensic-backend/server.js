const express = require("express");

const dotenv = require("dotenv");

const cors = require("cors");

const connectDB = require("./config/db");

dotenv.config();

connectDB();

const app = express();

app.use(cors());

app.use(express.json());
app.use("/api/auth", require("./routes/auth"));
app.use(
    "/api/protected",
    require("./routes/protected")
);
app.use(
    "/api/evidence",
    require("./routes/evidence")
);
app.use(
    "/api/notes",
    require("./routes/notes")
);
app.get("/", (req, res) => {

    res.send("Forensic Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);
});