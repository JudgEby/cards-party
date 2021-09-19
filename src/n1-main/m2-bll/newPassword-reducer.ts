import { AppThunk } from './store'
import { authAPI } from '../m3-dal/api'

const initialState = {
	newPasswordSendingSuccess: false,
	newPasswordSendingError: null as null | string,
}
type InitialStateType = typeof initialState

export const newPasswordReducer = (
	state: InitialStateType = initialState,
	action: NewPasswordActionsType
): InitialStateType => {
	switch (action.type) {
		case 'NEW-PASSWORD/SET-NEW-PASSWORD-SENDING-SUCCESS':
		case 'NEW-PASSWORD/SET-NEW-PASSWORD-SENDING-ERROR': {
			return { ...state, ...action.payload }
		}
		default:
			return state
	}
}
// actions
const setNewPasswordSendingSuccess = (newPasswordSendingSuccess: boolean) =>
	({
		type: 'NEW-PASSWORD/SET-NEW-PASSWORD-SENDING-SUCCESS',
		payload: { newPasswordSendingSuccess },
	} as const)
const setNewPasswordSendingError = (newPasswordSendingError: null | string) =>
	({
		type: 'NEW-PASSWORD/SET-NEW-PASSWORD-SENDING-ERROR',
		payload: { newPasswordSendingError },
	} as const)

// thunks
export const sendNewPassword =
	(password: string, resetPasswordToken: string): AppThunk =>
	async dispatch => {
		try {
			await authAPI.sendNewPassword(password, resetPasswordToken)
			dispatch(setNewPasswordSendingSuccess(true))
			dispatch(setNewPasswordSendingError(null))
		} catch (e: any) {
			if (e.response) {
				dispatch(setNewPasswordSendingError(e.response.data.error))
			} else {
				dispatch(
					setNewPasswordSendingError(
						'Something went wrong. Try again later.'
					)
				)
			}
			dispatch(setNewPasswordSendingSuccess(false))
		}
	}

// types
export type NewPasswordActionsType =
	| ReturnType<typeof setNewPasswordSendingSuccess>
	| ReturnType<typeof setNewPasswordSendingError>
