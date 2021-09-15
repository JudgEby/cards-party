import React, {
  SelectHTMLAttributes,
  DetailedHTMLProps,
  ChangeEvent,
} from 'react'

import style from './SuperSelect.module.css'

type DefaultSelectPropsType = DetailedHTMLProps<
  SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>

type SuperSelectPropsType = DefaultSelectPropsType & {
  options?: any[]
  onChangeOption?: (option: any) => void
}

const SuperSelect: React.FC<SuperSelectPropsType> = ({
  options,
  onChange,
  onChangeOption,
  ...restProps
}) => {
  const mappedOptions: any[] = options
    ? options.map((o, i) => (
        <option key={`${o}-${i}`} value={o} className={style.option}>
          {o}
        </option>
      ))
    : [] // map options with key

  const onChangeCallback = (e: ChangeEvent<HTMLSelectElement>) => {
    // onChange, onChangeOption
    onChangeOption && onChangeOption(e.target.value)
    onChange && onChange(e)
  }

  return (
    <select className={style.select} onChange={onChangeCallback} {...restProps}>
      {mappedOptions}
    </select>
  )
}

export default SuperSelect
