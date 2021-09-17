import { AppThunk } from '../m2-bll/store'

const initialState = {}
type InitialStateType = typeof initialState

export const profileReducer = (
	state: InitialStateType = initialState,
	action: ProfileActionsType
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

export type ProfileActionsType = ReturnType<typeof test>
