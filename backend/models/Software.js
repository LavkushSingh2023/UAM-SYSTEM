const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "software",
  tableName: "software",
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    name: {
      type: String,
      unique: true,
      nullable: false,
    },
    description: {
      type: "text",
      nullable: true,
    },
    accessLevels: {
      type: "simple-array",
      nullable: false,
    },
  },
  relations: {
    requests: {
      type: "one-to-many",
      target: "request",
      inverseSide: "software",
    },
  },
});
