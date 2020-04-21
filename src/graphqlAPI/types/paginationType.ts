import { gql } from "apollo-server-express";

export const paginationType = gql`
	type page {
		page: Int
		skip: Int
	}

	type pagination {
		totalPage: Int
		pages: [page]
	}
`;
