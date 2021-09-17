import { AppThunk } from './store'

const initialState = {}
type InitialStateType = typeof initialState

export const registrationReducer = (
	state: InitialStateType = initialState,
	action: RegistrationActionsType
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

export type RegistrationActionsType = ReturnType<typeof test>
