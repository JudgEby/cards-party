import axios from 'axios'
import { loginDataType } from '../m2-bll/auth-reducer'

const instance = axios.create({
	baseURL: 'http://localhost:7542/2.0/',
	withCredentials: true,
})

export const authAPI = {
	getMe() {
		return instance.post('auth/me', {})
	},
	login(loginData: loginDataType) {
		return instance.post('/auth/login', loginData)
	},
	logout() {
		return instance.delete('auth/me')
	},
	register(email: string, password: string) {
		return instance.post('/auth/register', { email, password })
	}
}
