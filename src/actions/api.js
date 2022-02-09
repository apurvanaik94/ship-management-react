import axios from 'axios';

const baseURL = "https://localhost:7280/api/";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    ship(url = baseURL + 'ships/') {
        return {
            fetchAll: () => axios.get(url),
            fetchById: id => axios.get(url + id),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updatedRecord) => axios.put(url + id, updatedRecord),
            delete: id => axios.delete(url + id)
        }
    }
}