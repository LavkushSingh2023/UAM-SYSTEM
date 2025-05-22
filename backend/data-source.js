require("dotenv").config();
const { DataSource } = require("typeorm");
const User = require("./models/User");
const Software = require("./models/Software");
const Request = require("./models/Request");

module.exports = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME,
  synchronize: false,
  logging: false,
  entities: [User, Software, Request],
  migrations: [__dirname + "/migrations/*.js"],
});
