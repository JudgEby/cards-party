import React, { useEffect } from 'react'
import s from './Cards.module.css'
import { NavLink, Redirect, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getCardsTC } from '../../../m2-bll/cardsPacks-reducer'
import { AppRootStateType } from '../../../m2-bll/store'

export const Cards = () => {
	const { CardsPackID } = useParams<{ CardsPackID: string }>()

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getCardsTC({ cardsPack_id: CardsPackID,pageCount:100 }))
	}, [])

	const cards = useSelector<AppRootStateType, any>(state => state.CardsPacks.cards)
	const isAuthorized = useSelector<AppRootStateType, boolean>(state => state.auth.isAuthorized)

	if (!isAuthorized) {
		return <Redirect to={'/login'} />
	}
	return (
		<div className={s.CardsContainer}>
			<div className={s.Cards}>
				<div className={s.CardsParams}>
					<div style={{ width: '16%', fontSize: 30 }}>Question</div>
					<div style={{ width: '16%', fontSize: 30 }}>Answer</div>
					<div style={{ width: '16%', fontSize: 30 }}>Grade</div>
					<div style={{ width: '16%', fontSize: 30 }}>Updated</div>
					<div style={{ width: '16%', fontSize: 30 }}>URL</div>
					<div style={{ width: '16%', fontSize: 30 }}>
						<button>Add</button>
					</div>
				</div>
				<div className={s.CardsContainer}>
					{cards.map((card: any) => {
						return (
							<div className={s.Card}>
								<div style={{ width: '16%', fontSize: 30 }}>{card.question}</div>
								<div style={{ width: '16%', fontSize: 30 }}>{card.answer}</div>
								<div style={{ width: '16%', fontSize: 30 }}>{card.grade}</div>
								<div style={{ width: '16%', fontSize: 30 }}>{card.updated}</div>
								<div style={{ width: '16%', fontSize: 30 }}></div>
								<div>
									<button>Delete</button>
									<button>Update</button>
								</div>
							</div>
						)
					})}
				</div>
			</div>
		</div>
	)
}