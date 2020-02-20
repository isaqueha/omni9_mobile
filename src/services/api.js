import axios from 'axios';

const api = axios.create({
	baseURL: 'http://i4-ead.anonymous.mobile.exp.direct:3333',
})

export default api;