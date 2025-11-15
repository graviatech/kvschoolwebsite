// // backend/controllers/adminHomeController.js
// import HomeContent from "../models/HomeContent.js";

// export const saveHomeData = async (req, res) => {
//   try {
//     const { title, description } = req.body;
//     const filePath = req.file ? req.file.path : null;

//     console.log("📦 Upload received:", req.body, req.file);

//     let content = await HomeContent.findOne();
//     if (!content) {
//       content = new HomeContent({
//         title,
//         description,
//         media: filePath ? [filePath] : [],
//       });
//     } else {
//       if (filePath) content.media.push(filePath);
//       content.title = title || content.title;
//       content.description = description || content.description;
//     }

//     await content.save();
//     res.status(200).json({ success: true, message: "Home data saved successfully!", content });
//   } catch (error) {
//     console.error("❌ Error saving home data:", error);
//     res.status(500).json({ success: false, message: "Server error", error });
//   }
// };




// // controllers/adminHomeController.js
// import fs from "fs";

// export const saveHomeData = async (req, res) => {
//   try {
//     console.log("🟢 Received home data:", req.body);

//     fs.writeFileSync("homeContent.json", JSON.stringify(req.body, null, 2));

//     res.json({
//       success: true,
//       message: "Home page data saved successfully ✅",
//     });
//   } catch (err) {
//     console.error("❌ Save error:", err);
//     res.status(500).json({
//       success: false,
//       message: "Server error while saving data",
//     });
//   }
// };




// // controllers/adminHomeController.js
// import fs from "fs";
// import path from "path";
// import HomeContent from "../models/HomeContent.js";

// export const saveHomeData = async (req, res) => {
//   try {
//     const fileUrl = req.file ? `/uploads/home/${req.file.filename}` : null;
//     const { section, data } = req.body;

//     console.log("🟢 Received home data:", req.body, fileUrl);

//     // Load or create content
//     let content = await HomeContent.findOne();
//     if (!content) content = new HomeContent();

//     // Handle file upload sections
//     if (fileUrl && section) {
//       if (!content[section]) content[section] = [];
//       content[section].push(fileUrl);
//     }

//     // Handle text data updates
//     if (data) {
//       const parsedData = typeof data === "string" ? JSON.parse(data) : data;
//       Object.assign(content, parsedData);
//     }

//     await content.save();

//     res.json({
//       success: true,
//       message: "Home page data saved successfully ✅",
//       content,
//     });
//   } catch (err) {
//     console.error("❌ Save error:", err);
//     res.status(500).json({
//       success: false,
//       message: "Server error while saving data",
//       error: err.message,
//     });
//   }
// };






import HomeContent from "../models/HomeContent.js";

export const saveHomeData = async (req, res) => {
  try {
    const fileUrl = req.file ? `/uploads/home/${req.file.filename}` : null;
    const { section } = req.body;
    let { data } = req.body;

    console.log("🟢 Received home data:", req.body, fileUrl);

    // Find or create document
    let content = await HomeContent.findOne();
    if (!content) content = new HomeContent();

    // --------------------------
    // 1️⃣ Handle file uploads
    // --------------------------
    if (fileUrl && section) {
      if (!content[section]) content[section] = [];
      content[section].push(fileUrl);
    }

    // --------------------------
    // 2️⃣ Handle encrypted TEXT updates
    // --------------------------
    if (data) {
      try {
        if (typeof data === "string") data = JSON.parse(data);

        // // Merge all fields (encrypted text + arrays)
        // content = Object.assign(content, data);
        Object.keys(data).forEach((key) => {
          if (Array.isArray(data[key])) {
            // replace array
            content[key] = data[key];
          } else if (typeof data[key] === "object") {
            // update nested objects (like threeColumnSection)
            content[key] = { ...content[key], ...data[key] };
          } else {
            // update text fields (encrypted)
            content[key] = data[key];
          }
        });

      } catch (e) {
        console.error("❌ JSON parsing failed:", e);
      }
    }

    // --------------------------
    // 3️⃣ Save the merged document
    // --------------------------
    await content.save();

    res.json({
      success: true,
      message: "Home page data saved successfully (encrypted) ✅",
      content,
    });

  } catch (err) {
    console.error("❌ Save error:", err);
    res.status(500).json({
      success: false,
      message: "Server error while saving home data",
      error: err.message,
    });
  }
};





















