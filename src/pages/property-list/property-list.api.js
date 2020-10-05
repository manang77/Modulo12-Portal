import Axios from 'axios';

const url = `${process.env.BASE_API_URL}/properties`;
export const getPropertyList = (params) =>
  Axios.get(`${url}?${params}`).then((response) => {
    return response.data;
  });
