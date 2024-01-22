// Library Imports
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
// Component Imports
require("./models/User");
require("./models/Product");
require("./models/Customer");

const app = express();

// Dev Env
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI);

// App uses
app.use(cors());
app.use(bodyParser.json());

// Routes
require("./routes/authRoutes")(app);
require("./routes/customerRoutes")(app);
require("./routes/productRoutes")(app);

if (process.env.NODE_ENV === "production") {
  // Express will serve up production assets
  // like our main.js or main.css file
  app.use(express.static("../client/build"));

  // express will serve up the index.html file
  // if it doesn't recognize the route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
console.log(PORT);
app.listen(PORT);
