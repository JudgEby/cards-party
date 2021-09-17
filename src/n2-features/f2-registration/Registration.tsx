import React, { useState } from 'react'
import SuperInputText from '../../n1-main/m1-ui/common/SuperInputText/SuperInputText'
import SuperButton from '../../n1-main/m1-ui/common/SuperButton/SuperButton'
import s from './Registration.module.css'

const Registration = () => {
	const [login, setLogin] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [checkPassword, setCheckPassword] = useState<string>('')

	return (
		<div>
			<h4>Sign Up</h4>
			<form>
				<div><SuperInputText placeholder='email' value={login} onChangeText={setLogin} /></div>
				<div><input type='password' placeholder='password' value={password}
								onChange={(e) => setPassword(e.currentTarget.value)} /></div>
				<div><input type='password' placeholder='confirm password' value={checkPassword}
								onChange={(e) => setCheckPassword(e.currentTarget.value)} /></div>
				<div>
					<SuperButton className={s.regBtn}>Cancel</SuperButton>
					<SuperButton className={s.regBtn} type='submit'>Register</SuperButton>
				</div>
			</form>
		</div>
	)
}

export default Registration
