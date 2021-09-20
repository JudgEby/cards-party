import React, { ChangeEvent, useEffect, useState } from 'react'
import s from './Auth.module.css'
import { useDispatch, useSelector } from 'react-redux'
import {getMe,loginDataType,LoginTC} from '../../n1-main/m2-bll/auth-reducer'
import { AppRootStateType } from '../../n1-main/m2-bll/store'
import { NavLink, Redirect } from 'react-router-dom'

const Auth = () => {
	const dispatch = useDispatch()
	const isAuthorized = useSelector<AppRootStateType, boolean>(
		state => state.auth.isAuthorized
	)
	const error = useSelector<AppRootStateType, string>(
		state => state.auth.error
	)
	const isLoading = useSelector<AppRootStateType,boolean>(state => state.auth.isLoading)
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
			rememberMe
		}
		dispatch(LoginTC(loginData))
	}

	if (isAuthorized) {
		return <Redirect to={'/profile'} />
	}

	return (
		<form onSubmit={Login}>
			<div className={s.login}>
				<h3>Login</h3>
				{error ? error : ''}
				<div className={s.emailContainer}>
					<input
						className={s.email}
						onChange={onEmailChangeHandler}
						type='email'
						placeholder='email'
					/>
				</div>
				<div className={s.passwordContainer}>
					<input
						className={s.password}
						onChange={onPasswordChangeHandler}
						type='password'
						placeholder='password'
					/>
				</div>
				<div className={s.rememberMeContainer}>
					<input className={s.rememberMe} onChange={onRememberMeChangeHandler} type='checkbox' />
				</div>
				<div className={s.recoveryContainer}>
					<NavLink className={s.recovery} to={'/password/recovery'}>Forgot password</NavLink>
				</div>
				<div className={s.loginButtonContainer}>
					<button className={s.loginButton} disabled={isLoading?true:false} type='submit'>Login</button>
				</div>
				<div className={s.signUpContainer}>
					<span>Don't have an account</span>
					<div className={s.SignUpContainer}>
						<NavLink className={s.SignUp} to={'/registration'}> Sign Up</NavLink>
					</div>
			</div>
		</div>
</form>
)
}

export default Auth
