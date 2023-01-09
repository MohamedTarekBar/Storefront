/* eslint-disable indent */
import Error from '../interface/error.interface';
import { getStatusCode } from 'http-status-codes';
import constants from './errorConstants.utils';


enum Side {
    validation,
    server,
    security,
    page404,
    database,
    service,
}

const sendErr = (
    side: Side,
    err?: Error | string | undefined | unknown
): Error => {
    const msg = error(err);
    switch (side) {
        case Side.database:
            return {
                status: getStatusCode('Bad Gateway') || 502,
                message: msg ? msg : constants.default.validation,
            };
        case Side.validation:
            return {
                status: getStatusCode('Bad Request') || 400,
                message: msg ? msg : constants.default.validation,
            };
        case Side.server:
            return {
                status: getStatusCode('Internal Server Error') || 500,
                message: msg ? msg : constants.default.server,
            };
        case Side.security:
            return {
                status: getStatusCode('Forbidden') || 403,
                message: msg ? msg : constants.default.security,
            };
        case Side.page404:
            return {
                status: getStatusCode('Not Found') || 404,
                message: msg
                    ? msg
                    : constants.default.unexpectedError,
            };
        case Side.service:
            return {
                status: getStatusCode('Service Unavailable') || 503,
                message: msg
                    ? msg
                    : constants.default.pageNotFound,
            };
        default:
            return {
                status: getStatusCode('Internal Server Error') || 500,
                message: msg ? msg : constants.default.server,
            };
    }
};

const error = (
    error?: Error | string | undefined | unknown
): string | undefined => {
    if (error) {
        if (typeof error === 'object') {
            if ((error as Error).message) {
                return (error as Error).message;
            } else if (Object.keys(error).includes('message')) {
                return undefined;
            } else return undefined;
        } else if (typeof error === 'string') {
            return error;
        } else return undefined;
    } else return undefined;
};


export default sendErr;
export {Side};
