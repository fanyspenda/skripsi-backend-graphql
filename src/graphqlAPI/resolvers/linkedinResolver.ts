import jwt from "jsonwebtoken";
import linkedinModel from "models/linkedin";
import {
	UserInputError,
	AuthenticationError,
	ApolloError,
} from "apollo-server-express";
import { pagination } from "graphqlAPI/modules/paginationModule";
import { verifyToken } from "graphqlAPI/modules/verifyToken";

export const linkedinResolver = {
	linkedinWithPagination: async (
		parent: any,
		args: { page: number; limit: number; name: string },
		context: { token: string },
		info: any
	) => {
		verifyToken(context.token);
		const { page, limit, name } = args;
		const searchedName = name ? name : "";
		const [data, dataTotal] = await Promise.all([
			linkedinModel
				.find({ name: { $regex: searchedName, $options: "i" } })
				.skip(page * limit - limit)
				.limit(limit),
			linkedinModel.countDocuments({
				name: { $regex: searchedName, $options: "i" },
			}),
		]);

		let totalPage = Math.ceil(dataTotal / limit);
		if (totalPage == 0) totalPage = 1;

		if (page <= 0 || page > totalPage) {
			throw new UserInputError("Salah Input Nomor Halaman");
		}
		return {
			alumniLinkedin: data,
			linkedinPage: {
				totalPage,
				pages: pagination(totalPage, page, limit),
			},
			totalData: dataTotal,
		};
	},
	linkedinDetail: async (
		parent: any,
		args: { id: string },
		context: { token: string },
		info: any
	) => {
		verifyToken(context.token);
		try {
			const data = await linkedinModel.findById(args.id);
			return data;
		} catch (err) {
			throw new ApolloError(err);
		}
	},
};
