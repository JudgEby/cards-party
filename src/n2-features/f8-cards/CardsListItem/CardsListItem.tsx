import React from 'react'
import s from '../Cards.module.css'
import { CardType, deleteCard } from '../../../n1-main/m2-bll/сards-reducer'
import { useDispatch } from 'react-redux'
import SuperButton from '../../../n1-main/m1-ui/common/SuperButton/SuperButton'

type PropsType = {
	card: CardType
	userID: string | null
	onUpdateCartHandler: (
		cardId: string,
		cardQuestion: string,
		cardAnswer: string
	) => void
}

const CardsListItem = (props: PropsType) => {
	const { card, userID, onUpdateCartHandler } = props
	const dispatch = useDispatch()

	const onDeleteCardHandler = () => {
		dispatch(
			deleteCard(card._id, {
				pageCount: 100,
				cardsPack_id: card.cardsPack_id,
			})
		)
	}
	return (
		<div>
			<div className={s.Card}>
				<div className={s.question}>{card.question}</div>
				<div className={s.answer}>{card.answer}</div>
				<div className={s.grade}>{card.grade}</div>
				<div className={s.updated}>
					{new Date(card.updated).toLocaleString('ru-RU')}
				</div>
				<div className={s.url}>some url</div>
				{card.user_id === userID ? (
					<div className={s.actionsWithCard}>
						<SuperButton onClick={onDeleteCardHandler}>
							Delete
						</SuperButton>
						<SuperButton
							onClick={() =>
								onUpdateCartHandler(
									card._id,
									card.question,
									card.answer
								)
							}
						>
							Update
						</SuperButton>
					</div>
				) : (
					''
				)}
			</div>
		</div>
	)
}

export default CardsListItem
