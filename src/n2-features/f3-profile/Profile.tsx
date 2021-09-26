import React, { KeyboardEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	ProfileStateType,
	updateUserAvatar,
	updateUserName,
} from '../../n1-main/m2-bll/profile-reducer'
import { AppRootStateType } from '../../n1-main/m2-bll/store'
import styles from './Profile.module.css'
import { Redirect } from 'react-router-dom'
import defaultAvatar from '../../Media/avatar/icon-avatar.jpg'

const Profile = () => {
	const dispatch = useDispatch()
	const { name, email, avatar, publicCardPacksCount, verified } = useSelector<
		AppRootStateType,
		ProfileStateType
	>(state => state.profile)
	const isAuthorized = useSelector<AppRootStateType, boolean>(
		state => state.auth.isAuthorized
	)
	const [newAvatarInputValue, setNewAvatarInputValue] = useState('')
	const [newNameInputValue, setNewNameInputValue] = useState('')

	if (!isAuthorized) {
		return <Redirect to={'/login'} />
	}

	const sendNewAvatar = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e && e.key === 'Enter') {
			dispatch(updateUserAvatar(newAvatarInputValue))
			setNewAvatarInputValue('')
		}
	}

	const sendNewName = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e && e.key === 'Enter') {
			dispatch(updateUserName(newNameInputValue))
			setNewNameInputValue('')
		}
	}

	return (
		<div>
			<div
				className={styles.avatar}
				style={{
					background: `url(${
						avatar || defaultAvatar
					}) no-repeat center/cover`,
				}}
			/>
			<input
				type='text'
				placeholder={'enter new avatar URL'}
				value={newAvatarInputValue}
				onChange={e => setNewAvatarInputValue(e.target.value)}
				onBlur={() => setNewAvatarInputValue('')}
				onKeyDown={sendNewAvatar}
			/>
			<div>{name}</div>
			<input
				type='text'
				placeholder={'enter new name'}
				value={newNameInputValue}
				onChange={e => setNewNameInputValue(e.target.value)}
				onBlur={() => setNewNameInputValue('')}
				onKeyDown={sendNewName}
			/>
			<div>{`email: ${email}`}</div>
			<div>{`Количество колод: ${publicCardPacksCount}`}</div>
			<div>{`Почта подтверждена: ${verified ? 'Да' : 'Нет'}`}</div>
		</div>
	)
}

export default Profile
