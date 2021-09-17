import React, { ChangeEvent, useState } from 'react'
import SuperInputText from '../../n1-main/m1-ui/common/SuperInputText/SuperInputText'
import SuperButton from '../../n1-main/m1-ui/common/SuperButton/SuperButton'
import s from './Registration.module.css'
import { useHistory } from 'react-router-dom'

const Registration = () => {
	const [login, setLogin] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [checkPassword, setCheckPassword] = useState<string>('')

	const history = useHistory()

	const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
		setPassword(e.currentTarget.value)
	}
	const onChangeCheckPassword = (e: ChangeEvent<HTMLInputElement>) => {
		setCheckPassword(e.currentTarget.value)
	}

	const abortRegistration = () => {
		history.push('/login')
	}

	const handleSubmit = () => {
		if (password === checkPassword) {
			history.push('/login')
		}
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
					<SuperButton className={s.regBtn} onClick={abortRegistration}>Cancel</SuperButton>
					<SuperButton className={s.regBtn} type='submit'>Register</SuperButton>
				</div>
			</form>
		</div>
	)
}

export default Registration
