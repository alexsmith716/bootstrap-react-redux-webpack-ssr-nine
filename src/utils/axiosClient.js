import axios from 'axios';

export async function axiosData(request) {
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
