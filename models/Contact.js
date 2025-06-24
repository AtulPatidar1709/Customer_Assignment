import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    phoneNumber: { type: String, default: null },
    email: { type: String, default: null },
    linkedId: { type: mongoose.Schema.Types.ObjectId, default: null, ref: "Contact" },
    linkPrecedence: { type: String, enum: ["primary", "secondary"], required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    deletedAt: { type: Date, default: null }
});

export const Contact = mongoose.model("Contact", contactSchema);
