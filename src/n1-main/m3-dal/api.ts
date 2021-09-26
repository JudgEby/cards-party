import axios from 'axios'
import { loginDataType } from '../m2-bll/auth-reducer'

const instance = axios.create({
	baseURL: 'http://localhost:7542/2.0/',
	withCredentials: true,
})

const instance2 = axios.create({
	baseURL: 'https://neko-back.herokuapp.com/2.0/',
	withCredentials: true,
})

const linkInRecoverEmailToLocal = 'http://localhost:3000/#/password/new/$token$'
const linkInRecoverEmailToGithubPages =
	'https://judgeby.github.io/cards-party/#/password/new/$token$'

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
	},
	//локальный бэк не поддерживает этот запрос - делать на хероку
	sendPasswordRecoveryRequest(email: string) {
		return axios.post(
			'https://neko-back.herokuapp.com/2.0/auth/forgot',
			{
				email,
				from: 'Best of the best',
				message: `<div style='background-color: lime; padding: 15px'>password recovery link: <a href=${linkInRecoverEmailToLocal}>link</a></div>`,
			},
			{ withCredentials: true }
		)
	},
	sendNewPassword(password: string, resetPasswordToken: string) {
		return instance.post('/auth/set-new-password', {
			password,
			resetPasswordToken,
		})
	},
}

export const CardsPacksAPI = {
	getPacks(params:any){
		return instance.get('/cards/pack',{params:params})
	}
}
