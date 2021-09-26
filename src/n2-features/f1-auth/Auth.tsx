import React, { ChangeEvent, useState } from 'react'
import s from './Auth.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { loginDataType, LoginTC } from '../../n1-main/m2-bll/auth-reducer'
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
	const isLoading = useSelector<AppRootStateType, boolean>(
		state => state.auth.isLoading
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

	const Login = (e: any) => {
		const loginData: loginDataType = {
			email,
			password,
			rememberMe,
		}
		dispatch(LoginTC(loginData))
		e.preventDefault()
	}

	if (isAuthorized) {
		return <Redirect to={'/profile'} />
	}

	return (
		<form onSubmit={Login} className={s.authPageContainer}>
			<div className={s.login}>
				<h3>Login</h3>
				{error ? error : ''}
				<div className={s.emailPasswordLoginContainer}>
					<input
						className={s.email}
						onChange={onEmailChangeHandler}
						type='email'
						placeholder='email'
					/>

					<input
						className={s.password}
						onChange={onPasswordChangeHandler}
						type='password'
						placeholder='password'
					/>

					<label className={s.label}>
						<input
							className={s.checkbox}
							onChange={onRememberMeChangeHandler}
							type='checkbox'
						/>
						<div className={s.rememberMe}>Remember Me</div>
					</label>

					<div className={s.recoveryContainer}>
						<NavLink className={s.recovery} to={'/password/recovery'}>
							Forgot password
						</NavLink>
					</div>
				</div>

				<div className={s.loginButtonContainer}>
					<button
						className={s.loginButton}
						disabled={isLoading}
						type='submit'
					>
						Login
					</button>

					<div className={s.signUpContainer}>
						<div className={s.account}>Don't have an account</div>
						<div className={s.SignUpContainer}>
							<NavLink className={s.SignUp} to={'/registration'}>
								{' '}
								Sign Up
							</NavLink>
						</div>
					</div>
				</div>
			</div>
		</form>
	)
}

export default Auth
