import axios from 'axios';

export async function axiosData() {
  const data = await axios.get('/json-data/lineChart.json')
    .then(response => {
      return {error: null, isLoading: null, response: response};
    })
    .catch(error => {
      return {error: true, isLoading: false, response: error};
    });
  return data;
};
