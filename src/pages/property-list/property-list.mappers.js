const mapPropertyFromApiToVM = (apiProperty) => {
  return {
    id: apiProperty.id,
    title: apiProperty.title,
    image: Array.isArray(apiProperty.images) ? apiProperty.images[0] : '',
    rooms: `${apiProperty.rooms} ${getRoomWord(apiProperty.rooms)}`,
    squareMeter: `${apiProperty.squareMeter}m2`,
    notes: `${apiProperty.notes.substring(0, 240)}...`,
    price: `${apiProperty.price.toLocaleString()} €`,
  };
};

export const mapPropertyListFromApiToVM = (propertyList) => {
  return propertyList.map((apiProperty) => mapPropertyFromApiToVM(apiProperty));
};

const getRoomWord = (roomsNumber) => {
  return roomsNumber > 1 ? 'habitaciones' : 'habitacion';
};

export const mapFilterToQueryParams = (filter) => {
  let queryParams = '';

  if (filter.saleTypeId) {
    queryParams = `${queryParams}saleTypeIds_like=${filter.saleTypeId}&`;
  }

  if (filter.provinceId) {
    queryParams = `${queryParams}provinceId=${filter.provinceId}&`;
  }

  if (filter.minRooms) {
    queryParams = `${queryParams}rooms_gte=${filter.minRooms}&`;
  }

  if (filter.minBathRooms) {
    queryParams = `${queryParams}bathrooms_gte=${filter.minBathRooms}&`;
  }

  if (filter.minPrice) {
    queryParams = `${queryParams}price_gte=${filter.minPrice}&`;
  }

  if (filter.maxPrice) {
    queryParams = `${queryParams}price_lte=${filter.maxPrice}&`;
  }

  return queryParams.slice(0, -1);
};
