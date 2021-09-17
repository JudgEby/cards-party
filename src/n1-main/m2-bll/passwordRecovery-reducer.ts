import { AppThunk } from './store'

const initialState = {}
type InitialStateType = typeof initialState

export const passwordRecoveryReducer = (
	state: InitialStateType = initialState,
	action: PasswordRecoveryActionsType
): InitialStateType => {
	switch (action.type) {
		case 'TEST':
			return state
		default:
			return state
	}
}
// actions
const test = () => ({ type: 'TEST' } as const)
// thunks
export const testTC = (): AppThunk => dispatch => {
	dispatch(test())
}
// types

export type PasswordRecoveryActionsType = ReturnType<typeof test>
