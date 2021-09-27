import React, { ChangeEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Redirect, useParams } from 'react-router-dom'
import { AppRootStateType } from '../../n1-main/m2-bll/store'
import { sendNewPassword } from '../../n1-main/m2-bll/newPassword-reducer'
import SuperInputText from '../../n1-main/m1-ui/common/SuperInputText/SuperInputText'
import styles from './NewPassword.module.css'
import SuperButton from '../../n1-main/m1-ui/common/SuperButton/SuperButton'

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
		<div className={styles.newPasswordContainer}>
			<h2>New Password</h2>
			{/*если нет токена, то направляем юзера на страницу рекавери*/}
			{!token && (
				<div className={styles.tokenNotFoundBlock}>
					<span>You mast to request recovery link to your email</span>
					<NavLink to={'/password/recovery'}>
						<SuperButton>Recover Password</SuperButton>
					</NavLink>
				</div>
			)}
			{token && (
				<>
					<div className={styles.enterNewPasswordBlock}>
						<span>Enter new password</span>
						<SuperInputText
							name={'newPassword'}
							placeholder={'Enter new password'}
							value={newPasswordValue}
							onChange={e => {
								onChangeInputHandler(e)
								checkIsPasswordsValid(e.target.value)
							}}
							error={
								isPasswordValid !== null && !isPasswordValid
									? 'Password must be more then 7 character'
									: undefined
							}
						/>
					</div>
					<div className={styles.confirmNewPasswordBlock}>
						<span>Confirm new password</span>
						<SuperInputText
							name={'confirmPassword'}
							placeholder={'confirm password'}
							value={confirmPasswordValue}
							onChange={e => {
								onChangeInputHandler(e)
								checkIsPasswordsMatch(newPasswordValue, e.target.value)
							}}
							error={
								!isPasswordsMatch ? 'Passwords must match' : undefined
							}
						/>
					</div>

					<div>
						<SuperButton onClick={sendNewPasswordHandler}>
							Send New password
						</SuperButton>
					</div>
					{newPasswordSendingError && (
						<div className={styles.error}>{newPasswordSendingError}</div>
					)}
				</>
			)}
		</div>
	)
}

export default NewPassword
