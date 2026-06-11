export const testData = {
    validUser: {
        email: process.env.USER_NAME || '',
        password: process.env.PASSWORD || '',
    },
    errorMessages: {
        wrongCredentials: 'Invalid email or password',
        specialCharacterError:
            'Password must contain a minimum of one uppercase letter, one lowercase letter, one number, and one special character.',
        passwordLengthError: 'Password must be at least 8 characters long.',
        characterError: 'Name must be below 50 characters',
    },
};
