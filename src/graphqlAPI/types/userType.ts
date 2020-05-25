import { gql } from "apollo-server-express";

export const userType = gql`
	type user {
		_id: String
		name: String
		email: String
		level: Int
		password: String
	}

	type token {
		token: String
	}

	input registerInput {
		name: String!
		email: String!
		password: String!
		level: Int!
	}

	input updateUserInput {
		name: String!
		email: String!
		level: Int!
	}

	type userWithPagination {
		users: [user]
		userPage: pagination
		totalData: Int
	}
`;
