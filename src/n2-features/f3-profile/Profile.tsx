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
import editIcon from '../../Media/edit-icon.svg'

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
	const [editAvatarMode, setEditAvatarMode] = useState(false)
	const [newNameInputValue, setNewNameInputValue] = useState('')
	const [editNameMode, setEditNameMode] = useState(false)

	if (!isAuthorized) {
		return <Redirect to={'/login'} />
	}

	const editAvatar = () => {
		if (!editAvatarMode) {
			setEditAvatarMode(true)
		} else {
			setEditAvatarMode(false)
			setNewAvatarInputValue('')
		}
	}

	const editName = () => {
		if (!editNameMode) {
			setEditNameMode(true)
			if (name) {
				setNewNameInputValue(name)
			}
		} else {
			setEditNameMode(false)
			setNewNameInputValue('')
		}
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
		<div className={styles.profileContainer}>
			<div
				className={styles.avatar}
				style={{
					background: `url(${
						avatar || defaultAvatar
					}) no-repeat center/cover`,
				}}
			>
				<div
					className={styles.avatarChangeIconWrapper}
					onClick={editAvatar}
				>
					<div
						style={{
							background: `url(${editIcon}) no-repeat center/cover`,
						}}
						className={styles.avatarChangeIcon}
					/>
				</div>
			</div>
			<input
				style={editAvatarMode ? {} : { display: 'none' }}
				type='text'
				placeholder={'enter new avatar URL'}
				value={newAvatarInputValue}
				onChange={e => setNewAvatarInputValue(e.target.value)}
				onBlur={() => {
					setNewAvatarInputValue('')
					editAvatar()
				}}
				onKeyDown={sendNewAvatar}
			/>
			<div className={styles.userNameWrapper}>
				<span className={styles.name}>{name}</span>
				<span
					style={{
						background: `url(${editIcon}) no-repeat center/cover`,
					}}
					className={styles.avatarChangeIcon}
					onClick={editName}
				/>
			</div>
			<input
				style={editNameMode ? {} : { display: 'none' }}
				type='text'
				placeholder={'enter new name'}
				value={newNameInputValue}
				onChange={e => setNewNameInputValue(e.target.value)}
				onBlur={() => {
					setNewNameInputValue('')
					editName()
				}}
				onKeyDown={sendNewName}
			/>

			<div>{`email: ${email}`}</div>
			<div>{`Количество колод: ${publicCardPacksCount}`}</div>
			<div>{`Почта подтверждена: ${verified ? 'Да' : 'Нет'}`}</div>
		</div>
	)
}

export default Profile
