import { gql } from "apollo-server-express";

export const typeDefs = `
	type user {
		name: String
		level: Int
		token: String
	}
`;
