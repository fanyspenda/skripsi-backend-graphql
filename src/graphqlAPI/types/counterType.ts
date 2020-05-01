import { gql } from "apollo-server-express";

export const counterType = gql`
	type countWorking {
		total: Int
	}

	type countNotWorking {
		total: Int
	}

	type countTotalAlumni {
		total: Int
	}
`;
