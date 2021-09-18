import React, { ChangeEvent, FormEvent, useState } from 'react'
import SuperInputText from '../../n1-main/m1-ui/common/SuperInputText/SuperInputText'
import SuperButton from '../../n1-main/m1-ui/common/SuperButton/SuperButton'
import s from './Registration.module.css'
import { Redirect } from 'react-router-dom'
import { registerTC, setError } from '../../n1-main/m2-bll/registration-reducer'
import { useDispatch, useSelector } from 'react-redux'
import { AppRootStateType } from '../../n1-main/m2-bll/store'

const Registration = () => {
	const [login, setLogin] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [checkPassword, setCheckPassword] = useState<string>('')

	const isRegistered = useSelector<AppRootStateType, boolean>(state => state.registration.isRegistered)
	const error = useSelector<AppRootStateType, null | string>(state => state.registration.error)
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
		<div>
			<h4>Sign Up</h4>
			<form onSubmit={handleSubmit}>
				<div><SuperInputText placeholder='email' value={login} onChangeText={setLogin} /></div>
				<div><input type='password' placeholder='password' value={password} onChange={onChangePassword} /></div>
				<div><input type='password' placeholder='confirm password' value={checkPassword}
								onChange={onChangeCheckPassword} /></div>
				<div>
					<SuperButton className={s.regBtn} type="button" onClick={abortRegistration}>Cancel</SuperButton>
					<SuperButton className={s.regBtn} type='submit'>Register</SuperButton>
				</div>
				{error && <div className={s.err}>{error}</div>}
			</form>
		</div>
	)
}

export default Registration
