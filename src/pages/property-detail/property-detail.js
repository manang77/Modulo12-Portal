import { history } from '../../core/router';
import { getProperty, insertContact } from './property-detail.api';
import { getEquipments } from '../../common/api';
import { setPropertyValues } from './property-detail.helpers';
import { mapPropertyFromApiToVM } from './property-detail.mappers';
import {
  onUpdateField,
  onSubmitForm,
  onSetError,
  onSetFormErrors,
  onSetValues,
} from '../../common/helpers';
import { formValidation } from './property-detail.validations';

const params = history.getParams();
const isParameterPassed = Boolean(params.id);

if (!isParameterPassed) {
  history.back();
}

let property = {
  id: '',
  mainImage: '',
  title: '',
  city: '',
  rooms: '',
  squareMeter: '',
  bathroons: '',
  price: '',
  notes: '',
  mainFeatures: [],
  equipments: [],
  locationUrl: '',
  images: [],
};

let contact = {
  email: '',
  message: '',
};

Promise.all([getProperty(params.id), getEquipments()]).then(
  ([apiProperty, equipmentList]) => {
    property = mapPropertyFromApiToVM(apiProperty, equipmentList);
    setPropertyValues(property);
  }
);

onUpdateField('email', (event) => {
  const value = event.target.value;
  contact = {
    ...contact,
    email: value,
  };
  formValidation.validateField('email', contact.email).then((result) => {
    onSetError('email', result);
  });
});

onUpdateField('message', (event) => {
  const value = event.target.value;
  contact = {
    ...contact,
    message: value,
  };
  formValidation.validateField('message', contact.message).then((result) => {
    onSetError('message', result);
  });
});

const onSave = () => {
  return insertContact(contact);
};

onSubmitForm('contact-button', () => {
  formValidation.validateForm(contact).then((result) => {
    onSetFormErrors(result);
    if (result.succeeded) {
      onSave().then((response) => {
        window.alert('Mensaje enviado correctamente');
        contact = {
          email: '',
          message: '',
        };
        onSetValues(contact);
      });
    }
  });
});
