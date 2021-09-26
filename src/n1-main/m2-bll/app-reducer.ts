import { authAPI } from '../m3-dal/api'
import { AppThunk } from './store'
import { setProfileData } from './profile-reducer'
import { setIsAuthorized } from './auth-reducer'

const initialState = {
	status: 'idle' as RequestStatusType,
	error: null as string | null,
	isInitialized: false,
}
type InitialStateType = typeof initialState

export const appReducer = (
	state: InitialStateType = initialState,
	action: AppActionsType
): InitialStateType => {
	switch (action.type) {
		case 'APP/SET-APP-ERROR':
		case 'APP/SET-APP-STATUS':
		case 'APP/SET-APP-INITIALIZED': {
			return { ...state, ...action.payload }
		}
		default:
			return state
	}
}

//actions
export const setAppErrorAC = (error: string | null) =>
	({ type: 'APP/SET-APP-ERROR', payload: { error } } as const)
export const setAppStatusAC = (status: RequestStatusType) =>
	({ type: 'APP/SET-APP-STATUS', payload: { status } } as const)
export const setIsInitialized = (isInitialized: boolean) =>
	({ type: 'APP/SET-APP-INITIALIZED', payload: { isInitialized } } as const)

//thunks
export const initializeAppTC = (): AppThunk => async dispatch => {
	try {
		dispatch(setAppStatusAC('loading'))
		const res = await authAPI.getMe()
		const { _id, avatar, name, email, publicCardPacksCount, verified } =
			res.data
		dispatch(
			setProfileData({
				_id,
				avatar,
				name,
				email,
				publicCardPacksCount,
				verified,
			})
		)
		dispatch(setIsAuthorized(true))
		dispatch(setAppStatusAC('succeeded'))
	} catch (e: any) {
		if (e.response) {
			dispatch(setAppErrorAC(e.response.data.error))
			dispatch(setAppStatusAC('failed'))
		}
	} finally {
		dispatch(setIsInitialized(true))
	}
}

//types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type AppActionsType =
	| ReturnType<typeof setAppErrorAC>
	| ReturnType<typeof setAppStatusAC>
	| ReturnType<typeof setIsInitialized>
