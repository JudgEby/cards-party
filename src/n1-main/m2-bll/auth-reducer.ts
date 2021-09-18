import { AppThunk } from './store'
import { authAPI } from '../m3-dal/api'

const initialState = {
	_id: null,
	isAuthorized: false,
	email: null,
	name: null,
	avatar: null,
	publicCardPacksCount: 0,
	verified: false,
	error: ''
}
type InitialStateType = {
	_id: null | string,
	isAuthorized: boolean,
	email: null | string,
	name: null | string,
	avatar: null | string,
	publicCardPacksCount: number,
	verified: boolean
	error: string
}

export const authReducer = (state: InitialStateType = initialState, action: AuthActionsType): InitialStateType => {
	switch (action.type) {
		case 'AUTH/LOGIN':
			return {
				...state,
				isAuthorized: action.data.isAuthorized,
				_id: action.data._id,
				avatar: action.data.avatar,
				name: action.data.name,
				email: action.data.email,
				publicCardPacksCount: action.data.publicCardPacksCount,
				verified: action.data.verified
			}
		case 'AUTH/ERROR':
			debugger
			return{...state,error:action.err}
		default:
			return state
	}
}
// actions
const Login = (data: dataType) => ({ type: 'AUTH/LOGIN', data } as const)
const setError = (err: string) => ({ type: 'AUTH/ERROR', err } as const )

// thunks
export const LoginTC = (loginData: loginDataType): AppThunk => dispatch => {
	authAPI.login(loginData).then(res => {
		let data: dataType = {
			_id: res.data._id,
			avatar: res.data.avatar,
			name: res.data.name,
			email: res.data.email,
			publicCardPacksCount: res.data.publicCardPacksCount,
			verified: res.data.verified,
			isAuthorized: true
		}
		dispatch(Login(data))
	})
		.catch(e => {
			const error = e.response ? e.response.data.error : (e.message + 'more details in console')
			dispatch(setError(error))
		})
}

// types
export type LoginAT = ReturnType<typeof Login>
export type setErrorAT = ReturnType<typeof setError>
export type dataType = {
	_id: string,
	isAuthorized: boolean,
	email: string,
	name: string,
	avatar: string,
	publicCardPacksCount: number,
	verified: boolean
}
export type loginDataType = {
	email: string,
	password: string,
	rememberMe: boolean
}

export type AuthActionsType = LoginAT | setErrorAT
