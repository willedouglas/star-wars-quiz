import { isEmpty, isEmail } from '../../../utils/functions';

const validateForm = (data, isScore) => {
	const {
		inputTry,
		inputName,
		inputEmail
	} = data;

	const validateError = {};
  
	if (isScore) {
		validateError.inputName = isEmpty(inputName);
		validateError.inputEmail = isEmail(inputEmail) || isEmpty(inputEmail);
	} else {
		validateError.inputTry = isEmpty(inputTry);
	}
	
	return validateError;
};

export default validateForm;