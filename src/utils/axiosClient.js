import axios from 'axios';
import config from '../../config/config';

export default async function axiosClient(request) {
  try {
    const response = await axios.get(request);
    return {error: null, isLoading: null, response: response};

  } catch (error) {
    return {error: true, isLoading: false, response: error};
  }
};

// export async function axiosData(request) {
//   const data = await axios.get(request)
//     .then(response => {
//       return {error: null, isLoading: null, response: response};
//     })
//     .catch(error => {
//       return {error: true, isLoading: false, response: error};
//     });
//   return data;
// };
