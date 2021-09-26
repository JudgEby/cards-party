import React, { ChangeEvent, useState } from 'react'
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
import SuperButton from '../../n1-main/m1-ui/common/SuperButton/SuperButton'
import SuperInputText from '../../n1-main/m1-ui/common/SuperInputText/SuperInputText'

const Profile = () => {
	console.log('Profile')
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
	const [nameError, setNameError] = useState<string | undefined>(undefined)
	if (!isAuthorized) {
		return <Redirect to={'/login'} />
	}

	const nameValidation = (name: string): string => {
		if (name.length <= 3) {
			return 'Must be more then 3 characters'
		}
		return 'true'
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
			setNameError(undefined)
			if (name) {
				setNewNameInputValue(name)
			}
		} else {
			setNameError(undefined)
			setEditNameMode(false)
			setNewNameInputValue('')
		}
	}

	const onChangeNameInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setNameError(undefined)
		setNewNameInputValue(e.target.value)
	}

	const onChangeAvatarInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setNewAvatarInputValue(e.target.value)
	}

	const sendNewAvatar = () => {
		dispatch(updateUserAvatar(newAvatarInputValue))
		setNewAvatarInputValue('')
		setEditAvatarMode(false)
	}

	const sendNewName = () => {
		const validation = nameValidation(newNameInputValue)
		if (validation === 'true') {
			dispatch(updateUserName(newNameInputValue))
			setNewNameInputValue('')
			setEditNameMode(false)
			setNameError(undefined)
		} else {
			setNameError(validation)
		}
	}

	const editAvatarBlock = editAvatarMode && (
		<>
			<SuperInputText
				value={newAvatarInputValue}
				onChange={onChangeAvatarInputHandler}
				onEnter={sendNewAvatar}
			/>
			<div className={styles.buttons}>
				<SuperButton type='button' onClick={sendNewAvatar}>
					Change Avatar
				</SuperButton>
				<SuperButton canceling type='button' onClick={editAvatar}>
					Cancel
				</SuperButton>
			</div>
		</>
	)

	const editNameBlock = editNameMode && (
		<>
			<SuperInputText
				value={newNameInputValue}
				onChange={onChangeNameInputHandler}
				onEnter={sendNewName}
				error={nameError}
			/>
			<div className={styles.buttons}>
				<SuperButton type='button' onClick={sendNewName}>
					Change Name
				</SuperButton>
				<SuperButton canceling type='button' onClick={editName}>
					Cancel
				</SuperButton>
			</div>
		</>
	)

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
			{editAvatarBlock}
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
			{editNameBlock}
			<div>{`email: ${email}`}</div>
			<div>{`Количество колод: ${publicCardPacksCount}`}</div>
			<div>{`Почта подтверждена: ${verified ? 'Да' : 'Нет'}`}</div>
		</div>
	)
}

export default Profile
