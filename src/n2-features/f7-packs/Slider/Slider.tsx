import SuperRange from '../../../n1-main/m1-ui/common/SuperRange/SuperRange'
import { FC, useState } from 'react'
import s from './Slider.module.css'

type SliderPropsType = {
	min: number
	max: number
	onChange: (value: number) => void
}


export const Slider: FC<SliderPropsType> = ({ min, max, onChange }) => {
	const [leftValue, setLeftValue] = useState(50)
	const [rightValue, setRightValue] = useState(50)
	const [leftWidth, setLeftWidth] = useState(200)
	const [rightWidth, setRightWidth] = useState(200)
	const onLeftRangeChange = (value: number) => {
		setLeftValue(value)
		console.log(value)
	}
	const onRightRangeChange = (value: number) => {
		setRightValue(value)
		console.log(value)
		//setLeftWidth(leftWidth - 1)
		//setRightWidth(rightWidth + 1)
	}
	return (
		<div>
			<SuperRange className={s.leftRange} onChangeRange={onLeftRangeChange}
							style={{ width: leftWidth }} value={leftValue} />
			<SuperRange className={s.rightRange} onChangeRange={onRightRangeChange}
							style={{ width: rightWidth }} value={rightValue} />
		</div>
	)
}