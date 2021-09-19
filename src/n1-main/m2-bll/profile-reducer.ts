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
export const setProfile = (data: ProfileStateType) =>
	({ type: 'PROFILE/SET-PROFILE-DATA', payload: { ...data } } as const)
// thunks
export const setProfileData =
	(data: ProfileStateType): AppThunk =>
	dispatch => {
		dispatch(setProfile(data))
	}
export const clearProfileData = (): AppThunk => dispatch => {
	dispatch(
		setProfile({
			_id: null,
			name: null,
			email: null,
			avatar: null,
			publicCardPacksCount: null,
			verified: false,
		})
	)
}
// types
export type SetProfile = ReturnType<typeof setProfile>
export type ProfileStateType = typeof initialState
export type ProfileActionsType = SetProfile
