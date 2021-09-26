import { Dispatch } from 'redux'
import { CardsPacksAPI } from '../m3-dal/api'

const InitialState = {
	cardsPacks: [],
	cards: []
}
export type InitialStateType = typeof InitialState

export const CardsPacksReducer = (state: any = InitialState, action: ActionType) => {
	switch (action.type) {
		case 'SET-PACKS':
			return { ...state, cardsPacks: action.cardsPacks }
		case 'SET-CARDS':
			return{...state,cards:action.cards}
		default:
			return {...state}
	}
}

//actions
const setPacks = (cardsPacks: any) => ({ type: 'SET-PACKS', cardsPacks } as const)
const setCards = (cards:any) => ({type:'SET-CARDS',cards} as const )

//thunk
export const getPacksTC = (params:any) => (dispatch: Dispatch) => {
	CardsPacksAPI
		.getPacks(params)
		.then(res => {
		dispatch(setPacks(res.data.cardPacks))
	})
}
export const getCardsTC = (params:any) => (dispatch:Dispatch) => {
	CardsPacksAPI
		.getCards(params)
		.then(res => {
			dispatch(setCards(res.data.cards))
		})
}


//types
export type setPacksAT = ReturnType<typeof setPacks>
export type setCardsAT = ReturnType<typeof setCards>
export type ActionType = setPacksAT | setCardsAT