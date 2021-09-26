import React, { ChangeEvent, useState, KeyboardEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { sendPasswordRecovery } from '../../n1-main/m2-bll/passwordRecovery-reducer'
import { AppRootStateType } from '../../n1-main/m2-bll/store'
import s from './PasswordRecovery.module.css'
import { NavLink } from 'react-router-dom'
import SuperInputText from '../../n1-main/m1-ui/common/SuperInputText/SuperInputText'
import SuperButton from '../../n1-main/m1-ui/common/SuperButton/SuperButton'

const PasswordRecovery = () => {
	const recoveryError = useSelector<AppRootStateType, null | string>(
		state => state.passwordRecovery.recoveryError
	)
	const recoverySendSuccess = useSelector<AppRootStateType, boolean>(
		state => state.passwordRecovery.recoverySendSuccess
	)
	const dispatch = useDispatch()
	const [inputValue, setInputValue] = useState('')

	const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value)
	}
	const onPressEnterInputHandler = () => {
		dispatch(sendPasswordRecovery(inputValue))
	}
	const onClickButtonHandler = () => {
		dispatch(sendPasswordRecovery(inputValue))
	}

	if (recoverySendSuccess) {
		return (
			<div>
				A link to restore your password was sent to the specified email
				address
			</div>
		)
	}

	return (
		<div className={s.passwordRecoveryContainer}>
			<h4>Forgot your password?</h4>
			<div className={s.inputField}>
				<SuperInputText
					value={inputValue}
					onChange={onChangeInputHandler}
					onEnter={onPressEnterInputHandler}
					error={recoveryError || undefined}
				/>
				<p>
					Enter your email address and we will send you further
					instructions
				</p>
			</div>

			<div className={s.positionBtn}>
				<SuperButton onClick={onClickButtonHandler}>Send</SuperButton>
				<p>If you remember your password</p>
				<NavLink to='/login' className={s.footerBtn}>
					Sign In
				</NavLink>
			</div>
		</div>
	)
}

export default PasswordRecovery
