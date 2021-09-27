import axios from 'axios'
import { loginDataType } from '../m2-bll/auth-reducer'
import { authServerEndpoints, cardsServerEndpoints } from './endpoints'

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
		return instance.post(authServerEndpoints.me, {})
	},
	login(loginData: loginDataType) {
		return instance.post(authServerEndpoints.login, loginData)
	},
	logout() {
		return instance.delete(authServerEndpoints.me)
	},
	register(email: string, password: string) {
		return instance.post(authServerEndpoints.register, { email, password })
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
		return instance.post(authServerEndpoints.setNewPassword, {
			password,
			resetPasswordToken,
		})
	},
	updateUserName(name: string) {
		return instance.put(authServerEndpoints.me, { name })
	},
	updateUserAvatarUrl(avatar: string) {
		return instance.put(authServerEndpoints.me, { avatar })
	},
}

export const cardsPacksAPI = {
	getPacks(params: any) {
		return instance.get(cardsServerEndpoints.pack, { params: params })
	},
	getCards(params: any) {
		return instance.get(cardsServerEndpoints.card, { params: params })
	},
	addPack(name: string, privatePack: boolean = false, deckCover: string = '') {
		return instance.post(cardsServerEndpoints.pack, {
			cardsPack: {
				name,
				private: privatePack,
				deckCover,
			},
		})
	},
	deletePack(packId: string) {
		return instance.delete(`${cardsServerEndpoints.pack}?id=${packId}`)
	},
	addCard (cardsPack_id:string) {
		return instance.post(cardsServerEndpoints.card,{
			card:{
				cardsPack_id
			}
		})
	}
}
