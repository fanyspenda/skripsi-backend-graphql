import { gql } from "apollo-server-express";

export const userType = gql`
	type user {
		_id: String
		name: String
		email: String
		level: Int
		password: String
	}

	type login {
		name: String
		token: String
	}

	type register {
		name: String
		email: String
		password: String
		level: Int
	}
`;
