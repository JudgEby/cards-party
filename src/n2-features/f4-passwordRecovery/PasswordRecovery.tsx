import React, { ChangeEvent, useState, KeyboardEvent } from 'react'
import { useDispatch } from 'react-redux'
import { sendPasswordRecovery } from '../../n1-main/m2-bll/passwordRecovery-reducer'

const PasswordRecovery = () => {
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
		</div>
	)
}

export default PasswordRecovery
