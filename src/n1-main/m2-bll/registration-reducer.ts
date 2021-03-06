import { AppThunk } from './store'
import { authAPI } from '../m3-dal/api'
import { setIsLoading } from './auth-reducer'

const initialState = {
	isRegistered: false,
	error: null as null | string
}
type InitialStateType = typeof initialState

export const registrationReducer = (
	state: InitialStateType = initialState,
	action: RegistrationActionsType
): InitialStateType => {
	switch (action.type) {
		case 'REGISTRATION/ERROR':
			return { ...state, error: action.error }
		case 'REGISTRATION/REGISTER':
			return { ...state, isRegistered: action.isRegistered }
		default:
			return state
	}
}
// actions
export const setError = (error: string | null) => ({ type: 'REGISTRATION/ERROR', error } as const)
const register = (isRegistered: boolean) => ({ type: 'REGISTRATION/REGISTER', isRegistered } as const)
// thunks
export const registerTC = (email: string, password: string): AppThunk => async dispatch => {
	try {
		dispatch(setIsLoading(true))
		dispatch(setError(null))
		await authAPI.register(email, password)
		dispatch(register(true))
	} catch (e: any) {
		if (e.response) {
			dispatch(setError(e.response.data.error))
		} else {
			dispatch(setError(e.message))
		}
	} finally {
		dispatch(setIsLoading(false))
	}
}
// types

export type RegistrationActionsType = ReturnType<typeof setError> | ReturnType<typeof register>
