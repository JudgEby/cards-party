import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunkMiddleware, { ThunkAction } from 'redux-thunk'

export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppRootActionsType = { type: 'adasd' }
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	AppRootStateType,
	unknown,
	AppRootActionsType
>

const rootReducer = combineReducers({})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))
