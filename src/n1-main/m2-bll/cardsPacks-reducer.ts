import { Dispatch } from 'redux'
import { CardsPacksAPI } from '../m3-dal/api'

const InitialState = {
	cardsPacks: []
}
export type InitialStateType = typeof InitialState

export const CardsPacksReducer = (state: any = InitialState, action: ActionType) => {
	switch (action.type) {
		case 'SET-PACKS':
			return { ...state, cardsPacks: action.cardsPacks }
		default:
			return {...state}
	}
}

//actions
const setPacks = (cardsPacks: any) => ({ type: 'SET-PACKS', cardsPacks } as const)

//thunk
export const getPacksTC = (params:any) => (dispatch: Dispatch) => {
	CardsPacksAPI
		.getPacks(params)
		.then(res => {
		dispatch(setPacks(res.data.cardPacks))
	})
}


//types
export type setPacksAT = ReturnType<typeof setPacks>
export type ActionType = setPacksAT
