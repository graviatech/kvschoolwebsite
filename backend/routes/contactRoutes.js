// import express from "express";
// import { createContact, listContacts } from "../controllers/contactController.js";
// const router = express.Router();

// router.post("/", createContact);
// router.get("/", listContacts); // admin listing

// export default router;


import express from "express";
import { getContactContent, updateContactContent } from "../controllers/contactController.js";
const router = express.Router();

router.get("/", getContactContent);
router.post("/", updateContactContent);

export default router;



