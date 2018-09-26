import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://api.holydef.ir/'
});

export default instance;