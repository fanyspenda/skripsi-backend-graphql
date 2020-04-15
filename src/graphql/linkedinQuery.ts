export const typeDef = `
	type alumniLinkedin {
		_id: ID
		name: String
		entry_year: String
		graduate_year: String
		work_at: String
		work_position: String
		email: String
		data_source: String
	}

	type page {
		page: Int
		skip: Int
	}

	type linkedinPage {
		totalPage: Int
		pages: [page]
	}

	type queryLinkedin {
		alumniLinkedin: [alumniLinkedin]
		linkedinPage: linkedinPage
	}
`;
