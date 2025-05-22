const AppDataSource = require("../data-source");
const Software = require("../models/Software");

const softwareRepo = AppDataSource.getRepository(Software);

exports.createSoftware = async (req, res) => {
  try {
    let { name, description, accessLevels } = req.body;

    if (!Array.isArray(accessLevels) || accessLevels.length === 0) {
      accessLevels = ["Read", "Write", "Admin"];
    }

    console.log("createSoftware payload:", { name, description, accessLevels });

    const software = softwareRepo.create({ name, description, accessLevels });
    await softwareRepo.save(software);
    return res.status(201).json(software);
  } catch (err) {
    console.error("CreateSoftware error:", err);
    return res.status(500).json({ error: err.message });
  }
};
  