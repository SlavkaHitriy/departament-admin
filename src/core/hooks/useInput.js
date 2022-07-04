import { useState } from 'react'

export const useInput = initValue => {
    const [value, setValue] = useState(initValue)

    const onChange = e => setValue(e.target.value)
    const setNewValue = newVal => setValue(newVal)

    return {value, onChange, setNewValue}
}
