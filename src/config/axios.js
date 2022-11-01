import axios from 'axios'

axios.interceptors.request.use(function (config) {
	config.auth = {
		username: 'demo',
		password: 'demo',
	}
	return config
})
