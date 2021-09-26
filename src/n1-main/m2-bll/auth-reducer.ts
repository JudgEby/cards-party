import { AppThunk } from './store'
import { authAPI } from '../m3-dal/api'
import { clearProfileData, setProfileData } from './profile-reducer'

const initialState = {
	isAuthorized: false,
	error: '',
	isLoading: false,
}
type InitialStateType = {
	isAuthorized: boolean
	error: string
	isLoading: boolean
}

export const authReducer = (
	state: InitialStateType = initialState,
	action: AuthActionsType
): InitialStateType => {
	switch (action.type) {
		case 'AUTH/LOGIN':
			return {
				...state,
				isAuthorized: action.isAuthorized,
			}
		case 'AUTH/ERROR':
			return { ...state, error: action.err }
		case 'AUTH/IS-LOADING':
			return { ...state, isLoading: action.isLoading }
		default:
			return state
	}
}
// actions
export const setIsAuthorized = (isAuthorized: boolean) =>
	({ type: 'AUTH/LOGIN', isAuthorized } as const)
const setError = (err: string) => ({ type: 'AUTH/ERROR', err } as const)
export const setIsLoading = (isLoading: boolean) =>
	({ type: 'AUTH/IS-LOADING', isLoading } as const)

// thunks
export const LoginTC =
	(loginData: loginDataType): AppThunk =>
	dispatch => {
		dispatch(setIsLoading(true))
		authAPI
			.login(loginData)
			.then(res => {
				let data: dataType = {
					_id: res.data._id,
					avatar: res.data.avatar,
					name: res.data.name,
					email: res.data.email,
					publicCardPacksCount: res.data.publicCardPacksCount,
					verified: res.data.verified,
				}
				dispatch(setProfileData(data))
				dispatch(setIsAuthorized(true))
				dispatch(setIsLoading(false))
			})
			.catch(e => {
				const error = e.response
					? e.response.data.error
					: e.message + 'more details in console'
				dispatch(setError(error))
				dispatch(setIsLoading(false))
			})
	}
export const getMe = (): AppThunk => async dispatch => {
	try {
		const res = await authAPI.getMe()
		const { _id, email, avatar, name, publicCardPacksCount, verified } =
			res.data
		dispatch(
			setProfileData({
				_id,
				email,
				avatar,
				name,
				publicCardPacksCount,
				verified,
			})
		)
		dispatch(setIsAuthorized(true))
	} catch (e: any) {}
}
export const logout = (): AppThunk => async dispatch => {
	try {
		dispatch(setIsLoading(true))
		await authAPI.logout()
		dispatch(setIsAuthorized(false))
		dispatch(clearProfileData())
		dispatch(setIsLoading(false))
	} catch (e: any) {
		dispatch(setIsLoading(false))
	}
}
// types
export type LoginAT = ReturnType<typeof setIsAuthorized>
export type setErrorAT = ReturnType<typeof setError>
export type setIsLoadingAT = ReturnType<typeof setIsLoading>
export type dataType = {
	_id: string
	email: string
	name: string
	avatar: string
	publicCardPacksCount: number
	verified: boolean
}
export type loginDataType = {
	email: string
	password: string
	rememberMe: boolean
}

export type AuthActionsType = LoginAT | setErrorAT | setIsLoadingAT
