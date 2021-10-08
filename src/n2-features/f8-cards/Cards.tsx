import React, { useEffect, useState } from 'react'
import s from './Cards.module.css'
import { Redirect, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
	addCard,
	CardType,
	changeGetCardsParams,
	clearCardsData,
	getCardsTC,
	updateCard,
} from '../../n1-main/m2-bll/сards-reducer'
import { AppRootStateType } from '../../n1-main/m2-bll/store'
import CardsListItem from './CardsListItem/CardsListItem'
import SuperButton from '../../n1-main/m1-ui/common/SuperButton/SuperButton'
import SuperInputText from '../../n1-main/m1-ui/common/SuperInputText/SuperInputText'
import { Search } from '../../n1-main/m1-ui/common/Search/Search'
import Modal from '../../n1-main/m1-ui/common/Modal/Modal'

export const Cards = () => {
	const [cardQuestionTextValue, setCardQuestionTextValue] = useState('')
	const [cardQuestionValidateError, setCardQuestionValidateError] =
		useState<undefined | string>(undefined)
	const [cardAnswerTextValue, setCardAnswerTextValue] = useState('')
	const [cardAnswerValidateError, setCardAnswerValidateError] =
		useState<undefined | string>(undefined)
	const [addNewCardMode, setAddNewCardMode] = useState(false)
	const [updateCardMode, setUpdateCardMode] = useState(false)
	const [updatingCardId, setUpdatingCardId] = useState<null | string>(null)

	const minCharacterNumber = 2

	const { cardsPackID } = useParams<{ cardsPackID: string }>()

	const dispatch = useDispatch()

	const cardQuestion = useSelector<AppRootStateType, string>(
		state => state.cards.cardQuestion
	)
	const cardAnswer = useSelector<AppRootStateType, string>(
		state => state.cards.cardAnswer
	)
	const sortCards = useSelector<AppRootStateType, string>(
		state => state.cards.sortCards
	)

	useEffect(() => {
		if (cardsPackID) {
			dispatch(getCardsTC({ cardsPack_id: cardsPackID, pageCount: 100 }))
			return () => {
				dispatch(clearCardsData())
			}
		}
	}, [])

	useEffect(() => {
		if (cardsPackID) {
			dispatch(getCardsTC({ cardsPack_id: cardsPackID, pageCount: 100 }))
		}
	}, [cardQuestion, cardAnswer, sortCards])

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
			setAddNewCardMode(false)
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
			setUpdateCardMode(false)
		}
		clearNewCardInputsText()
	}
	const onCancelButtonHandler = () => {
		if (updateCardMode) {
			setUpdateCardMode(false)
			setUpdatingCardId(null)
		}
		if (addNewCardMode) {
			setAddNewCardMode(false)
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
		setUpdateCardMode(true)
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

	const searchCardsByQuestion = (value: string) => {
		dispatch(changeGetCardsParams({ cardQuestion: value }))
	}
	const searchCardsByAnswer = (value: string) => {
		dispatch(changeGetCardsParams({ cardAnswer: value }))
	}

	const sortColumn = (name: string) => {
		if (sortCards === `0${name}`) {
			dispatch(changeGetCardsParams({ sortCards: `1${name}` }))
		} else {
			dispatch(changeGetCardsParams({ sortCards: `0${name}` }))
		}
	}

	const sortedSign = (name: string) => {
		if (sortCards.slice(1) !== name) {
			return `\u21C5`
		} else if (sortCards.slice(0, 1) === '0') {
			return `\u25BC`
		} else {
			return '\u25B2'
		}
	}

	if (!cardsPackID) {
		return <Redirect to={'/packs'} />
	}

	return (
		<div className={s.CardsContainer}>
			<Search
				handler={searchCardsByQuestion}
				placeholder={'Search question...'}
			/>
			<Search
				handler={searchCardsByAnswer}
				placeholder={'Search answer...'}
			/>
			{packUserId === userID && (addNewCardMode || updateCardMode) && (
				<Modal
					OnBackClick={() => {
						setAddNewCardMode(false)
						setUpdateCardMode(false)
					}}
				>
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
				</Modal>
			)}
			<SuperButton
				className={s.addNewCardMainButton}
				onClick={() => setAddNewCardMode(true)}
			>
				Add New Card
			</SuperButton>
			<div className={s.Cards}>
				<div className={s.CardsParams}>
					<div
						className={`${s.question} ${s.tableHeader}`}
						onClick={() => {
							sortColumn('question')
						}}
					>
						Question
						<span>{sortedSign('question')}</span>
					</div>
					<div
						className={`${s.answer} ${s.tableHeader}`}
						onClick={() => {
							sortColumn('answer')
						}}
					>
						Answer
						<span>{sortedSign('answer')}</span>
					</div>
					<div
						className={`${s.grade} ${s.tableHeader}`}
						onClick={() => {
							sortColumn('grade')
						}}
					>
						Grade
						<span>{sortedSign('grade')}</span>
					</div>
					<div
						className={`${s.updated} ${s.tableHeader}`}
						onClick={() => {
							sortColumn('updated')
						}}
					>
						Updated
						<span>{sortedSign('updated')}</span>
					</div>
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
