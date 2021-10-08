import React, { useEffect, useState } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import {
	CardType,
	clearCardsData,
	getCardsTC,
	gradeCard,
} from '../../../n1-main/m2-bll/сards-reducer'
import { useDispatch, useSelector } from 'react-redux'
import { AppRootStateType } from '../../../n1-main/m2-bll/store'
import CardsLearningItem from './CardsLearningItem/CardsLearningItem'
import styles from './CardsLearningContainer.module.css'
import SuperButton from '../../../n1-main/m1-ui/common/SuperButton/SuperButton'

const CardsLearningContainer = () => {
	const [currentCardQuestion, setCurrentCardQuestion] = useState('')
	const [currentCardAnswer, setCurrentCardAnswer] = useState('')
	const [currentCardId, setCurrentCardId] = useState('')
	const [redirectToPacks, setRedirectToPacks] = useState(false)

	const maxCards = 1000
	const dispatch = useDispatch()
	const { cardsPackID } = useParams<{ cardsPackID: string }>()
	const cards = useSelector<AppRootStateType, Array<CardType>>(
		state => state.cards.cards
	)

	const getNextCard = () => {
		if (cards[0]) {
			const idsByGradeArr = cards.reduce((acc: string[], card) => {
				const arr = Array(Math.round((6 - card.grade) ** 3)).fill(card._id)
				return [...acc, ...arr]
			}, [])
			const randomCardId =
				idsByGradeArr[Math.floor(Math.random() * idsByGradeArr.length)]
			const randomCard = cards.find(card => randomCardId === card._id)
			if (randomCard) {
				setCurrentCardQuestion(randomCard.question)
				setCurrentCardAnswer(randomCard.answer)
				setCurrentCardId(randomCard._id)
			}
		}
	}

	useEffect(() => {
		getNextCard()
	}, [cards])

	useEffect(() => {
		if (cardsPackID) {
			dispatch(
				getCardsTC({ cardsPack_id: cardsPackID, pageCount: maxCards })
			)
			return () => {
				dispatch(clearCardsData())
			}
		}
	}, [])

	const getNextCardHandler = (gradeNamber: number) => {
		dispatch(gradeCard(cardsPackID, currentCardId, gradeNamber))
	}

	const backToPacksHandler = () => {
		setRedirectToPacks(true)
	}

	if (redirectToPacks) {
		return <Redirect to={'/packs'} />
	}

	return (
		<div className={styles.container}>
			{cards[0] ? (
				<CardsLearningItem
					question={currentCardQuestion}
					answer={currentCardAnswer}
					getNextCard={getNextCardHandler}
				/>
			) : (
				<div>
					<div>No cards in this pack</div>
					<SuperButton onClick={backToPacksHandler}>
						Go Back To Packs
					</SuperButton>
				</div>
			)}
		</div>
	)
}

export default CardsLearningContainer
