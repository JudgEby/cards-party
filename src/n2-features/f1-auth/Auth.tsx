import React, { ChangeEvent, useEffect, useState } from 'react'
import s from './Auth.module.css'
import { useDispatch, useSelector } from 'react-redux'
import {
	getMe,
	loginDataType,
	LoginTC,
} from '../../n1-main/m2-bll/auth-reducer'
import { AppRootStateType } from '../../n1-main/m2-bll/store'
import { Redirect } from 'react-router-dom'

const Auth = () => {
	const dispatch = useDispatch()
	const isAuthorized = useSelector<AppRootStateType, boolean>(
		state => state.auth.isAuthorized
	)
	const error = useSelector<AppRootStateType, string>(
		state => state.auth.error
	)
	const [email, setEmail] = useState('')
	const onEmailChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setEmail(e.currentTarget.value)
	}
	const [password, setPassword] = useState('')
	const onPasswordChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setPassword(e.currentTarget.value)
	}
	const [rememberMe, setRememberMe] = useState(false)
	const onRememberMeChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setRememberMe(e.currentTarget.checked)
	}

	useEffect(() => {
		if (!isAuthorized) {
			dispatch(getMe())
		}
	}, [isAuthorized])

	const Login = () => {
		const loginData: loginDataType = {
			email,
			password,
			rememberMe,
		}
		dispatch(LoginTC(loginData))
	}

	if (isAuthorized) {
		return <Redirect to={'/profile'} />
	}

	return (
		<div className={s.login}>
			{error ? error : ''}
			<div className={s.email}>
				<input
					onChange={onEmailChangeHandler}
					type='email'
					placeholder='email'
				/>
			</div>
			<div className={s.password}>
				<input
					onChange={onPasswordChangeHandler}
					type='password'
					placeholder='password'
				/>
			</div>
			<div className={s.rememberMe}>
				<input onChange={onRememberMeChangeHandler} type='checkbox' />
			</div>
			<button onClick={Login}>Login</button>
		</div>
	)
}

export default Auth
