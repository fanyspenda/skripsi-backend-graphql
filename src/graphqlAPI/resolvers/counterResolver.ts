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
				alumniModel.count({ work_at: { $nin: ["", null] } }),
				linkedinModel.count({ work_at: { $nin: ["", null] } }),
			]);
			const total = working + workingL;
			return total;
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
				alumniModel.count({ work_at: { $in: ["", null] } }),
				linkedinModel.count({ work_at: { $in: ["", null] } }),
			]);
			const total = countNotWorking + countNotWorkingL;
			return total;
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
				alumniModel.count({}),
				linkedinModel.count({}),
			]);
			const total = count + countL;
			return total;
		} catch (error) {
			return new ApolloError(error);
		}
	},
	countAlumniManual: async (
		parent: any,
		args: any,
		context: { token: string },
		info: any
	) => {
		verifyToken(context.token);
		try {
			const total = await alumniModel.count({});
			return total;
		} catch (error) {
			throw new ApolloError(error);
		}
	},
	countLinkedin: async (
		parent: any,
		args: any,
		context: { token: string },
		info: any
	) => {
		verifyToken(context.token);
		try {
			const total = await linkedinModel.count({});
			return total;
		} catch (error) {
			throw new ApolloError(error);
		}
	},
};
