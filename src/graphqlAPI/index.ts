import { majorType } from "./types/majorType";
import { gql } from "apollo-server-express";
import { alumniType } from "./types/alumniType";
import { linkedinType } from "./types/linkedinType";
import { userType } from "./types/userType";
import { linkedinResolver } from "./resolvers/linkedinResolver";
import { paginationType } from "./types/paginationType";
import { alumniResolver } from "./resolvers/alumniResolver";
import { userResolver } from "./resolvers/userResolver";
import { majorResolver } from "./resolvers/majorResolver";

export const typeDefs = gql`
	${linkedinType}
	${userType}
	${alumniType}
	${paginationType}
	${majorType}

	type Query {
		linkedinWithPagination(page: Int, limit: Int): linkedinWithPagination
		linkedinDetail(id: String!): alumniLinkedin
		alumniWithPagination(page: Int, limit: Int): alumniWithPagination
		alumniDetail(id: String!): alumni
		majorWithPagination(page: Int, limit: Int): majorWithPagination
	}

	type Mutation {
		login(email: String!, password: String!): token
		register(data: registerInput): user
		addMajor(name: String!): major
		updateMajor(id: String!, name: String!): major
		deleteMajor(id: String!): major
	}
`;

export const resolvers = {
	Query: {
		linkedinWithPagination: linkedinResolver.linkedinWithPagination,
		alumniWithPagination: alumniResolver.alumniWithPagination,
		majorWithPagination: majorResolver.majorWithPagination,
		linkedinDetail: linkedinResolver.linkedinDetail,
		alumniDetail: alumniResolver.alumniDetail,
	},
	Mutation: {
		register: userResolver.register,
		login: userResolver.login,
		addMajor: majorResolver.addMajor,
		updateMajor: majorResolver.updateMajor,
		deleteMajor: majorResolver.deleteMajor,
	},
};
