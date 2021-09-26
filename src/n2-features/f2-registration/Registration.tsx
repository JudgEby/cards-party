import React, { ChangeEvent, FormEvent, useState } from 'react'
import SuperInputText from '../../n1-main/m1-ui/common/SuperInputText/SuperInputText'
import SuperButton from '../../n1-main/m1-ui/common/SuperButton/SuperButton'
import s from './Registration.module.css'
import { Redirect } from 'react-router-dom'
import { registerTC, setError } from '../../n1-main/m2-bll/registration-reducer'
import { useDispatch, useSelector } from 'react-redux'
import { AppRootStateType } from '../../n1-main/m2-bll/store'
import Loader from '../../n1-main/m1-ui/common/Loader/Loader'

const Registration = () => {
	const [login, setLogin] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [checkPassword, setCheckPassword] = useState<string>('')

	const isRegistered = useSelector<AppRootStateType, boolean>(
		state => state.registration.isRegistered
	)
	const error = useSelector<AppRootStateType, null | string>(
		state => state.registration.error
	)
	const isLoading = useSelector<AppRootStateType, boolean>(
		state => state.auth.isLoading
	)
	const dispatch = useDispatch()

	const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
		setPassword(e.currentTarget.value)
	}
	const onChangeCheckPassword = (e: ChangeEvent<HTMLInputElement>) => {
		setCheckPassword(e.currentTarget.value)
	}

	const abortRegistration = () => {
		setLogin('')
		setPassword('')
		setCheckPassword('')
		dispatch(setError(null))
	}

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (password === checkPassword) {
			dispatch(registerTC(login, password))
		} else {
			dispatch(setError('passwords must match'))
		}
	}

	if (isRegistered) {
		return <Redirect to='/login' />
	}

	return (
		<form onSubmit={handleSubmit}>
			<div className={s.registrationContainer}>
				<h4>Sign Up</h4>
				<div className={s.inputFields}>
					<SuperInputText
						placeholder='email'
						value={login}
						onChangeText={setLogin}
					/>
					<input
						type='password'
						placeholder='password'
						value={password}
						onChange={onChangePassword}
					/>
					<input
						type='password'
						placeholder='confirm password'
						value={checkPassword}
						onChange={onChangeCheckPassword}
					/>
				</div>
				<div className={s.button}>
					<SuperButton
						className={s.btnCancelRegister}
						type='button'
						onClick={abortRegistration}
					>
						Cancel
					</SuperButton>
					<SuperButton
						disabled={isLoading}
						className={s.btnCancelRegister}
						type='submit'
					>
						Register
					</SuperButton>
				</div>
				{error && <div className={s.err}>{error}</div>}
				{isLoading && <Loader />}
			</div>
		</form>
	)
}

export default Registration
