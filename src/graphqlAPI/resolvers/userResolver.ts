import { userModel } from "models/user";
import {
	ApolloError,
	AuthenticationError,
	UserInputError,
} from "apollo-server-express";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { verifyToken } from "graphqlAPI/modules/verifyToken";
import { pagination } from "graphqlAPI/modules/paginationModule";
import { throws } from "assert";

interface user {
	_id: string;
	name: string;
	email: string;
	password: string;
	level: number;
}

interface data {
	data: Omit<user, "_id">;
}

type login = Pick<user, "email" | "password">;

export const userResolver = {
	register: async (object: any, args: data) => {
		const newData = args.data;
		newData.password = bcryptjs.hashSync(args.data.password, 10);
		const result = await userModel.create({ ...newData });
		if (result) return result;
		else throw new ApolloError("something wrong when saving to database");
	},
	login: async (object: any, args: login) => {
		const result: unknown = await userModel.findOne({ email: args.email });
		if (result) {
			let data = result as user;
			if (bcryptjs.compareSync(args.password, data.password)) {
				const token = jwt.sign(
					{ name: data.name, level: data.level },
					"secret",
					{
						expiresIn: 86400,
					}
				);

				return {
					token,
				};
			} else throw new AuthenticationError("password salah");
		} else throw new AuthenticationError("user tidak ditemukan");

		return;
	},
	userWithPagination: async (
		parents: any,
		args: { page: number; limit: number; name: string },
		context: { token: string },
		info: any
	) => {
		verifyToken(context.token);
		const { page, limit, name } = args;
		const searchedName = name ? name : "";
		const [data, dataTotal] = await Promise.all([
			userModel
				.find(
					{ name: { $regex: searchedName, $options: "i" } },
					{ password: false }
				)
				.skip(page * limit - limit)
				.limit(limit),
			userModel.countDocuments({
				name: { $regex: searchedName, $options: "i" },
			}),
		]);

		let totalPage = Math.ceil(dataTotal / limit);
		if (totalPage == 0) totalPage = 1;
		if (page <= 0 || page > totalPage) {
			throw new UserInputError("Salah Input Nomor Halaman");
		}
		return {
			users: data,
			userPage: {
				totalPage,
				pages: pagination(totalPage, page, limit),
			},
			totalData: dataTotal,
		};
	},
	updateUser: async (
		parents: any,
		args: { id: String; data: any },
		context: { token: string },
		info: any
	) => {
		verifyToken(context.token);
		try {
			const { name, email, level } = await args.data;
			await userModel.findByIdAndUpdate(args.id, { name, email, level });
			return true;
		} catch (error) {
			throw new ApolloError(error);
		}
	},
};
