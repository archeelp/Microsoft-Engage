import db from "../models/index.js";

const updateProfile = async (req, res) => {
  try {
    const { vaccinationStatus } = req.body;
    await db.User.findOneAndUpdate(
      { _id: req.decodedToken.id },
      { vaccinationStatus }
    );
    res.status(200).json({ message: "Profile Updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export default {
  updateProfile,
};
