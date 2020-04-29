import majorModel from "models/major";
import { verifyToken } from "graphqlAPI/modules/verifyToken";
import { ApolloError } from "apollo-server-express";

export const majorResolver = {
	addMajor: async (
		parent: any,
		args: { name: string },
		context: { token: string },
		info: any
	) => {
		verifyToken(context.token);
		try {
			const data = majorModel.create({ ...args });
			return data;
		} catch (err) {
			throw new ApolloError(err);
		}
	},
};
