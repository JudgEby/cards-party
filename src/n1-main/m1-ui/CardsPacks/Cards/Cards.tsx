import React, { useEffect, useState } from 'react'
import s from './Cards.module.css'
import { Redirect, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
	addCard,
	CardType,
	clearCardsData,
	getCardsTC,
	updateCard,
} from '../../../m2-bll/сards-reducer'
import { AppRootStateType } from '../../../m2-bll/store'
import CardsListItem from '../CardsListItem/CardsListItem'
import SuperButton from '../../common/SuperButton/SuperButton'
import SuperInputText from '../../common/SuperInputText/SuperInputText'

export const Cards = () => {
	const [cardQuestionTextValue, setCardQuestionTextValue] = useState('')
	const [cardQuestionValidateError, setCardQuestionValidateError] =
		useState<undefined | string>(undefined)
	const [cardAnswerTextValue, setCardAnswerTextValue] = useState('')
	const [cardAnswerValidateError, setCardAnswerValidateError] =
		useState<undefined | string>(undefined)
	const [addNewCardMode, setAddNewCardMode] = useState(true)
	const [updatingCardId, setUpdatingCardId] = useState<null | string>(null)

	const minCharacterNumber = 2

	const { cardsPackID } = useParams<{ cardsPackID: string }>()

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getCardsTC({ cardsPack_id: cardsPackID, pageCount: 100 }))
		return () => {
			dispatch(clearCardsData())
		}
	}, [])

	const cards = useSelector<AppRootStateType, Array<CardType>>(
		state => state.cards.cards
	)
	const isAuthorized = useSelector<AppRootStateType, boolean>(
		state => state.auth.isAuthorized
	)

	const userID = useSelector<AppRootStateType, string | null>(
		state => state.profile._id
	)
	const packUserId = useSelector<AppRootStateType, string | null>(
		state => state.cards.packUserId
	)

	if (!isAuthorized) {
		return <Redirect to={'/login'} />
	}

	const addCardHandler = () => {
		if (addNewCardMode) {
			dispatch(
				addCard(cardsPackID, cardQuestionTextValue, cardAnswerTextValue, {
					pageCount: 100,
					cardsPack_id: cardsPackID,
				})
			)
		}
		if (!addNewCardMode && updatingCardId) {
			dispatch(
				updateCard(
					updatingCardId,
					cardQuestionTextValue,
					cardAnswerTextValue,
					{
						pageCount: 100,
						cardsPack_id: cardsPackID,
					}
				)
			)
			setAddNewCardMode(true)
		}
		clearNewCardInputsText()
	}
	const onCancelButtonHandler = () => {
		if (!addNewCardMode) {
			setAddNewCardMode(true)
			setUpdatingCardId(null)
		}
		clearNewCardInputsText()
	}

	const clearNewCardInputsText = () => {
		setCardQuestionTextValue('')
		setCardAnswerTextValue('')
		setCardQuestionValidateError(undefined)
		setCardAnswerValidateError(undefined)
	}

	const onUpdateCartHandler = (
		cardId: string,
		cardQuestion: string,
		cardAnswer: string
	) => {
		setAddNewCardMode(false)
		setUpdatingCardId(cardId)
		setCardQuestionTextValue(cardQuestion)
		setCardAnswerTextValue(cardAnswer)
	}

	const onCardQuestionTextValueHandler = (value: string) => {
		if (value.length <= minCharacterNumber) {
			setCardQuestionValidateError('Mast be more then 2 character')
		} else {
			setCardQuestionValidateError(undefined)
		}
		setCardQuestionTextValue(value)
	}

	const onCardAnswerTextValueHandler = (value: string) => {
		if (value.length <= minCharacterNumber) {
			setCardAnswerValidateError('Mast be more then 2 character')
		} else {
			setCardAnswerValidateError(undefined)
		}
		setCardAnswerTextValue(value)
	}

	return (
		<div className={s.CardsContainer}>
			<div>{addNewCardMode ? 'Add new card' : 'Updating Card'}</div>
			{packUserId === userID && (
				<div className={s.addNewCardBlock}>
					<div className={s.addNewCardInput}>
						<SuperInputText
							spanClassName={s.errorSpan}
							placeholder={
								addNewCardMode
									? 'enter new card question'
									: 'enter updating card question'
							}
							value={cardQuestionTextValue}
							onChangeText={onCardQuestionTextValueHandler}
							error={cardQuestionValidateError}
						/>
					</div>
					<div className={s.addNewCardInput}>
						<SuperInputText
							spanClassName={s.errorSpan}
							placeholder={
								addNewCardMode
									? 'enter new card answer'
									: 'enter updating card answer'
							}
							value={cardAnswerTextValue}
							onChangeText={onCardAnswerTextValueHandler}
							error={cardAnswerValidateError}
						/>
					</div>
					<SuperButton
						disabled={
							!!cardQuestionValidateError ||
							!!cardAnswerValidateError ||
							!cardQuestionTextValue ||
							!cardAnswerTextValue
						}
						onClick={addCardHandler}
					>
						{addNewCardMode ? 'Add new Card' : 'Update Card'}
					</SuperButton>
					<SuperButton canceling onClick={onCancelButtonHandler}>
						Cancel
					</SuperButton>
				</div>
			)}
			<div className={s.Cards}>
				<div className={s.CardsParams}>
					<div className={s.question}>Question</div>
					<div className={s.answer}>Answer</div>
					<div className={s.grade}>Grade</div>
					<div className={s.updated}>Updated</div>
					<div className={s.url}>URL</div>
					<div className={s.actionsWithCard}>Actions</div>
				</div>
				<div className={s.CardsContainer}>
					{cards.map((card: CardType) => (
						<CardsListItem
							key={card._id}
							card={card}
							userID={userID}
							onUpdateCartHandler={onUpdateCartHandler}
						/>
					))}
				</div>
			</div>
		</div>
	)
}
