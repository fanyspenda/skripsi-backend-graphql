import { alumniModel } from "models/alumni";
import {
	UserInputError,
	AuthenticationError,
	ApolloError,
} from "apollo-server-express";
import { pagination } from "graphqlAPI/modules/paginationModule";
import jwt from "jsonwebtoken";
import { verifyToken } from "graphqlAPI/modules/verifyToken";

export const alumniResolver = {
	alumniWithPagination: async (
		object: any,
		args: { page: number; limit: number },
		context: { token: string },
		info: any
	) => {
		verifyToken(context.token);
		const { page, limit } = args;

		const [data, dataTotal] = await Promise.all([
			alumniModel
				.find({})
				.skip(page * limit - limit)
				.limit(limit),
			alumniModel.countDocuments({}),
		]);
		const totalPage = Math.ceil(dataTotal / limit);
		if (page <= 0 || page > totalPage) {
			throw new UserInputError("Salah Input Nomor Halaman");
		}
		return {
			alumni: data,
			alumniPage: {
				totalPage,
				pages: pagination(totalPage, page, limit),
			},
			totalData: dataTotal,
		};
	},
	alumniDetail: async (
		object: any,
		args: { id: string },
		context: { token: string },
		info: any
	) => {
		try {
			verifyToken(context.token);
			const data = alumniModel.findById(args.id);
			return data;
		} catch (err) {
			throw new ApolloError(err);
		}
	},
};
