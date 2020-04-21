import { Schema, model } from "mongoose";

const linkedinSchema = new Schema({
	name: { type: String, required: true },
	entry_year: String,
	graduate_year: String,
	major: String,
	work_at: String,
	work_position: String,
	email: String,
	data_source: String,
});

const linkedinModel = model("alumni_linkedin", linkedinSchema);
export default linkedinModel;
