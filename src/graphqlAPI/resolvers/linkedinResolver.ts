import linkedinModel from "models/linkedin";
import { UserInputError } from "apollo-server-express";
import { pagination } from "graphqlAPI/modules/paginationModule";

export const linkedinResolver = {
	linkedinWithPagination: async (
		object: any,
		args: { page: number; limit: number }
	) => {
		const { page, limit } = args;

		const [data, dataTotal] = await Promise.all([
			linkedinModel
				.find({})
				.skip(page * limit - limit)
				.limit(limit),
			linkedinModel.countDocuments({}),
		]);

		const totalPage = Math.ceil(dataTotal / limit);
		if (page <= 0 || page > totalPage) {
			throw new UserInputError("Salah Input Nomor Halaman");
		}
		return {
			alumniLinkedin: data,
			linkedinPage: {
				totalPage,
				pages: pagination(totalPage, page, limit),
			},
		};
	},
};
