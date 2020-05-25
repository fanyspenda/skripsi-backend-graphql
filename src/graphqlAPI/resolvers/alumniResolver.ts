import { alumniModel } from "models/alumni";
import { UserInputError, ApolloError } from "apollo-server-express";
import { pagination } from "graphqlAPI/modules/paginationModule";
import { verifyToken } from "graphqlAPI/modules/verifyToken";

interface alumni {
	name: string;
	entry_year: number;
	graduate_year: number;
	major: string;
	work_at: string;
	work_position: string;
	email: string;
	data_source: string;
}

export const alumniResolver = {
	alumniWithPagination: async (
		parent: any,
		args: { page: number; limit: number; name: string },
		context: { token: string },
		info: any
	) => {
		verifyToken(context.token);
		const { page, limit, name } = args;
		const searchedName = name ? name : "";
		const [data, dataTotal] = await Promise.all([
			alumniModel
				.find({ name: { $regex: searchedName, $options: "i" } })
				.skip(page * limit - limit)
				.limit(limit),
			alumniModel.countDocuments({
				name: { $regex: searchedName, $options: "i" },
			}),
		]);

		let totalPage = Math.ceil(dataTotal / limit);
		if (totalPage == 0) totalPage = 1;
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
		parent: any,
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
	addAlumni: async (
		parent: any,
		args: { data: alumni },
		context: { token: string },
		info: any
	) => {
		verifyToken(context.token);
		try {
			const result = alumniModel.create({ ...args.data });
			return result;
		} catch (error) {
			throw new ApolloError(error);
		}
	},
	deleteAlumni: async (
		parent: any,
		args: { id: number },
		context: { token: string },
		info: any
	) => {
		verifyToken(context.token);
		try {
			const data = alumniModel.findByIdAndDelete(args.id);
			return data;
		} catch (error) {
			throw new ApolloError(error);
		}
	},
	updateAlumni: async (
		parent: any,
		args: { id: number; data: any },
		context: { token: string },
		info: any
	) => {
		try {
			verifyToken(context.token);
			const data = alumniModel.findByIdAndUpdate(args.id, args.data, {
				new: true,
			});
			return data;
		} catch (error) {
			throw new ApolloError(error);
		}
	},
};
