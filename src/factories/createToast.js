let id = 0;

function createToast(type, message) {
	return {
		type,
		message,
		id: id++
	};
}

export default createToast;