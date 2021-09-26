import React from 'react'
import { useSelector } from 'react-redux'
import { ProfileStateType } from '../../n1-main/m2-bll/profile-reducer'
import { AppRootStateType } from '../../n1-main/m2-bll/store'
import styles from './Profile.module.css'
import { Redirect } from 'react-router-dom'
import defaultAvatar from '../../Media/avatar/icon-avatar.jpg'

const Profile = () => {
	const { name, email, avatar, publicCardPacksCount, verified } = useSelector<
		AppRootStateType,
		ProfileStateType
	>(state => state.profile)
	const isAuthorized = useSelector<AppRootStateType, boolean>(
		state => state.auth.isAuthorized
	)

	if (!isAuthorized) {
		return <Redirect to={'/login'} />
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
			<div>{name}</div>
			<div>{`email: ${email}`}</div>
			<div>{`Количество колод: ${publicCardPacksCount}`}</div>
			<div>{`Почта подтверждена: ${verified ? 'Да' : 'Нет'}`}</div>
		</div>
	)
}

export default Profile
