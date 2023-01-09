/* eslint-disable quotes */

class ConstantErrorMessages {
    userValidation = {
        email: "this email you entered doesn't match our criteria, it must be like this example@example.com",
        password:
            "this password you entered doesn't match our criteria, it must be at least one uppercase character, and one symbol at least and to be 8 characters at least",
        username:
            "this username you entered doesn't match our criteria, it must have at least 3 chars and the maximum is 50, and no spaces  in between",
        lastname:
            "this lastname you entered doesn't match our criteria, it must have at least 3 chars and the maximum is 50, and no spaces  in between",
        firstname:
            "this firstname you entered doesn't match our criteria, it must have at least 3 chars and the maximum is 50, and no spaces  in between",
    };

    productValidation = {
        name: "this product name you entered doesn't match our criteria, it must have at least 3 chars and the maximum is 50, and no spaces  in between",
        price: "this product price you entered doesn't match our criteria, it must be a number, and no spaces  in between",
    };
    orderValidation = {
        status: "please provide status(complete or active)",
        uid: "uid is required"
    };
    unexpectedError = {
        validation: 'Unexpected Error, Validation Error Try Again Later',
        server: 'Internal Server Error',
        security: 'Forbidden',
        pageNotFound: 'Page Not Found',
        htmlNotFound: 'Unexpected Error, index.html Notfound',
        database: 'Unexpected Error, Bad Gateway ',
        service: 'Unexpected Error, service failure may be no data found',
        unavailable: 'Service Unavailable, service failure may be no data found'
    };

    tokenError = {
        notVerified: 'Token Not Verified',
        notProvided: 'Authorization Not Provided',
    };

    hashError = {
        hashing: 'Unexpected Error, Failed to Hash Password',
        compare: 'Unexpected Error, Failed to compare Password with Hash',
    };

    missingParams = {
        params: 'please provide us needed params as provided in the requirements',
        user: 'please provide us email, user_name, first_name, last_name and password',
        password: 'please provide us password',
        auth: 'please provide us valid email and password',
        uid: 'please provide us valid uid',
        update: 'please provide email or password',
    };

    auth = {
        email: 'email not found in database',
        password: 'password is invalid',
    };
}

const globalConstants = new ConstantErrorMessages();
export default globalConstants;
