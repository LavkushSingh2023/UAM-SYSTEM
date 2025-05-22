const AppDataSource = require("../data-source");
const Request = require("../models/Request");
const Software = require("../models/Software");
const User = require("../models/User");

const requestRepo = AppDataSource.getRepository(Request);
const softwareRepo = AppDataSource.getRepository(Software);
const userRepo = AppDataSource.getRepository(User);

exports.createRequest = async (req, res) => {
  try {
    const { softwareId, accessType, reason } = req.body;
    const user = await userRepo.findOneBy({ id: req.user.id });
    const software = await softwareRepo.findOneBy({ id: softwareId });
    if (!software) {
      return res.status(404).json({ error: "Software not found" });
    }
    const request = requestRepo.create({
      user,
      software,
      accessType,
      reason,
      status: "Pending",
    });
    await requestRepo.save(request);
    return res.status(201).json(request);
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
};

exports.updateRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!["Approved", "Rejected"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }
    const request = await requestRepo.findOneBy({ id: parseInt(id) });
    if (!request) {
      return res.status(404).json({ error: "Request not found" });
    }
    if (request.status !== "Pending") {
      return res.status(400).json({ error: "Request already processed" });
    }
    request.status = status;
    await requestRepo.save(request);
    return res.json(request);
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
};

exports.getPendingRequests = async (req, res) => {
    try {
      const requests = await requestRepo.find({
        where: { status: "Pending" },
        relations: ["user", "software"],
      });
  
      const data = requests.map(r => ({
        id:         r.id,
        user:       r.user.username,
        software:   r.software.name,
        accessType: r.accessType,
        reason:     r.reason,
      }));
      if (!data) {
        console.log("No request exist!")
        return res.status(404).json({ error: "Request not exist!" }); 
      } 
      return res.json(data);
    } catch (err) {
      console.error("getPendingRequests error:", err);
      return res.status(500).json({ error: "Server error" });
    }
  };
  
