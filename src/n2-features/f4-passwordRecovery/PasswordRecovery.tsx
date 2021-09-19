import React, { ChangeEvent, useState, KeyboardEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { sendPasswordRecovery } from '../../n1-main/m2-bll/passwordRecovery-reducer'
import { AppRootStateType } from '../../n1-main/m2-bll/store'

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
	const onPressEnterInputHandler = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e && e.key === 'Enter') {
			dispatch(sendPasswordRecovery(inputValue))
		}
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
		<div>
			<div>PasswordRecovery</div>
			<input
				type='text'
				value={inputValue}
				onChange={onChangeInputHandler}
				onKeyDown={onPressEnterInputHandler}
			/>
			<button onClick={onClickButtonHandler}>Send</button>
			{recoveryError && <div style={{ color: 'red' }}>{recoveryError}</div>}
		</div>
	)
}

export default PasswordRecovery
