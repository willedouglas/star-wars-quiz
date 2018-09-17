import createToast from '../../factories/createToast';

function addToast(type, message) {
	return {
		payload: createToast(type, message),
		type: 'ADD_TOAST'
	};
}

function removeToast(id) {
	return {
		payload: id,
		type: 'REMOVE_TOAST'
	};
}

export {
	addToast,
	removeToast,
};