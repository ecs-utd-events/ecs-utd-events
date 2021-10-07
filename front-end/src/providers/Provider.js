
// const BASE_URL = process.env.REACT_APP_SERVER_URL;
const BASE_URL = 'http://localhost:80'

const getAll = async (resource, set) => {
    fetch(`${BASE_URL}/api/${resource}/all`)
    .then(response => response.json())
    .then(data => set(data))
    .catch(error => {
        console.error('There was an error fetching tags!', error);
    });
}

const getSingle = async (resource, id, set) => {
    fetch(`${BASE_URL}/api/${resource}/${id}`)
    .then(response => response.json())
    .then(data => set(data))
    .catch(error => {
        console.error('There was an error fetching tags!', error);
    });
}

export const apiProvider = { 
    getAll,
    getSingle
  };