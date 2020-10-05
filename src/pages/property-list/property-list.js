import { getPropertyList } from './property-list.api';
import { getProvincesList, getSaleTypesList } from '../../common/api';
import {
  addPropertyRows,
  setOptions,
  clearPropertyRows,
} from './property-list.helpers';
import {
  mapPropertyListFromApiToVM,
  mapFilterToQueryParams,
} from './property-list.mappers';
import {
  roomOptions,
  bathRoomsOptions,
  minPriceOptions,
  maxPriceOptions,
} from './property-list.constants';
import { onUpdateField, onSubmitForm } from '../../common/helpers';

const loadPropertyList = (propertyList) => {
  const propertyListVM = mapPropertyListFromApiToVM(propertyList);
  addPropertyRows(propertyListVM);
};

Promise.all([getPropertyList(), getSaleTypesList(), getProvincesList()]).then(
  ([propertyList, saleTypesList, provincesList]) => {
    setOptions(saleTypesList, 'select-sale-type', '¿Que venta?');
    setOptions(provincesList, 'select-province', '¿Donde?');
    loadPropertyList(propertyList);
    setOptions(roomOptions, 'select-room', '¿Habitaciones?');
    setOptions(bathRoomsOptions, 'select-bathroom', '¿Cuartos de baño?');
    setOptions(minPriceOptions, 'select-min-price', 'Min (Eur)');
    setOptions(maxPriceOptions, 'select-max-price', 'Max (Eur)');
  }
);

let filter = {
  saleTypeId: '',
  provinceId: '',
  minRooms: '',
  minBathRooms: '',
  minPrice: '',
  maxPrice: '',
};

const setFilterUpdateEventProcess = (id, propertyID) => {
  onUpdateField(id, (event) => {
    const value = event.target.value;
    filter = {
      ...filter,
      [`${propertyID}`]: value,
    };
  });
};

setFilterUpdateEventProcess('select-sale-type', 'saleTypeId');
setFilterUpdateEventProcess('select-province', 'provinceId');
setFilterUpdateEventProcess('select-room', 'minRooms');
setFilterUpdateEventProcess('select-bathroom', 'minBathRooms');
setFilterUpdateEventProcess('select-min-price', 'minPrice');
setFilterUpdateEventProcess('select-max-price', 'maxPrice');

onSubmitForm('search-button', () => {
  clearPropertyRows();
  const queryParams = mapFilterToQueryParams(filter);
  getPropertyList(queryParams).then((propertyList) => {
    loadPropertyList(propertyList);
  });
});
