import { AppThunk } from './store'
import { authAPI } from '../m3-dal/api'

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
//utils
const getDataForProfileFromResponseObj = (res: any): ProfileStateType => {
	const { _id, name, email, avatar, publicCardPacksCount, verified } = res
	return { _id, name, email, avatar, publicCardPacksCount, verified }
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
export const updateUserName =
	(name: string): AppThunk =>
	async dispatch => {
		try {
			const res = await authAPI.updateUserName(name)
			dispatch(
				setProfile(getDataForProfileFromResponseObj(res.data.updatedUser))
			)
		} catch (e: any) {}
	}
export const updateUserAvatar =
	(url: string): AppThunk =>
	async dispatch => {
		try {
			const res = await authAPI.updateUserAvatarUrl(url)
			dispatch(
				setProfile(getDataForProfileFromResponseObj(res.data.updatedUser))
			)
		} catch (e: any) {}
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
