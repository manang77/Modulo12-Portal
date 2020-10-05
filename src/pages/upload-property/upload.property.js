import {
  formValidation,
  featureFormValidation,
} from './upload-property.validations';
import {
  onSetError,
  onUpdateField,
  onSubmitForm,
  onSetFormErrors,
  onAddFile,
} from '../../common/helpers';
import {
  getProvincesList,
  getEquipments,
  getSaleTypesList,
} from '../../common/api';
import {
  setOptionList,
  setCheckboxList,
  onAddFeature,
  formatDeleteFeatureButtonId,
  onRemoveFeature,
  formatCheckboxId,
  onAddImage,
} from './upload-property.helpers';
import { mapPropertyFromVmToApi } from './upload-property.mappers';
import { insertProperty } from './upload-property.api';
const MESSAGE_FEATURE_EXISTS = {
  succeeded: false,
  message: 'Característica ya existe',
};

let property = {
  title: '',
  notes: '',
  email: '',
  phone: '',
  price: '',
  saleTypes: [],
  address: '',
  city: '',
  province: '',
  squareMeter: '',
  rooms: '',
  bathrooms: '',
  locationUrl: '',
  mainFeatures: [],
  equipments: [],
  images: [],
};

let featureToAdd = {
  newFeature: '',
};

const addElementOption = (elementList, elementToAdd) => {
  return [...elementList, elementToAdd].sort();
};

const removeElementOption = (elementList, elementToRemove) => {
  return elementList.filter((element) => element !== elementToRemove);
};

const setEquipmentsUpdateEventProcess = (equipmentList) => {
  setCheckboxList(equipmentList, 'equipments');
  equipmentList.forEach((element) => {
    const equipmentElementName = formatCheckboxId(element);
    onUpdateField(equipmentElementName, (event) => {
      const equipmentOption = event.target.value;
      const equipmentOptionIsChecked = event.target.checked;
      property = {
        ...property,
        equipments: equipmentOptionIsChecked
          ? addElementOption(property.equipments, equipmentOption)
          : removeElementOption(property.equipments, equipmentOption),
      };
    });
  });
};

const setSaleTypesUpdateEventProcess = (saleTypesList) => {
  setCheckboxList(saleTypesList, 'saleTypes');
  saleTypesList.forEach((element) => {
    const saleTypeElementName = formatCheckboxId(element);
    onUpdateField(saleTypeElementName, (event) => {
      const saleTypeOption = event.target.value;
      const saleTyoeOptionIsChecked = event.target.checked;
      property = {
        ...property,
        saleTypes: saleTyoeOptionIsChecked
          ? addElementOption(property.saleTypes, saleTypeOption)
          : removeElementOption(property.saleTypes, saleTypeOption),
      };
    });
  });
};

Promise.all([getProvincesList(), getEquipments(), getSaleTypesList()]).then(
  ([provincesList, equipmentList, saleTypesList]) => {
    setOptionList(provincesList, 'province');
    setEquipmentsUpdateEventProcess(equipmentList);
    setSaleTypesUpdateEventProcess(saleTypesList);
  }
);

const setPropertyFieldsUpdateEventProcess = (id, propertyID) => {
  onUpdateField(id, (event) => {
    const value = event.target.value;
    property = {
      ...property,
      [`${propertyID}`]: value,
    };
    formValidation
      .validateField(id, property[`${propertyID}`])
      .then((result) => {
        onSetError(id, result);
      });
  });
};

setPropertyFieldsUpdateEventProcess('title', 'title');
setPropertyFieldsUpdateEventProcess('notes', 'notes');
setPropertyFieldsUpdateEventProcess('email', 'email');
setPropertyFieldsUpdateEventProcess('phone', 'phone');
setPropertyFieldsUpdateEventProcess('price', 'price');
setPropertyFieldsUpdateEventProcess('address', 'address');
setPropertyFieldsUpdateEventProcess('city', 'city');
setPropertyFieldsUpdateEventProcess('province', 'province');
setPropertyFieldsUpdateEventProcess('squareMeter', 'squareMeter');
setPropertyFieldsUpdateEventProcess('rooms', 'rooms');
setPropertyFieldsUpdateEventProcess('bathrooms', 'bathrooms');
setPropertyFieldsUpdateEventProcess('locationUrl', 'locationUrl');

onUpdateField('newFeature', (event) => {
  const value = event.target.value;
  featureToAdd = {
    newFeature: value,
  };
  featureFormValidation
    .validateField('', featureToAdd.newFeature)
    .then((result) => {
      onSetError('newFeature', result);
    });
});

onSubmitForm('insert-feature-button', () => {
  const newFeature = featureToAdd.newFeature;
  featureFormValidation.validateForm(featureToAdd).then((result) => {
    onSetFormErrors(result);
    if (result.succeeded) {
      const featureExists = property.mainFeatures.indexOf(newFeature) >= 0;
      if (!featureExists) {
        onAddFeature(newFeature);
        const featureButton = formatDeleteFeatureButtonId(newFeature);
        onSubmitForm(featureButton, () => {
          onRemoveFeature(newFeature);
          property.mainFeatures = property.mainFeatures.filter(
            (feature) => feature !== newFeature
          );
        });
        property = {
          ...property,
          mainFeatures: [...property.mainFeatures, newFeature],
        };
        featureToAdd = {
          newFeature: '',
        };
      } else {
        onSetError('newFeature', MESSAGE_FEATURE_EXISTS);
      }
    }
  });
});

onAddFile('add-image', (imageFile) => {
  const imageExists = property.images.indexOf(imageFile) >= 0;
  if (!imageExists) {
    property = {
      ...property,
      images: [...property.images, imageFile],
    };
    onAddImage(imageFile);
  }
});

const onSave = () => {
  const apiProperty = mapPropertyFromVmToApi(property);
  return insertProperty(apiProperty);
};

onSubmitForm('save-button', () => {
  formValidation.validateForm(property).then((result) => {
    onSetFormErrors(result);
    if (result.succeeded) {
      onSave().then((apiProperty) => {
        history.back();
      });
    }
  });
});
