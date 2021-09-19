import { AppThunk } from './store'
import { authAPI } from '../m3-dal/api'

const initialState = {
	recoveryError: null as null | string,
	recoverySendSuccess: false,
}
type InitialStateType = typeof initialState

export const passwordRecoveryReducer = (
	state: InitialStateType = initialState,
	action: PasswordRecoveryActionsType
): InitialStateType => {
	switch (action.type) {
		case 'PASSWORD-RECOVERY/SET-RECOVERY-ERROR': {
			return { ...state, recoveryError: action.recoveryError }
		}
		case 'PASSWORD-RECOVERY/SET-RECOVERY-SEND-SUCCESS': {
			return { ...state, recoverySendSuccess: action.recoverySendSuccess }
		}
		default:
			return state
	}
}
// actions
const setRecoveryError = (recoveryError: null | string) =>
	({ type: 'PASSWORD-RECOVERY/SET-RECOVERY-ERROR', recoveryError } as const)
const setRecoverySendSuccess = (recoverySendSuccess: boolean) =>
	({
		type: 'PASSWORD-RECOVERY/SET-RECOVERY-SEND-SUCCESS',
		recoverySendSuccess,
	} as const)
// thunks

export const sendPasswordRecovery =
	(email: string): AppThunk =>
	async dispatch => {
		try {
			await authAPI.sendPasswordRecoveryRequest(email)
			dispatch(setRecoveryError(null))
			dispatch(setRecoverySendSuccess(true))
		} catch (e: any) {
			dispatch(setRecoveryError(e.response.data.error))
			dispatch(setRecoverySendSuccess(false))
		}
	}
// types

export type PasswordRecoveryActionsType =
	| ReturnType<typeof setRecoveryError>
	| ReturnType<typeof setRecoverySendSuccess>
