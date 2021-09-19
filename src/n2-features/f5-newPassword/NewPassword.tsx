import React, { ChangeEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Redirect, useParams } from 'react-router-dom'
import { AppRootStateType } from '../../n1-main/m2-bll/store'
import { sendNewPassword } from '../../n1-main/m2-bll/newPassword-reducer'

const NewPassword = () => {
	const dispatch = useDispatch()
	const newPasswordSendingSuccess = useSelector<AppRootStateType, boolean>(
		state => state.newPassword.newPasswordSendingSuccess
	)
	const newPasswordSendingError = useSelector<AppRootStateType, null | string>(
		state => state.newPassword.newPasswordSendingError
	)
	const [newPasswordValue, setNewPasswordValue] = useState('')
	const [confirmPasswordValue, setConfirmPasswordValue] = useState('')
	const [isPasswordsMatch, setIsPasswordsMatch] = useState(true)
	const [isPasswordValid, setIsPasswordValid] = useState<boolean | null>(null)
	//токен из URL. Если нет, то undefined
	const { token } = useParams<{ token: string }>()

	//проверка совпадения паролей
	const checkIsPasswordsMatch = (
		newPassword: string,
		confirmPassword: string
	) => {
		setIsPasswordsMatch(newPassword === confirmPassword)
	}

	//валидация 6 символов и больше
	const checkIsPasswordsValid = (newPassword: string) => {
		setIsPasswordValid(newPassword.length >= 8)
	}

	const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
		e.target.name === 'newPassword' && setNewPasswordValue(e.target.value)
		e.target.name === 'confirmPassword' &&
			setConfirmPasswordValue(e.target.value)
	}

	const sendNewPasswordHandler = () => {
		token &&
			isPasswordValid &&
			isPasswordsMatch &&
			dispatch(sendNewPassword(confirmPasswordValue, token))
	}

	if (newPasswordSendingSuccess) {
		return <Redirect to={'/login'} />
	}

	return (
		<div>
			<div>NewPassword</div>
			{/*если нет токена, то направляем юзера на страницу рекавери*/}
			{!token && (
				<div>
					You mast to request recovery link to your email{' '}
					<NavLink to={'/password/recovery'}>Recover Password</NavLink>
				</div>
			)}
			<div>
				<span>Enter new password</span>
				<input
					name={'newPassword'}
					type='text'
					value={newPasswordValue}
					onChange={e => {
						onChangeInputHandler(e)
						checkIsPasswordsValid(e.target.value)
					}}
				/>
				{isPasswordValid !== null && !isPasswordValid && (
					<div style={{ color: 'red' }}>
						Password must be more then 7 character
					</div>
				)}
			</div>
			<div>
				<span>Confirm new password</span>
				<input
					name={'confirmPassword'}
					type='text'
					value={confirmPasswordValue}
					onChange={e => {
						onChangeInputHandler(e)
						checkIsPasswordsMatch(newPasswordValue, e.target.value)
					}}
				/>
				{!isPasswordsMatch && (
					<div style={{ color: 'red' }}>Passwords must match</div>
				)}
			</div>

			<div>
				<button onClick={sendNewPasswordHandler}>Send New password</button>
			</div>
			{newPasswordSendingError && (
				<div style={{ color: 'red' }}>{newPasswordSendingError}</div>
			)}
		</div>
	)
}

export default NewPassword
