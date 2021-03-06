import majorModel from "models/major";
import { verifyToken } from "graphqlAPI/modules/verifyToken";
import { ApolloError, UserInputError } from "apollo-server-express";
import { pagination } from "graphqlAPI/modules/paginationModule";

export const majorResolver = {
	addMajor: async (
		parent: any,
		args: { name: string },
		context: { token: string },
		info: any
	) => {
		verifyToken(context.token);
		try {
			const data = await majorModel.create({ ...args });
			return data;
		} catch (err) {
			throw new ApolloError(err);
		}
	},
	updateMajor: async (
		parent: any,
		args: { id: string; name: string },
		context: { token: string },
		info: any
	) => {
		verifyToken(context.token);
		try {
			const data = await majorModel.findByIdAndUpdate(
				args.id,
				{
					name: args.name,
				},
				{ new: true }
			);
			return data;
		} catch (err) {
			throw new ApolloError(err);
		}
	},
	deleteMajor: async (
		parent: any,
		args: { id: string },
		context: { token: string },
		info: any
	) => {
		verifyToken(context.token);
		try {
			const data = await majorModel.findByIdAndDelete(args.id);
			return data;
		} catch (error) {
			throw new ApolloError(error);
		}
	},
	majorWithPagination: async (
		parent: any,
		args: any,
		context: { token: string },
		info: any
	) => {
		try {
			verifyToken(context.token);
			let { page, limit } = args;
			!page ? (page = 1) : null;
			!limit ? (limit = 0) : null;
			const [data, dataTotal] = await Promise.all([
				majorModel
					.find({})
					.skip(page * limit - limit)
					.limit(limit),
				majorModel.countDocuments({}),
			]);

			const totalPage = Math.ceil(dataTotal / limit);
			if (page <= 0 || page > totalPage) {
				throw new UserInputError("Salah Input Nomor Halaman");
			}
			return {
				majors: data,
				majorPage: {
					totalPage,
					pages: pagination(totalPage, page, limit),
				},
				totalData: dataTotal,
			};
		} catch (error) {
			return new ApolloError(error);
		}
	},
	majorDetail: async (
		parent: any,
		args: { id: string },
		context: { token: string },
		info: any
	) => {
		verifyToken(context.token);
		try {
			const result = majorModel.findById(args.id);
			return result;
		} catch (error) {
			throw new ApolloError(error);
		}
	},
};
