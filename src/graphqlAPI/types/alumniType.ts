import { gql } from "apollo-server-express";

export const alumniType = gql`
	type alumni {
		_id: ID
		name: String
		entry_year: Int
		graduate_year: Int
		major: String
		work_at: String
		work_position: String
		email: String
		data_source: String
	}

	type alumniWithPagination {
		alumni: [alumni]
		alumniPage: pagination
		totalData: Int
	}

	type alumniDetail {
		alumni: alumni
	}

	input alumniInput {
		name: String!
		entry_year: Int!
		graduate_year: Int!
		work_at: String
		work_position: String
		email: String
		data_source: String!
	}
`;
