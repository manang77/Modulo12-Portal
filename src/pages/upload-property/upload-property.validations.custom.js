const amountValidatorType = 'AMOUNT_VALIDATOR';
export const amountValidator = (validatorArgs) => {
  const { value } = validatorArgs;
  const amountValidationResult = {
    succeeded: false,
    type: amountValidatorType,
    message: 'El campo debe ser un valor numerico válido',
  };
  if (!isNaN(parseFloat(value))) {
    amountValidationResult.succeeded = true;
    amountValidationResult.message = '';
  }
  return amountValidationResult;
};

const intValidatorType = 'INTEGER_VALIDATOR';
export const intValidator = (validatorArgs) => {
  const { value } = validatorArgs;
  const intValidationResult = {
    succeeded: false,
    type: intValidatorType,
    message: 'El campo debe ser un valor numerico válido',
  };
  if (!isNaN(parseInt(value))) {
    intValidationResult.succeeded = true;
    intValidationResult.message = '';
  }
  return intValidationResult;
};
