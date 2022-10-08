import axios from 'axios';

const server = axios.create({
    baseURL: window.env.server.url
});

export { server };

