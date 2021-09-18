import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	ProfileStateType,
	setProfileData,
} from '../../n1-main/m2-bll/profile-reducer'
import { AppRootStateType } from '../../n1-main/m2-bll/store'
import styles from './Profile.module.css'

const Profile = () => {
	const { _id, name, email, avatar, publicCardPacksCount, verified } =
		useSelector<AppRootStateType, ProfileStateType>(state => state.profile)
	const dispatch = useDispatch()

	useEffect(() => {
		if (!_id) {
			dispatch(
				setProfileData({
					_id: '1234',
					name: 'Vasya',
					avatar:
						'https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/111554483/original/83d513acbc4b3716c9a474086bb633a5de3c2d74/create-social-media-avatars-in-minimalist-style.jpg',
					email: '1234@gmail.com',
					publicCardPacksCount: 10,
					verified: true,
				})
			)
		}
	}, [_id, dispatch])
	return (
		<div>
			<div
				className={styles.avatar}
				style={{ background: `url(${avatar}) no-repeat center` }}
			/>
			<div>{name}</div>
			<div>{`email: ${email}`}</div>
			<div>{`Количество колод: ${publicCardPacksCount}`}</div>
			<div>{`Почта подтверждена: ${verified ? 'Да' : 'Нет'}`}</div>
		</div>
	)
}

export default Profile
