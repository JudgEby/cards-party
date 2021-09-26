import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunkMiddleware, { ThunkAction } from 'redux-thunk'
import {
	NewPasswordActionsType,
	newPasswordReducer,
} from './newPassword-reducer'
import {
	RegistrationActionsType,
	registrationReducer,
} from './registration-reducer'
import { AuthActionsType, authReducer } from './auth-reducer'
import { ProfileActionsType, profileReducer } from './profile-reducer'
import {
	PasswordRecoveryActionsType,
	passwordRecoveryReducer,
} from './passwordRecovery-reducer'
import { cardPacksReducer } from './сardPacks-reducer'
import { AppActionsType, appReducer } from './app-reducer'

const rootReducer = combineReducers({
	app: appReducer,
	auth: authReducer,
	newPassword: newPasswordReducer,
	registration: registrationReducer,
	profile: profileReducer,
	passwordRecovery: passwordRecoveryReducer,
	cardsPacks: cardPacksReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

// чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store

//types
//тип всего стейта
export type AppRootStateType = ReturnType<typeof rootReducer>
//тип всех экшенов из всех редьюсеров
export type AppRootActionsType =
	| NewPasswordActionsType
	| AuthActionsType
	| RegistrationActionsType
	| ProfileActionsType
	| PasswordRecoveryActionsType
	| AppActionsType
//общий тип для всех санок
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	AppRootStateType,
	unknown,
	AppRootActionsType
>
