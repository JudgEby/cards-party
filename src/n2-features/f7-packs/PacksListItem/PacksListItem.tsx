import React, { useState } from 'react'
//не добавлял отдельный файл стилей, чтобы было удобней изменять в одном файле
import s from '../Packs.module.css'
import SuperInputText from '../../../n1-main/m1-ui/common/SuperInputText/SuperInputText'
import SuperButton from '../../../n1-main/m1-ui/common/SuperButton/SuperButton'
import { NavLink } from 'react-router-dom'
import { CardsPackType } from '../../../n1-main/m2-bll/packs-reducer'

type PropsType = {
	pack: CardsPackType
	userID: string | null
	onUpdatePackNameHandler: (
		packId: string,
		updateMyPackNameInputValue: string
	) => void
	deletePackHandler: (packId: string) => void
}

const PacksListItem = (props: PropsType) => {
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

export default PacksListItem
