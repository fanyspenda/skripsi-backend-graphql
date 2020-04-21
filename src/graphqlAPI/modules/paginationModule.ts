export const pagination = (
	totalPage: number,
	reqPage: number,
	limit: number
) => {
	let pages = [];
	for (let index = 0; index < 4; index++) {
		let newPage = 0;
		//jika total halaman kurang dari 4
		if (totalPage < index + 1) {
			break;
		}

		//jika halaman yang diminta < 3, halaman dimulai dari 1 - 4 (agar tidak ada halaman minus)
		if (reqPage < 4) {
			newPage = index + 1;
		}

		//jika halaman yang diminta mendekati halaman terakhir, halaman yang dimunculkan adalah 4 halaman terakhir
		//(agar tidak ada halaman yang lebih dari total halaman)
		else if (reqPage > totalPage - 3) {
			newPage = totalPage - (3 - index);
		}

		//jika halaman normal (tidak mendekati awal ataupun akhir)
		else {
			newPage = reqPage - (1 - index);
		}
		let skipOnPage = newPage * limit - limit;
		pages.push({ page: newPage, skip: skipOnPage });
	}

	return pages;
};
