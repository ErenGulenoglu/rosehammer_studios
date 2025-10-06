import axios from "axios";

const isDevelopment = import.meta.env.MODE === "development";

const api = isDevelopment
	? axios.create({
			baseURL: import.meta.env.VITE_API_BASE_URL_LOCAL,
	  })
	: axios.create({
			baseURL: import.meta.env.VITE_API_BASE_URL_DEPLOY,
	  });

export default api;
