import { checkErrors } from '../../functions/checkErrors'

export const checkInputs = async (fullContent, inputsData, setErrors) => {
    const blocks = []

    fullContent.forEach(block => {
        blocks.push(
            {
                el: {value: block.name},
                errorName: `contentName${block.id}`,
                errorText: 'Введіть назву інформаційного блоку'
            },
            {
                el: block.content,
                errorName: `content${block.id}`,
                errorText: 'Введіть інформацію про блок',
                object: true,
            },
        )
    })

    const inputsInfo = [
        {el: inputsData.inputFirstName, errorName: 'firstName', errorText: 'Введіть ім\'я'},
        {el: inputsData.inputSecondName, errorName: 'secondName', errorText: 'Введіть прізвище'},
        {el: inputsData.inputMiddleName, errorName: 'middleName', errorText: 'Введіть по батькові'},
        ...blocks
    ]

    if (await checkErrors(setErrors, inputsInfo)) return true
}
