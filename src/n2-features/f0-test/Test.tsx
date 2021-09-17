import React from 'react'
import SuperButton from '../../n1-main/m1-ui/common/SuperButton/SuperButton'
import SuperCheckbox from '../../n1-main/m1-ui/common/SuperCheckbox/SuperCheckbox'
import SuperEditableSpan from '../../n1-main/m1-ui/common/SuperEditableSpan/SuperEditableSpan'
import SuperInputText from '../../n1-main/m1-ui/common/SuperInputText/SuperInputText'
import SuperRadio from '../../n1-main/m1-ui/common/SuperRadio/SuperRadio'
import SuperRange from '../../n1-main/m1-ui/common/SuperRange/SuperRange'
import SuperSelect from '../../n1-main/m1-ui/common/SuperSelect/SuperSelect'

const Test = () => {
	return (
		<div>
			<div>
				<SuperButton>Ya est SuperButton</SuperButton>
			</div>
			<div>
				<SuperCheckbox>Ya est SuperCheckbox</SuperCheckbox>
			</div>
			<div>
				<SuperEditableSpan value={'value'} />
			</div>
			<div>
				<SuperInputText placeholder={'Ya est SuperInputText'} />
			</div>
			<div>
				<SuperRadio
					name={'Ya est SuperInputText'}
					options={['raz', 'dva', 'tri']}
					value={'dva'}
				/>
			</div>
			<div>
				<SuperRange value={10} />
			</div>
			<div>
				<SuperSelect
					name={'Ya est SuperInputText'}
					options={['raz', 'dva', 'tri']}
					value={'dva'}
				/>
			</div>
		</div>
	)
}

export default Test
