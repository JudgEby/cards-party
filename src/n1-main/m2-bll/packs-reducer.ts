import { Dispatch } from 'redux'
import { cardsPacksAPI } from '../m3-dal/api'
import { AppThunk } from './store'

const InitialState = {
	packs: [] as Array<CardsPackType>,
}
export type InitialStateType = typeof InitialState

export const packsReducer = (
	state: any = InitialState,
	action: PacksActionType
): InitialStateType => {
	switch (action.type) {
		case 'SET-PACKS':
			return { ...state, packs: action.packs }
		default:
			return { ...state }
	}
}

//actions
const setPacks = (packs: any) => ({ type: 'SET-PACKS', packs } as const)

//thunk
export const getPacksTC = (params: any) => (dispatch: Dispatch) => {
	cardsPacksAPI.getPacks(params).then(res => {
		dispatch(setPacks(res.data.cardPacks))
	})
}

export const addNewPack =
	(
		name: string,
		privatePack: boolean = false,
		deckCover: string = '',
		paramsForGettingPack: { pageCount: number }
	): AppThunk =>
	async dispatch => {
		try {
			await cardsPacksAPI.addPack(name, privatePack, deckCover)
			dispatch(getPacksTC(paramsForGettingPack))
		} catch (e) {}
	}
export const updatePackName =
	(
		packId: string,
		packName: string,
		paramsForGettingPack: { pageCount: number }
	): AppThunk =>
	async dispatch => {
		try {
			await cardsPacksAPI.updatePackName(packId, packName)
			dispatch(getPacksTC(paramsForGettingPack))
		} catch (e) {}
	}
export const deletePack =
	(packId: string, paramsForGettingPack: { pageCount: number }): AppThunk =>
	async dispatch => {
		try {
			await cardsPacksAPI.deletePack(packId)
			dispatch(getPacksTC(paramsForGettingPack))
		} catch (e) {}
	}

//types
export type CardsPackType = {
	cardsCount: 1
	created: '2021-09-27T13:05:01.706Z'
	name: 'Ivaaaan Fuckofff'
	private: false
	rating: 0
	type: 'pack'
	updated: '2021-09-28T14:26:58.131Z'
	user_id: '6146317c723dff00045fb368'
	user_name: 'В12341231'
	_id: '6151c17da9f5a13da4d7e643'
}
export type setPacksAT = ReturnType<typeof setPacks>
export type PacksActionType = setPacksAT
