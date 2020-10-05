import Axios from 'axios';

const url = `${process.env.BASE_API_URL}/properties`;
const contactUrl = `${process.env.BASE_API_URL}/contact`;

export const getProperty = (id) =>
  Axios.get(`${url}?id=${id}`).then((response) => {
    return response.data[0];
  });

export const insertContact = (contact) =>
  Axios.post(`${contactUrl}/`, contact).then((response) => {
    return response.data;
  });
