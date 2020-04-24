import { alumniModel } from "models/alumni";
import { UserInputError } from "apollo-server-express";
import { pagination } from "graphqlAPI/modules/paginationModule";

export const alumniResolver = {
	alumniWithPagination: async (
		object: any,
		args: { page: number; limit: number }
	) => {
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
};
