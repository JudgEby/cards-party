import React, { ChangeEvent, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'

const NewPassword = () => {
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
		setIsPasswordValid(newPassword.length >= 6)
	}

	const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
		e.target.name === 'newPassword' && setNewPasswordValue(e.target.value)
		e.target.name === 'confirmPassword' &&
			setConfirmPasswordValue(e.target.value)
	}

	const sendNewPassword = () => {
		token && isPasswordValid && isPasswordsMatch && console.log('111')
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
						Password must be more then 5 character
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
				<button onClick={sendNewPassword}>Send New password</button>
			</div>
		</div>
	)
}

export default NewPassword
