import { gql } from "apollo-server-express";
import token from "lib/authHandler";
import { alumniType } from "./types/alumniType";
import { linkedinType } from "./types/linkedinType";
import { userType } from "./types/userType";
import { linkedinResolver } from "./resolvers/linkedinResolver";
import { paginationType } from "./types/paginationType";
import { alumniResolver } from "./resolvers/alumniResolver";

export const typeDefs = gql`
	${linkedinType}
	${userType}
	${alumniType}
	${paginationType}

	type Query {
		linkedinWithPagination(page: Int!, limit: Int!): linkedinWithPagination
		alumniWithPagination(page: Int!, limit: Int!): alumniWithPagination
	}

	type Mutation {
		login(email: String!, pass: String!): login
	}
`;

export const resolvers = {
	Query: {
		linkedinWithPagination: linkedinResolver.linkedinWithPagination,
		alumniWithPagination: alumniResolver.alumniWithPagination,
	},
	Mutation: {
		login: (object: any, args: { email: string; pass: string }) => {
			return {
				name: "fany",
				token: "A Token",
			};
		},
	},
};
