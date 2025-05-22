const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AppDataSource = require("../data-source");
const User = require("../models/User");

const userRepo = AppDataSource.getRepository(User);
const JWT_SECRET = process.env.JWT_SECRET || "secret";

exports.signup = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (await userRepo.findOneBy({ username })) {
      return res.status(400).json({ error: "Username already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = userRepo.create({
      username,
      password: hashedPassword,
      role: "Employee",
    });
    await userRepo.save(user);
    return res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Signup error:", err);
    return res.status(500).json({ error: err.message || "Server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await userRepo.findOneBy({ username });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, {
      expiresIn: "1h",
    });
    return res.json({ token, role: user.role });
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
};
