export const testData = {
    validUser: {
        username: process.env.USER_NAME || '',
        password: process.env.PASSWORD || '',
    },
    errorMessages: {
        wrongCredentials: 'Invalid email or password',
    },
};
