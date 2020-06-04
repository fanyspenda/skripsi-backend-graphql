import { counterType } from "./types/counterType";
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
import { counterResolver } from "./resolvers/counterResolver";

export const typeDefs = gql`
	${linkedinType}
	${userType}
	${alumniType}
	${paginationType}
	${majorType}

	type Query {
		searchLinkedin(name: String!): linkedinWithPagination
		linkedinWithPagination(
			page: Int
			limit: Int
			name: String
		): linkedinWithPagination
		linkedinDetail(id: String!): alumniLinkedin
		alumniWithPagination(
			page: Int
			limit: Int
			name: String
		): alumniWithPagination
		majorWithPagination(page: Int, limit: Int): majorWithPagination
		userWithPagination(page: Int, limit: Int): userWithPagination
		alumniDetail(id: String!): alumni
		majorDetail(id: String!): major
		countWorkingAlumni: Int
		countNotWorkingAlumni: Int
		countTotalAlumni: Int
		countAlumniManual: Int
		countLinkedin: Int
	}

	type Mutation {
		login(email: String!, password: String!): token
		register(data: registerInput): user
		addAlumni(data: alumniInput): alumni
		updateAlumni(id: String!, data: alumniInput): alumni
		deleteAlumni(id: String!): alumni
		addMajor(name: String!): major
		updateMajor(id: String!, name: String!): major
		deleteMajor(id: String!): major
		addUser(data: addUserInput): Boolean
		updateUser(id: String!, data: updateUserInput): Boolean
		resetPass(id: String!, password: String!): Boolean
		deleteUser(id: String!): Boolean
	}
`;

export const resolvers = {
	Query: {
		linkedinWithPagination: linkedinResolver.linkedinWithPagination,
		alumniWithPagination: alumniResolver.alumniWithPagination,
		majorWithPagination: majorResolver.majorWithPagination,
		userWithPagination: userResolver.userWithPagination,
		linkedinDetail: linkedinResolver.linkedinDetail,
		alumniDetail: alumniResolver.alumniDetail,
		majorDetail: majorResolver.majorDetail,
		countWorkingAlumni: counterResolver.countWorking,
		countNotWorkingAlumni: counterResolver.countNotWorking,
		countTotalAlumni: counterResolver.countTotalAlumni,
		countAlumniManual: counterResolver.countAlumniManual,
		countLinkedin: counterResolver.countLinkedin,
	},
	Mutation: {
		register: userResolver.register,
		login: userResolver.login,
		addMajor: majorResolver.addMajor,
		updateMajor: majorResolver.updateMajor,
		deleteMajor: majorResolver.deleteMajor,
		addAlumni: alumniResolver.addAlumni,
		updateAlumni: alumniResolver.updateAlumni,
		deleteAlumni: alumniResolver.deleteAlumni,
		addUser: userResolver.addUser,
		updateUser: userResolver.updateUser,
		resetPass: userResolver.resetPass,
		deleteUser: userResolver.deleteUser,
	},
};
