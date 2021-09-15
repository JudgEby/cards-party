import React from 'react'
import { NavLink, Redirect, Route, Switch } from 'react-router-dom'
import styles from './App.module.css'
import Test from './components/Test/Test'

const App = () => {
	return (
		<div>
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
			<div className={styles.container}>
				<Switch>
					<Route exact path={'/'} render={() => <div>Home</div>} />
					<Route exact path={'/login'} render={() => <div>Login</div>} />
					<Route
						exact
						path={'/registration'}
						render={() => <div>Registration</div>}
					/>
					<Route
						exact
						path={'/profile'}
						render={() => <div>Profile</div>}
					/>
					<Route exact path={'/404'} render={() => <div>404</div>} />
					<Route
						exact
						path={'/password/recovery'}
						render={() => <div>Password Recovery</div>}
					/>
					<Route
						exact
						path={'/password/new'}
						render={() => <div>New Password</div>}
					/>
					<Route exact path={'/test'} render={() => <Test />} />
					<Redirect from={'*'} to={'/404'} />
				</Switch>
			</div>
		</div>
	)
}

export default App
