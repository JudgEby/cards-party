import { AppThunk } from './store'

const initialState = {
	_id: null as null | string,
	name: null as null | string,
	email: null as null | string,
	avatar: null as null | string,
	publicCardPacksCount: null as null | number,
	verified: false,
}

export const profileReducer = (
	state: ProfileStateType = initialState,
	action: ProfileActionsType
): ProfileStateType => {
	switch (action.type) {
		case 'PROFILE/SET-PROFILE-DATA': {
			return { ...state, ...action.payload }
		}
		default:
			return state
	}
}
// actions
const setProfile = (data: ProfileStateType) =>
	({ type: 'PROFILE/SET-PROFILE-DATA', payload: { ...data } } as const)
// thunks
export const setProfileData =
	(data: ProfileStateType): AppThunk =>
	dispatch => {
		dispatch(setProfile(data))
	}
// types
export type ProfileStateType = typeof initialState
export type ProfileActionsType = ReturnType<typeof setProfile>
