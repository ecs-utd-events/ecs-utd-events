
const BASE_URL = process.env.REACT_APP_SERVER_URL;
// BASE_URL - https://us-central1-ecs-utd-events.cloudfunctions.net/app

const getAll = async (resource, set) => {
    fetch(`${BASE_URL}/${resource}`, {method: 'GET', mode: 'cors', redirect: 'follow'})
    .then(response => response.json())
    .then(data => set(data))
    .catch(error => {
        console.error('There was an error fetching tags!', error);
    });
}

const getSingle = async (resource, id, set) => {
    fetch(`${BASE_URL}/${resource}/${id}`)
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