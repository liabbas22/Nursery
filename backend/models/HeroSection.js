import mongoose from "mongoose";
const Schema = new mongoose.Schema({
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    image: { type: String, required: true }
})
const HeroModel = mongoose.models.HeroSection || mongoose.model("HeroSection", Schema)
export default HeroModel;