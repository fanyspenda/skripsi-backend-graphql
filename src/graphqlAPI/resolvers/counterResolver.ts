import { verifyToken } from "graphqlAPI/modules/verifyToken";
import { alumniModel } from "models/alumni";
import linkedinModel from "models/linkedin";
import { ApolloError } from "apollo-server-express";

export const counterResolver = {
	countWorking: async (
		parent: any,
		args: any,
		context: { token: string },
		info: any
	) => {
		verifyToken(context.token);
		try {
			const [working, workingL] = await Promise.all([
				alumniModel.countDocuments({ work_at: { $nin: ["", null] } }),
				linkedinModel.countDocuments({ work_at: { $nin: ["", null] } }),
			]);
			const total = working + workingL;
			return {
				total,
			};
		} catch (error) {
			throw new ApolloError(error);
		}
	},

	countNotWorking: async (
		parent: any,
		args: any,
		context: { token: string },
		info: any
	) => {
		verifyToken(context.token);
		try {
			const [countNotWorking, countNotWorkingL] = await Promise.all([
				alumniModel.countDocuments({ work_at: { $in: ["", null] } }),
				linkedinModel.countDocuments({ work_at: { $in: ["", null] } }),
			]);
			const total = countNotWorking + countNotWorkingL;
			return { total };
		} catch (error) {
			return new ApolloError(error);
		}
	},
	countTotalAlumni: async (
		parent: any,
		args: any,
		context: { token: string },
		info: any
	) => {
		verifyToken(context.token);
		try {
			const [count, countL] = await Promise.all([
				alumniModel.countDocuments({}),
				linkedinModel.countDocuments({}),
			]);
			const total = count + countL;
			return { total };
		} catch (error) {
			return new ApolloError(error);
		}
	},
};
