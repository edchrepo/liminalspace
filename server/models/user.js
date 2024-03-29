import mongoose from 'mongoose';

// exporting mongoose model

const userSchema = mongoose.Schema({
    given_name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    id: { type: String },
    selectedFile: String,
});

export default mongoose.model("User", userSchema);