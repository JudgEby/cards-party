import React from 'react'
import styles from './Header.module.css'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AppRootStateType } from '../../m2-bll/store'
import { logout } from '../../m2-bll/auth-reducer'

const Header = () => {
	const dispatch = useDispatch()
	const isAuthorized = useSelector<AppRootStateType, boolean>(
		state => state.auth.isAuthorized
	)

	const logoutHandler = () => {
		dispatch(logout())
	}
	return (
		<header className={styles.header}>
			<NavLink to={'/'}>Home</NavLink>
			{isAuthorized ? (
				<button onClick={logoutHandler}>Logout</button>
			) : (
				<NavLink to={'/login'}>Login</NavLink>
			)}
			<NavLink to={'/registration'}>Registration</NavLink>
			<NavLink to={'/profile'}>Profile</NavLink>
			<NavLink to={'/404'}>404</NavLink>
			<NavLink to={'/password/recovery'}>Password Recovery</NavLink>
			<NavLink to={'/password/new'}>New Password</NavLink>
			<NavLink to={'/test'}>Test</NavLink>
		</header>
	)
}

export default Header
