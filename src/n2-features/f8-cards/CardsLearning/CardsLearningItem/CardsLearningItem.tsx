import React, { useEffect, useState } from 'react'
import SuperRadio from '../../../../n1-main/m1-ui/common/SuperRadio/SuperRadio'
import style from './CardsLearningItem.module.css'
import SuperButton from '../../../../n1-main/m1-ui/common/SuperButton/SuperButton'

type PropsType = {
	question: string
	answer: string
	getNextCard: (grade: number) => void
}

const CardsLearningItem = (props: PropsType) => {
	const grades = [
		'не знал совсем',
		'слышал но не знал',
		'плохо знал',
		'знал не до конца',
		'знал полностью',
	]
	const { question, answer, getNextCard } = props

	const [gradeNumber, setGradeNumber] = useState<number | null>(null)
	const [checkedGradeValue, setCheckedGradeValue] = useState(grades[0])
	const [showAnswer, setShowAnswer] = useState(false)

	const changeGrade = (chosenGrade: string) => {
		setGradeNumber(grades.indexOf(chosenGrade))
		setCheckedGradeValue(chosenGrade)
	}

	const onNextCardClick = () => {
		if (gradeNumber !== null) {
			getNextCard(gradeNumber)
		}
	}

	useEffect(() => {
		setCheckedGradeValue(grades[0])
		setGradeNumber(null)
	}, [question, answer])

	const classNameIfHidden = showAnswer ? '' : style.hidden

	return (
		<div className={style.container}>
			<div className={`${style.questionBlock}`}>Question: {question}</div>
			<SuperButton onClick={() => setShowAnswer((prev: boolean) => !prev)}>
				{showAnswer ? 'Hide Answer' : 'Show Answer'}
			</SuperButton>
			<div className={`${classNameIfHidden} ${style.answerBlock}`}>
				Answer: {answer}
			</div>
			<div className={`${classNameIfHidden} ${style.radiosBlock}`}>
				<SuperRadio
					className={classNameIfHidden}
					options={grades}
					onChangeOption={changeGrade}
					value={checkedGradeValue}
				/>
			</div>
			<SuperButton
				className={classNameIfHidden}
				disabled={gradeNumber === null}
				onClick={onNextCardClick}
			>
				Next
			</SuperButton>
		</div>
	)
}

export default CardsLearningItem
