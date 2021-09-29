import { Dispatch } from 'redux'
import { cardsPacksAPI } from '../m3-dal/api'
import { AppThunk } from './store'

const InitialState = {
	cards: [] as Array<CardType>,
	packUserId: null as string | null,
}
export type InitialStateType = typeof InitialState

export const cardsReducer = (
	state: any = InitialState,
	action: CardsActionType
): InitialStateType => {
	switch (action.type) {
		case 'SET-CARDS':
			return { ...state, cards: action.cards, packUserId: action.packUserId }
		case 'CLEAR-CARDS': {
			return { ...state, cards: [], packUserId: null }
		}
		default:
			return { ...state }
	}
}

//actions
const setCards = (cards: CardType, packUserId: string) =>
	({ type: 'SET-CARDS', cards, packUserId } as const)
const clearCards = () => ({ type: 'CLEAR-CARDS' } as const)

//thunk

export const addCard =
	(
		cardsPack_id: string,
		question: string,
		answer: string,
		paramsForGettingCards: { pageCount: number; cardsPack_id: string }
	) =>
	(dispatch: any) => {
		cardsPacksAPI.addCard(cardsPack_id, question, answer).then(res => {
			dispatch(getCardsTC(paramsForGettingCards))
		})
	}
export const getCardsTC = (params: any) => (dispatch: Dispatch) => {
	cardsPacksAPI.getCards(params).then(res => {
		dispatch(setCards(res.data.cards, res.data.packUserId))
	})
}
export const deleteCard =
	(
		cardId: string,
		paramsForGettingCards: { pageCount: number; cardsPack_id: string }
	): AppThunk =>
	async dispatch => {
		await cardsPacksAPI.deleteCard(cardId)
		dispatch(getCardsTC(paramsForGettingCards))
	}
export const updateCard =
	(
		cardId: string,
		question: string,
		answer: string,
		paramsForGettingCards: { pageCount: number; cardsPack_id: string }
	): AppThunk =>
	async dispatch => {
		try {
			await cardsPacksAPI.updateCard(cardId, question, answer)
			dispatch(getCardsTC(paramsForGettingCards))
		} catch (e) {}
	}
export const clearCardsData = (): AppThunk => async dispatch => {
	try {
		dispatch(clearCards())
	} catch (e) {}
}

//types

export type CardType = {
	answer: 'no answer'
	cardsPack_id: '615328794022038ed07f6373'
	comments: ''
	created: '2021-09-28T15:00:36.665Z'
	grade: 0
	question: 'no question'
	rating: 0
	shots: 0
	type: 'card'
	updated: '2021-09-28T15:00:36.665Z'
	user_id: '6146317c723dff00045fb368'
	_id: '61532e144022038ed07f6375'
}
export type setCardsAT = ReturnType<typeof setCards>
type ClearCards = ReturnType<typeof clearCards>
export type CardsActionType = setCardsAT | ClearCards
