// models/HomeContent.js
// models/HomeContent.js
import mongoose from "mongoose";

const HomeContentSchema = new mongoose.Schema({
  welcomeText: { type: String, default: "" },
  activities: [{ type: String }], // image URLs
  bannerVideos: [{ type: String }], // video URLs
  testimonialVideos: [{ type: String }], // video URLs

  // New 3-column section
  threeColumnSection: {
    latestNewsHeading: { type: String, default: "" },   // Heading
    latestNewsParagraph: { type: String, default: "" }, // Paragraph
    activityCalendar: { type: String, default: "" },    // Image URL
    calendarButtonLink: { type: String, default: "#" },
    video: { type: String, default: "" },              // YouTube embed URL
  },

}, { timestamps: true });

export default mongoose.model("HomeContent", HomeContentSchema);
