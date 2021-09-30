import React, { FC, useEffect, useState } from 'react'
import SuperInputText from '../SuperInputText/SuperInputText'

type SearchPropsType = {
	handler: (value: string) => void
	placeholder: string
}

export const Search: FC<SearchPropsType> = ({ handler, placeholder }) => {
	const [value, setValue] = useState('')

	useEffect(() => {
		const timerId = setTimeout(() => {
			handler(value)
		}, 350)
		return () => {
			clearTimeout(timerId)
		}
	}, [value, handler])

	return (
		<div>
			<SuperInputText placeholder={placeholder} value={value} onChangeText={setValue} />
		</div>
	)
}