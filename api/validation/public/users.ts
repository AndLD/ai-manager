export const user = {
    email: {
        required: true,
        type: 'string',
        isEmail: true,
    },
    name: {
        required: true,
        type: 'string',
        regexp: /([A-Z][a-z\-\']{1,50})|([А-ЯЁIЇҐЄ][а-яёіїґє\-\']{1,50})/,
    },
    company: {
        required: true,
        type: 'string',
    },
    role: {
        required: true,
        type: 'string',
        equals: ['manager', 'ceo', 'engineer', 'qa'],
    },
    password: {
        required: true,
        type: 'string',
        regexp: /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[A-Z])(?=.*[-#$.%&@(){}[\]!?+*])(?=.*[a-zA-Z]).{6,20}$/,
    },
}

export const usersPublicValidationSchemas = {
    postUser: {
        bodySchema: {
            _allowedProps: ['email', 'name', 'company', 'role', 'password'],
            ...user,
        },
    },
}
