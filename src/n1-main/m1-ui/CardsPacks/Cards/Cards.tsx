import React, { useEffect } from 'react'
import s from './Cards.module.css'
import { Redirect, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addCard, getCardsTC } from '../../../m2-bll/сardPacks-reducer'
import { AppRootStateType } from '../../../m2-bll/store'

export const Cards = () => {
	const { cardsPackID } = useParams<{ cardsPackID: string }>()

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getCardsTC({ cardsPack_id: cardsPackID, pageCount: 100 }))
	}, [])

	const cards = useSelector<AppRootStateType, any>(
		state => state.cardsPacks.cards
	)
	const isAuthorized = useSelector<AppRootStateType, boolean>(
		state => state.auth.isAuthorized
	)

	const userID = useSelector<AppRootStateType, string | null>(
		state => state.profile._id
	)

	if (!isAuthorized) {
		return <Redirect to={'/login'} />
	}

	const AddCard = () => {
		dispatch(
			addCard(cardsPackID, { pageCount: 100, cardsPack_id: cardsPackID })
		)
	}

	return (
		<div className={s.CardsContainer}>
			<div className={s.Cards}>
				<div className={s.CardsParams}>
					<div className={s.question}>Question</div>
					<div className={s.answer}>Answer</div>
					<div className={s.grade}>Grade</div>
					<div className={s.updated}>Updated</div>
					<div className={s.url}>URL</div>
					<div className={s.actionsWithCard}>
						<button onClick={AddCard}>Add</button>
					</div>
				</div>
				<div className={s.CardsContainer}>
					{cards.map((card: any) => {
						return (
							<div className={s.Card}>
								<div className={s.question}>{card.question}</div>
								<div className={s.answer}>{card.answer}</div>
								<div className={s.grade}>{card.grade}</div>
								<div className={s.updated}>
									{new Date(card.updated).toLocaleString('ru-RU')}
								</div>
								<div className={s.url}></div>
								{card.user_id === userID ? (
									<div className={s.actionsWithCard}>
										<button>Delete</button>
										<button>Update</button>
									</div>
								) : (
									''
								)}
							</div>
						)
					})}
				</div>
			</div>
		</div>
	)
}
