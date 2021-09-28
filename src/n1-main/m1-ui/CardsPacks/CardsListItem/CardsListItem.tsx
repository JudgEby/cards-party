import React, { useState } from 'react'
import s from '../CardsPacks.module.css'
import SuperInputText from '../../common/SuperInputText/SuperInputText'
import SuperButton from '../../common/SuperButton/SuperButton'
import { NavLink } from 'react-router-dom'
import { CardsPackType } from '../../../m2-bll/сardPacks-reducer'

type PropsType = {
	pack: CardsPackType
	userID: string | null
	onUpdatePackNameHandler: (
		packId: string,
		updateMyPackNameInputValue: string
	) => void
	deletePackHandler: (packId: string) => void
}

const CardsListItem = (props: PropsType) => {
	const { pack, userID, onUpdatePackNameHandler, deletePackHandler } = props

	const [updateMyPackNameMode, setUpdateMyPackNameMode] = useState(false)
	const [updateMyPackNameInputValue, setUpdateMyPackNameInputValue] =
		useState('')

	const onToggleUpdateMyPackNameMode = () => {
		if (!updateMyPackNameMode) {
			setUpdateMyPackNameInputValue(pack.name)
		}
		setUpdateMyPackNameMode((prevValue: boolean) => {
			return !prevValue
		})
	}

	const onUpdatePackName = () => {
		onUpdatePackNameHandler(pack._id, updateMyPackNameInputValue)
		onToggleUpdateMyPackNameMode()
	}

	return (
		<div className={s.Pack}>
			<div className={s.nameColumn}>{pack.name}</div>
			<div className={s.cardsCountColumn}>{pack.cardsCount}</div>
			<div className={s.updatedColumn}>
				{new Date(pack.updated).toLocaleString('ru-RU')}
			</div>
			<div className={s.urlColumn}>some url</div>
			<div className={s.actionsWithPackBlock}>
				{userID && userID === pack.user_id && (
					<>
						{updateMyPackNameMode ? (
							<>
								<SuperInputText
									placeholder={'enter new name'}
									value={updateMyPackNameInputValue}
									onChangeText={setUpdateMyPackNameInputValue}
								/>
								<SuperButton onClick={onUpdatePackName}>
									Send New Name
								</SuperButton>
								<SuperButton
									canceling
									onClick={onToggleUpdateMyPackNameMode}
								>
									Cancel
								</SuperButton>
							</>
						) : (
							<>
								<SuperButton
									onClick={() => {
										deletePackHandler(pack._id)
									}}
								>
									Delete
								</SuperButton>
								<SuperButton onClick={onToggleUpdateMyPackNameMode}>
									Update Name
								</SuperButton>
							</>
						)}
					</>
				)}
				<NavLink to={`/cards/${pack._id}`}>Cards</NavLink>
			</div>
		</div>
	)
}

export default CardsListItem
