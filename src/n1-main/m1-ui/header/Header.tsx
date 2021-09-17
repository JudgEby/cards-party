import React from 'react'
import styles from './Header.module.css'
import { NavLink } from 'react-router-dom'

const Header = () => {
	return (
		<header className={styles.header}>
			<NavLink to={'/'}>Home</NavLink>
			<NavLink to={'/login'}>Login</NavLink>
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
