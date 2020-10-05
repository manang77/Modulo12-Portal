import { getEquipments } from './property-detail.api';

const getRoomWord = (roomsNumber) => {
  return roomsNumber > 1 ? 'habitaciones' : 'habitacion';
};

const getBathroomWord = (bathroomsNumber) => {
  return bathroomsNumber > 1 ? 'baños' : 'baño';
};

export const mapPropertyFromApiToVM = (apiProperty, equipmentList) => {
  const propertyEquipmentNames = apiProperty.equipmentIds.map((equipment) => {
    const foundEquipment = equipmentList.find(
      (apiEquipment) => apiEquipment.id == equipment
    );
    return foundEquipment.name;
  });
  return {
    id: apiProperty.id,
    mainImage: Array.isArray(apiProperty.images) ? apiProperty.images[0] : '',
    title: apiProperty.title,
    city: apiProperty.city,
    rooms: `${apiProperty.rooms} ${getRoomWord(apiProperty.rooms)}`,
    squareMeter: `${apiProperty.squareMeter}m2`,
    bathrooms: `${apiProperty.bathrooms} ${getBathroomWord(
      apiProperty.bathrooms
    )}`,
    price: `${apiProperty.price.toLocaleString()} €`,
    notes: apiProperty.notes,
    mainFeatures: apiProperty.mainFeatures,
    equipments: propertyEquipmentNames,
    locationUrl: apiProperty.locationUrl,
    images: apiProperty.images,
  };
};
