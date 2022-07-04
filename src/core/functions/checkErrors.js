export const checkErrors = (setErrors, inputs) => {
    const tempErrors = {}
    setErrors({})

    inputs.forEach(input => {
        if (!input.el.value)
            tempErrors[input.errorName] = input.errorText
    })

    if (Object.keys(tempErrors).length > 0) {
        setErrors({...tempErrors})

        return true
    }

    return false
}
