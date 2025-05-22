const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "request",
  tableName: "requests",
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    accessType: {
      type: "enum",
      enum: ["Read", "Write", "Admin"],
      nullable: false,
    },
    reason: {
      type: "text",
      nullable: true,
    },
    status: {
      type: "enum",
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
  },
  relations: {
    user: {
      type: "many-to-one",
      target: "user",
      joinColumn: true,
      onDelete: "CASCADE",
    },
    software: {
      type: "many-to-one",
      target: "software",
      joinColumn: true,
      onDelete: "CASCADE",
    },
  },
});
