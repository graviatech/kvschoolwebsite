import ContactInfo from "../models/contactInfoModel.js";

export const getContactInfo = async (req, res) => {
  try {
    const info = await ContactInfo.findOne();
    res.json(info);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateContactInfo = async (req, res) => {
  try {
    const { content } = req.body;
    const info = await ContactInfo.findOneAndUpdate(
      {},
      { content, updatedAt: new Date() },
      { new: true, upsert: true } // create if doesn't exist
    );
    res.json(info);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

