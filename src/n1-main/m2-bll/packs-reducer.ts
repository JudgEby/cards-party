import { cardsPacksAPI } from '../m3-dal/api'
import { AppThunk } from './store'

const InitialState = {
	packs: [] as Array<CardsPackType>,
	cardPacksTotalCount: 0,
	maxCardsCount: 1000,
	minCardsCount: 0,
	page: 1,
	pageCount: 20,
	sortPacks: 0,
	packName: '',
}
export type InitialStateType = typeof InitialState

export const packsReducer = (
	state: any = InitialState,
	action: PacksActionType
): InitialStateType => {
	switch (action.type) {
		case 'SET-PACKS':
			return { ...state, packs: action.packs }
		case 'PACKS/SET-GET-PACKS-PARAMS': {
			return { ...state, ...action.payload }
		}
		default:
			return { ...state }
	}
}

//actions
const setPacks = (packs: any) => ({ type: 'SET-PACKS', packs } as const)
const setGetPacksParams = (params: {
	cardPacksTotalCount?: number
	maxCardsCount?: number
	minCardsCount?: number
	page?: number
	pageCount?: number
	sortPacks?: number
	packName?: string
}) =>
	({
		type: 'PACKS/SET-GET-PACKS-PARAMS',
		payload: { ...params },
	} as const)

//thunk
export const getPacksTC =
	(
		user_id?: string | null,
		justSwitchedToDisplayOnlyUserPacks?: true
	): AppThunk =>
	async (dispatch, getState) => {
		try {
			const {
				pageCount,
				packName,
				sortPacks,
				maxCardsCount,
				minCardsCount,
				page,
			} = getState().packs
			let params = {
				pageCount,
				packName,
				sortPacks,
				maxCardsCount,
				minCardsCount,
				page,
			}
			const resultParams = user_id ? { ...params, user_id } : params
			const res = await cardsPacksAPI.getPacks(resultParams)
			dispatch(setPacks(res.data.cardPacks))
			dispatch(
				setGetPacksParams({
					cardPacksTotalCount: res.data.cardPacksTotalCount,
					maxCardsCount: res.data.maxCardsCount,
					minCardsCount: res.data.minCardsCount,
					page: res.data.page,
					pageCount: res.data.pageCount,
				})
			)
		} catch (e) {}
	}

export const addNewPack =
	(
		name: string,
		privatePack: boolean = false,
		deckCover: string = '',
		userID?: string | null
	): AppThunk =>
	async dispatch => {
		try {
			await cardsPacksAPI.addPack(name, privatePack, deckCover)
			dispatch(getPacksTC(userID))
		} catch (e) {}
	}
export const updatePackName =
	(packId: string, packName: string): AppThunk =>
	async dispatch => {
		try {
			await cardsPacksAPI.updatePackName(packId, packName)
			dispatch(getPacksTC())
		} catch (e) {}
	}
export const deletePack =
	(packId: string): AppThunk =>
	async dispatch => {
		try {
			await cardsPacksAPI.deletePack(packId)
			dispatch(getPacksTC())
		} catch (e) {}
	}

export const changeGetPackParams =
	(params: {
		maxCardsCount?: number
		minCardsCount?: number
		page?: number
		pageCount?: number
		sortPacks?: number
		packName?: string
	}): AppThunk =>
	async dispatch => {
		try {
			dispatch(setGetPacksParams({ ...params }))
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
export type SetGetPacksParamsType = ReturnType<typeof setGetPacksParams>
export type PacksActionType = setPacksAT | SetGetPacksParamsType
