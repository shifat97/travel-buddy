export const testData = {
    validUser: {
        username: process.env.USER_NAME || 'standard_user',
        password: process.env.PASSWORD || 'secret_sauce'
    },
    lockedUser: {
        username: 'locked_out_user',
        password: 'secret_sauce'
    },
    errorMessages: {
        lockedOut: 'Epic sadface: Sorry, this user has been locked out.',
        wrongCredentials: 'Epic sadface: Username and password do not match any user in this service',
        usernameRequired: 'Epic sadface: Username is required',
        passwordRequired: 'Epic sadface: Password is required'
    }
};
