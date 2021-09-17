import React from 'react'
import SuperInputText from '../../n1-main/m1-ui/common/SuperInputText/SuperInputText'
import SuperButton from '../../n1-main/m1-ui/common/SuperButton/SuperButton'
import s from './Registration.module.css'

const Registration = () => {
	return (
		<div>
			<h4>Sign Up</h4>
			<form>
				<div><SuperInputText /></div>
				<div><input type='password' /></div>
				<div><input type='password' /></div>
				<div>
					<SuperButton className={s.regBtn}>Cancel</SuperButton>
					<SuperButton className={s.regBtn} type='submit'>Register</SuperButton>
				</div>
			</form>
		</div>
	)
}

export default Registration
