export const mapPropertyFromVmToApi = (vmProperty) => {
  return {
    title: vmProperty.title,
    notes: vmProperty.notes,
    email: vmProperty.email,
    phone: vmProperty.phone,
    price: parseFloat(vmProperty.price),
    saleTypeIds: vmProperty.saleTypes,
    address: vmProperty.address,
    city: vmProperty.city,
    provinceId: vmProperty.province,
    squareMeter: parseFloat(vmProperty.squareMeter),
    rooms: parseInt(vmProperty.rooms),
    bathrooms: parseInt(vmProperty.bathrooms),
    locationUrl: vmProperty.locationUrl,
    mainFeatures: vmProperty.mainFeatures,
    equipmentIds: vmProperty.equipments,
    images: vmProperty.images,
  };
};
