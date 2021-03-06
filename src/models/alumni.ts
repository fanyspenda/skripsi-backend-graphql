import { Schema, model } from "mongoose";

const alumniSchema = new Schema({
	name: { type: String, required: true },
	entry_year: Number,
	graduate_year: Number,
	major: String,
	work_at: String,
	work_position: String,
	email: String,
	data_source: String,
});

export const alumniModel = model("alumni_input", alumniSchema);
