import { gql } from "apollo-server-express";

export const majorType = gql`
	type major {
		_id: ID
		name: String
	}
`;
