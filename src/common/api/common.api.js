import Axios from 'axios';

const provincesUrl = `${process.env.BASE_API_URL}/provinces`;
const equipmentsUrl = `${process.env.BASE_API_URL}/equipments`;
const saleTypesUrl = `${process.env.BASE_API_URL}/saleTypes`;

export const getProvincesList = () =>
  Axios.get(provincesUrl).then((response) => {
    return response.data;
  });

export const getEquipments = () =>
  Axios.get(equipmentsUrl).then((response) => {
    return response.data;
  });

export const getSaleTypesList = () =>
  Axios.get(saleTypesUrl).then((response) => {
    return response.data;
  });
