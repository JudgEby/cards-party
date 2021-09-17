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

const rootReducer = combineReducers({
	auth: authReducer,
	newPassword: newPasswordReducer,
	registration: registrationReducer,
	profile: profileReducer,
	passwordRecovery: passwordRecoveryReducer,
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
//общий тип для всех санок
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	AppRootStateType,
	unknown,
	AppRootActionsType
>
