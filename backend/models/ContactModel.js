

import mongoose from "mongoose";


const contactSchema = new mongoose.Schema(
    {
        fullName: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        position: { type: String, required: true },
        resume: { type: String, required: true },
        status: {
            type: String,
            enum: ["Pending", "Read", "Replied"],
            default: "Pending"
        }
    },
    { timestamps: true }
);

const ContactModel =
    mongoose.models.Contact || mongoose.model("Contact", contactSchema);

export default ContactModel;
