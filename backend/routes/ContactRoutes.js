import express from "express";
import ContactModel from "../models/ContactModel.js";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const upload = multer({ storage: multer.memoryStorage() });

router.post("/", upload.single("resume"), async (req, res) => {
  try {
    const { fullName, email, phone, position } = req.body;

    if (!fullName || !email || !phone || !position || !req.file) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const uploadResult = await cloudinary.uploader.upload(
      `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
      { folder: "resumes" }
    );

    const newContact = new ContactModel({
      fullName,
      email,
      phone,
      position,
      resume: uploadResult.secure_url,
    });

    await newContact.save();

    res
      .status(201)
      .json({ success: true, message: "Form submitted successfully", data: newContact });
  } catch (error) {
    console.error("Error submitting contact:", error);
    res.status(500).json({ success: false, message: "Failed to submit form" });
  }
});

router.get("/", async (req, res) => {
  try {
    const contacts = await ContactModel.find().sort({ _id: -1 });
    res.status(200).json({ success: true, data: contacts });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({ success: false, message: "Failed to fetch contacts" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const contact = await ContactModel.findById(req.params.id);
    if (!contact) return res.status(404).json({ success: false, message: "Contact not found" });

    const publicId = contact.resume.split("/").pop().split(".")[0];
    await cloudinary.uploader.destroy(`resumes/${publicId}`);

    await ContactModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Contact deleted successfully" });
  } catch (error) {
    console.error("Error deleting contact:", error);
    res.status(500).json({ success: false, message: "Failed to delete contact" });
  }
});


router.patch("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    const updatedContact = await ContactModel.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.status(200).json({ success: true, data: updatedContact });
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({ success: false, message: "Failed to update status" });
  }
});

export default router;
