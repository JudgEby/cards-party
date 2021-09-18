import axios from 'axios'

const instance = axios.create({
	baseURL: 'http://localhost:7542/2.0/',
	withCredentials: true
})

export const authAPI = {
	login(loginData:loginDataType){
		return instance.post('/auth/login',loginData)
	}
	getMe() {
		return instance.post('auth/me', {})
	},
}
