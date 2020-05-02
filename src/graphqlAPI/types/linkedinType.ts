import { gql } from "apollo-server-express";

export const linkedinType = gql`
	type alumniLinkedin {
		_id: ID
		name: String
		entry_year: String
		graduate_year: String
		major: String
		work_at: String
		work_position: String
		email: String
		data_source: String
	}

	type linkedinWithPagination {
		alumniLinkedin: [alumniLinkedin]
		linkedinPage: pagination
		totalData: Int
	}

	type linkedinDetail {
		alumniLinkedin: alumniLinkedin
	}
`;
