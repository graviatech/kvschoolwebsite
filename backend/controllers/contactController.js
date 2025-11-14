// import Contact from "../models/Contact.js";

// export const createContact = async (req, res) => {
//   try {
//     const contact = await Contact.create(req.body);
//     res.status(201).json({ success: true, contact });
//   } catch (err) {
//     res.status(500).json({ success: false, error: err.message });
//   }
// };

// export const listContacts = async (req, res) => {
//   try {
//     const items = await Contact.find().sort({ createdAt: -1 });
//     res.json(items);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };





import Contact from "../models/Contact.js";

export const getContactContent = async (req, res) => {
  try {
    const contact = await Contact.findOne();
    res.json(contact || {});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateContactContent = async (req, res) => {
  try {
    const { content } = req.body;
    let contact = await Contact.findOne();

    if (contact) {
      contact.content = content;
      await contact.save();
    } else {
      contact = await Contact.create({ content });
    }

    res.json({ success: true, contact });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
