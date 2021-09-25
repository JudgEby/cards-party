import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import styles from './App.module.css'
import Test from '../../../n2-features/f0-test/Test'
import Header from '../header/Header'
import Auth from '../../../n2-features/f1-auth/Auth'
import Registration from '../../../n2-features/f2-registration/Registration'
import Profile from '../../../n2-features/f3-profile/Profile'
import Error404 from '../../../n2-features/f6-404/Error404'
import PasswordRecovery from '../../../n2-features/f4-passwordRecovery/PasswordRecovery'
import NewPassword from '../../../n2-features/f5-newPassword/NewPassword'
import { CardsPacks } from '../CardsPacks/CardsPacks'

const App = () => {
	return (
		<div>
			<Header />
			<div className={styles.container}>
				<Switch>
					<Route exact path={'/'} render={() => <div>Home</div>} />
					<Route exact path={'/login'} render={() => <Auth />} />
					<Route
						exact
						path={'/registration'}
						render={() => <Registration />}
					/>
					<Route exact path={'/profile'} render={() => <Profile />} />
					<Route exact path={'/404'} render={() => <Error404 />} />
					<Route
						exact
						path={'/password/recovery'}
						render={() => <PasswordRecovery />}
					/>
					<Route
						exact
						path={'/password/new/:token?'}
						render={() => <NewPassword />}
					/>
					<Route exact path={'/test'} render={() => <Test />} />
					<Route path={'/packs'} render={() => <CardsPacks/>} />
					<Redirect from={'*'} to={'/404'} />
				</Switch>
			</div>
		</div>
	)
}

export default App
