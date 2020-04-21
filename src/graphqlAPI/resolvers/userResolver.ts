import { userModel } from "models/user";
import { ApolloError, AuthenticationError } from "apollo-server-express";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

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
					{ id: data._id, name: data.name, level: data.level },
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
};
