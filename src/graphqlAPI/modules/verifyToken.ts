import jwt from "jsonwebtoken";
import { AuthenticationError } from "apollo-server-express";

export const verifyToken = (token: string) => {
	jwt.verify(token.split(" ")[1], "secret", (err, decoded) => {
		if (err) {
			throw new AuthenticationError(err.message);
		}
	});
};
