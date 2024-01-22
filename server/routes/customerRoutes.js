// Library Imports
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Component Imports
const Customer = require("../models/Customer");
const {
  hashPassword,
  validateLogin,
  validateRegister,
} = require("../utils/AuthUtils");
const { authenticateJWT } = require("../utils/jwtUtils");

module.exports = (app) => {
  ////////////////////////////////////////////////////////////////////////////
  // Customer Login
  //
  // Inputs
  //    email, password
  // Dependencies
  //    Customer model, crypt, jwt
  ////////////////////////////////////////////////////////////////////////////
  app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;

    // Check if not empty strings
    if (!email || !password) {
      res.status(400);
      res.send("Email and password is required");
      return;
    }

    // Validate correct format
    if (!validateLogin(email, password)) {
      res.status(400);
      res.send("Invalid email or password");
      return;
    }

    // Get customer with email
    const customer = await Customer.findOne({ email });

    // Check customer exists and password is same
    if (customer && (await bcrypt.compare(password, customer.password))) {
      // JWT
      const customerJWT = { id: customer.id, email: customer.email };
      const accessToken = jwt.sign(
        {
          customerJWT,
        },
        process.env.accessTokenSecret,
        { expiresIn: "24hr" }
      );

      // Send JWT token
      res.status(200);
      res.send(accessToken);
      return;
    }

    // If user does not exist or password is incorrect
    res.status(401);
    res.send("Invalid email or password");
  });

  ////////////////////////////////////////////////////////////////////////////
  // Customer Registration
  //
  // Inputs
  //    first name, last name, email, phone number, password, confirm password
  // Dependencies
  //    Customer model, bcrypt
  ////////////////////////////////////////////////////////////////////////////
  app.post("/api/register", async (req, res) => {
    const { fname, lname, email, pnum, password, confirmPass } = req.body;

    // Validate Required data is not null
    if ((!fname, !lname, !email, !password, !confirmPass)) {
      res.status(400);
      res.send("Missing required fields");
      return;
    }

    // Validate password and confirm password
    if (password !== confirmPass) {
      res.status(400);
      res.send("Confirm password must match password");
      return;
    }

    // Validate format of data
    const valid = validateRegister(req.body);
    if (!valid[0]) {
      res.status(400);
      res.send(valid[1]);
      return;
    }

    // Validate customer does not exist
    const userExist = await Customer.findOne({ email });
    if (userExist) {
      res.status(400);
      res.send("User already exists");
      return;
    }

    // Hash password
    hashPassword(password, (err, hashedPassword) => {
      // If error hashing password
      if (err) {
        res.status(500);
        res.send("Error creating account");
        return;
      }

      // Create customer
      const customer = new Customer({
        firstname: fname,
        lastname: lname,
        email: email,
        phonenumber: pnum,
        password: hashedPassword,
      });

      // Validate no errors
      if (!customer) {
        // If customer is not created
        res.status(501);
        res.send("Error creating user");
        return;
      }

      // Save customer
      customer.save();
      const customerJWT = { id: customer.id, email: customer.email };

      // Create JWT token
      const accessToken = jwt.sign(
        {
          customerJWT,
        },
        process.env.accessTokenSecret,
        { expiresIn: "24hr" }
      );

      // Send Access token
      res.status(200);
      res.send(accessToken);
    });
  });

  ////////////////////////////////////////////////////////////////////////////
  // Current Customer
  ////////////////////////////////////////////////////////////////////////////
  app.get("/api/user", authenticateJWT, async (req, res) => {
    const { id } = req.user.customerJWT;
    const customer = await Customer.findById(id, { password: 0 });

    res.status(200);
    res.send(customer);
  });
};
