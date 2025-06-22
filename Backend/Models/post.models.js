import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  video:{
        type:String,
        required:true
    },
  title: {
    type: String,
    required: [true, "Title is required"]
  },
  description: {
    type: String,
    required: [true, "Description is required"]
  },
  city: {
    type: String,
    required: true,
    default: "Kathmandu"
  },
  area: {
    type: String,
    required: true
  },
  roomtype: {
    type: String,
    enum: ["Single", "Shared", "Flat"], 
    default: "Single"
  },
  contact: {
    type: String,
    required: true
  },
  rent:{
    type:String,
    required:true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userModel",
    
  }
}, { timestamps: true });

export const postModel = mongoose.model("postModel", postSchema);
