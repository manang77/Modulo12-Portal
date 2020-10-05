import { Validators, createFormValidation } from '@lemoncode/fonk';
import { isUrl } from '@lemoncode/fonk-is-url-validator';
import { arrayRequired } from '@lemoncode/fonk-array-required-validator';
import {
  amountValidator,
  intValidator,
} from './upload-property.validations.custom';

const validationSchema = {
  field: {
    title: [{ validator: Validators.required, message: 'Campo requerido' }],
    notes: [{ validator: Validators.required, message: 'Campo requerido' }],
    email: [
      { validator: Validators.required, message: 'Campo requerido' },
      { validator: Validators.email, message: 'Email no valido' },
    ],
    phone: [
      { validator: Validators.required, message: 'Campo requerido' },
      {
        validator: Validators.pattern,
        customArgs: { pattern: '^(6|7|9)\\d{8}$' },
        message: 'Numero de telefono invalido',
      },
    ],
    price: [
      { validator: Validators.required, message: 'Campo requerido' },
      { validator: amountValidator },
    ],
    address: [{ validator: Validators.required, message: 'Campo requerido' }],
    city: [{ validator: Validators.required, message: 'Campo requerido' }],
    province: [{ validator: Validators.required, message: 'Campo requerido' }],
    squareMeter: [
      { validator: Validators.required, message: 'Campo requerido' },
      { validator: intValidator },
    ],
    rooms: [
      { validator: Validators.required, message: 'Campo requerido' },
      { validator: intValidator },
    ],
    bathrooms: [
      { validator: Validators.required, message: 'Campo requerido' },
      { validator: intValidator },
    ],
    locationUrl: [
      { validator: Validators.required, message: 'Campo requerido' },
      { validator: isUrl.validator, message: 'Debe introducir url valida' },
      {
        validator: Validators.pattern,
        customArgs: { pattern: '^https://www.google.com/maps/embed\\?.*' },
        message: 'Debe introducir url valida',
      },
    ],
    mainFeatures: [
      {
        validator: arrayRequired.validator,
        message: 'Se debe incluir al menos una característica basica',
      },
    ],
    equipments: [
      {
        validator: arrayRequired.validator,
        message: 'Se debe incluir al menos un equipamiento',
      },
    ],
    saleTypes: [
      {
        validator: arrayRequired.validator,
        message: 'Se debe incluir al menos un tipo de venta',
      },
    ],
  },
};

const featureValidationSchema = {
  field: {
    newFeature: [
      {
        validator: Validators.required,
        message: 'Campo requerido para añadir Feature',
      },
    ],
  },
};

export const formValidation = createFormValidation(validationSchema);
export const featureFormValidation = createFormValidation(
  featureValidationSchema
);
