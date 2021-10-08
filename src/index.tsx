import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './n1-main/m1-ui/App/App'
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './n1-main/m2-bll/store'

ReactDOM.render(
	<HashRouter>
		<Provider store={store}>
			<App />
		</Provider>
	</HashRouter>,
	document.getElementById('root')
)
