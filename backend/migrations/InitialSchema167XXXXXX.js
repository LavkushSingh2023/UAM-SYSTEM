module.exports = class InitialSchema1679999999999 {
  async up(queryRunner) {
    await queryRunner.query(`
        CREATE TABLE "users" (
          "id" SERIAL PRIMARY KEY,
          "username" VARCHAR(255) NOT NULL UNIQUE,
          "password" VARCHAR(255) NOT NULL,
          "role" VARCHAR(20) NOT NULL DEFAULT 'Employee'
        );
      `);
    await queryRunner.query(`
        CREATE TABLE "software" (
          "id" SERIAL PRIMARY KEY,
          "name" VARCHAR(255) NOT NULL UNIQUE,
          "description" TEXT,
          "accessLevels" TEXT NOT NULL
        );
      `);
    await queryRunner.query(`
        CREATE TABLE "requests" (
          "id" SERIAL PRIMARY KEY,
          "userId" INTEGER REFERENCES "users"("id") ON DELETE CASCADE,
          "softwareId" INTEGER REFERENCES "software"("id") ON DELETE CASCADE,
          "accessType" VARCHAR(20) NOT NULL,
          "reason" TEXT,
          "status" VARCHAR(20) NOT NULL DEFAULT 'Pending'
        );
      `);
  }

  async down(queryRunner) {
    await queryRunner.query(`DROP TABLE "requests"`);
    await queryRunner.query(`DROP TABLE "software"`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
};
