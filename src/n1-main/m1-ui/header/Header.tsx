import React from 'react'
import styles from './Header.module.css'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AppRootStateType } from '../../m2-bll/store'
import { logout } from '../../m2-bll/auth-reducer'
import menu from "../../../Media/menu/menu.png"

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
			<NavLink to={'/'} className={styles.link} activeClassName={styles.active}>Home</NavLink>
			{isAuthorized ? (
				<button onClick={logoutHandler}>Logout</button>
			) : (
				<NavLink to={'/login'} className={styles.link} activeClassName={styles.active}>Login</NavLink>
			)}
			<NavLink to={'/registration'} className={styles.link} activeClassName={styles.active}>Registration</NavLink>
			<NavLink to={'/profile'} className={styles.link} activeClassName={styles.active}>Profile</NavLink>
			<NavLink to={'/404'} className={styles.link} activeClassName={styles.active}>404</NavLink>
			<NavLink to={'/password/recovery'} className={styles.link} activeClassName={styles.active}>Password Recovery</NavLink>
			<NavLink to={'/password/new'} className={styles.link} activeClassName={styles.active}>New Password</NavLink>
			<NavLink to={'/test'} className={styles.link} activeClassName={styles.active}>Test</NavLink>
			<div><img src={menu} className={styles.block} alt={menu}/></div>
		</header>
	)
}

export default Header
