import { gql } from "apollo-server-express";

export const majorType = gql`
	type major {
		_id: ID
		name: String
	}

	type majorWithPagination {
		majors: [major]
		majorPage: pagination
		totalData: Int
	}
`;
