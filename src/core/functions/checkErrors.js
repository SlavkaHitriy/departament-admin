export const checkErrors = async (setErrors, inputs) => {
    const tempErrors = {}
    await setErrors({})

    inputs.forEach(input => {
        if (input.object) {
            if (Object.keys(input.el).length === 0)
                tempErrors[input.errorName] = input.errorText
        } else {
            if (!input.el.value)
                tempErrors[input.errorName] = input.errorText
        }
    })

    if (Object.keys(tempErrors).length > 0) {
        await setErrors({...tempErrors})

        return true
    }

    return false
}
