const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "user",
  tableName: "users",
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    username: {
      type: String,
      unique: true,
      nullable: false,
    },
    password: {
      type: String,
      nullable: false,
    },
    role: {
      type: "enum",
      enum: ["Employee", "Manager", "Admin"],
      default: "Employee",
    },
  },
  relations: {
    requests: {
      type: "one-to-many",
      target: "request",
      inverseSide: "user",
    },
  },
});
