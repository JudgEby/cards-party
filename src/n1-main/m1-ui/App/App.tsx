import React, { useEffect } from 'react'
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
import { Packs } from '../../../n2-features/f7-packs/Packs'
import { Cards } from '../../../n2-features/f8-cards/Cards'
import { initializeAppTC, RequestStatusType } from '../../m2-bll/app-reducer'
import { AppRootStateType } from '../../m2-bll/store'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../common/Loader/Loader'
import CardsLearningContainer from '../../../n2-features/f8-cards/CardsLearning/CardsLearningContainer'

const App = () => {
	const status = useSelector<AppRootStateType, RequestStatusType>(
		state => state.app.status
	)
	const isInitialized = useSelector<AppRootStateType, boolean>(
		state => state.app.isInitialized
	)
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(initializeAppTC())
	}, [])

	const loader = (
		<div
			style={{
				position: 'fixed',
				top: '30%',
				textAlign: 'center',
				width: '100%',
			}}
		>
			<Loader />
		</div>
	)

	if (!isInitialized) {
		return loader
	}

	return (
		<div>
			<Header />
			{status === 'loading' && loader}
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
					<Route path={'/packs'} render={() => <Packs />} />
					<Route path={`/cards/:cardsPackID?`} render={() => <Cards />} />
					<Route
						path={`/learn/:cardsPackID?`}
						render={() => <CardsLearningContainer />}
					/>
					<Redirect from={'*'} to={'/404'} />
				</Switch>
			</div>
		</div>
	)
}

export default App
