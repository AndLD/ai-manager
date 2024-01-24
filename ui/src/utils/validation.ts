import { Rule } from 'antd/lib/form'

interface IValidationRules {
    [key: string]: (message?: string) => Rule
}

export const validationRules: IValidationRules = {
    NAME: message => ({
        pattern: /([A-Z][a-z\-\']{1,50})|([А-ЯЁIЇҐЄ][а-яёіїґє\-\']{1,50})/,
        message: message || 'Invalid name',
    }),
    REQUIRED: message => ({
        required: true,
        message: message || 'Field is required',
    }),
    EMAIL: message => ({
        type: 'email',
        message: message || 'Invalid email',
    }),
    PASSWORD: message => ({
        pattern:
            /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[A-Z])(?=.*[-#$.%&@(){}[\]!?+*])(?=.*[a-zA-Z]).{6,20}$/,
        message: message || 'Invalid password',
    }),
}
