import { Dispatch } from 'redux'
import { cardsPacksAPI } from '../m3-dal/api'
import { AppThunk } from './store'

const InitialState = {
	cardsPacks: [] as Array<CardsPackType>,
	cards: [],
}
export type InitialStateType = typeof InitialState

export const cardPacksReducer = (
	state: any = InitialState,
	action: ActionType
): InitialStateType => {
	switch (action.type) {
		case 'SET-PACKS':
			return { ...state, cardsPacks: action.cardsPacks }
		case 'SET-CARDS':
			return { ...state, cards: action.cards }
		default:
			return { ...state }
	}
}

//actions
const setPacks = (cardsPacks: any) =>
	({ type: 'SET-PACKS', cardsPacks } as const)
const setCards = (cards: any) => ({ type: 'SET-CARDS', cards } as const)

//thunk
export const getPacksTC = (params: any) => (dispatch: Dispatch) => {
	cardsPacksAPI.getPacks(params).then(res => {
		dispatch(setPacks(res.data.cardPacks))
	})
}
export const getCardsTC = (params: any) => (dispatch: Dispatch) => {
	cardsPacksAPI.getCards(params).then(res => {
		dispatch(setCards(res.data.cards))
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

export const addCard =
	(
		cardsPack_id: string,
		paramsForGettingCards: { pageCount: number; cardsPack_id: string }
	) =>
	(dispatch: any) => {
		cardsPacksAPI.addCard(cardsPack_id).then(res => {
			dispatch(getCardsTC(paramsForGettingCards))
		})
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
export type setCardsAT = ReturnType<typeof setCards>
export type ActionType = setPacksAT | setCardsAT
