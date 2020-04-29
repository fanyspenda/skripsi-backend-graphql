import { Schema, model } from "mongoose";

const majorSchema = new Schema({
	name: { type: String, required: true },
});

const majorModel = model("major", majorSchema);
export default majorModel;
