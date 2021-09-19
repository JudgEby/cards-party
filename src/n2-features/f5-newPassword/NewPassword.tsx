import React, { ChangeEvent, useState } from 'react'

const NewPassword = () => {
	const [newPasswordValue, setNewPasswordValue] = useState('')
	const [confirmPasswordValue, setConfirmPasswordValue] = useState('')
	const [isPasswordsMatch, setIsPasswordsMatch] = useState(true)

	const checkIsPasswordsMatch = (
		newPassword: string,
		confirmPassword: string
	) => {
		setIsPasswordsMatch(newPassword === confirmPassword)
	}

	const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
		e.target.name === 'newPassword' && setNewPasswordValue(e.target.value)
		e.target.name === 'confirmPassword' &&
			setConfirmPasswordValue(e.target.value)
	}

	return (
		<div>
			<div>NewPassword</div>
			<div>
				<span>Enter new password</span>
				<input
					name={'newPassword'}
					type='text'
					value={newPasswordValue}
					onChange={onChangeInputHandler}
				/>
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
				<button>Send New password</button>
			</div>
		</div>
	)
}

export default NewPassword
