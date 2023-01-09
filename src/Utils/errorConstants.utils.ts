const constants = {
    user: {
        email: {
            unique: 'email already used',
            valid: 'email requried valid',
            required: 'email is required',
            store: 'not stored in database',
        },
        password: {
            valid: 'password requried valid',
            required: 'password is required',
            incorrect: 'password is incorrect',
        },
        name: {
            valid: 'name requried valid',
            required: 'name is required',
        },
        id: {
            valid: 'id requried valid number',
            required: 'id is required',
        },
    },
    product: {
        id: {
            valid: 'Product id requried valid number',
            required: 'id is required',
        },
        name: {
            valid: 'Name requried valid',
            required: 'Name is required',
        },
        price: {
            valid: 'Price requried valid',
            required: 'Price is required',
        },
    },
    order: {
        id: {
            valid: 'Order id requried valid number',
            required: 'id is required',
        },
        qty: {
            valid: 'Qty not valid',
            required: 'Qty is required',
        },
        status: {
            valid: 'Status not valid (complete or active)',
            required: 'Status is required',
        },
    },
    missParams: {
        endpoints: 'Please check endpoint required params in doc.',
    },
    token: {
        verify: 'Token Not Verified',
        provide: 'Authorization Not Provided',
        decode: 'Failed tto decode User'
    },
    hash: {
        hashing: 'Failed to Hash Password',
        compare: 'Failed to compare Password with Hash',
    },
    default: {
        server: 'Internal server error try again later',
        validation: 'Validation error try again later',
        forbidden: 'Forbidden',
        unexpectedError: 'Unexpected error',
        security: 'security face error',
        pageNotFound: 'page 404 not found',
        noDataFound: 'no data found'
    },
};

export default constants;
