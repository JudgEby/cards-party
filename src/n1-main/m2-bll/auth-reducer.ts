import { AppThunk } from './store'

const initialState = {}
type InitialStateType = typeof initialState

export const authReducer = (
	state: InitialStateType = initialState,
	action: AuthActionsType
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

export type AuthActionsType = ReturnType<typeof test>
