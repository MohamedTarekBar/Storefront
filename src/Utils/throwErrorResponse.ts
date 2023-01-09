import globalConstants from './error.constant';
import { getStatusCode } from 'http-status-codes';
/* eslint-disable indent */
interface Error {
    message?: string;
    status?: string;
}
enum ErrorSide {
    validation,
    server,
    security,
    page404,
    database,
    service,
}
class ErrorResponse {
    json = (side: ErrorSide, err?: Error | string | undefined | unknown) => {
        const msg = this.error(err);
        switch (side) {
            case ErrorSide.database:
                return {
                    status: getStatusCode('Bad Gateway') || 502,
                    message: msg
                        ? msg
                        : globalConstants.unexpectedError.validation,
                };
            case ErrorSide.validation:
                return {
                    status: getStatusCode('Bad Request') || 400,
                    message: msg
                        ? msg
                        : globalConstants.unexpectedError.validation,
                };
            case ErrorSide.server:
                return {
                    status: getStatusCode('Internal Server Error') || 500,
                    message: msg ? msg : globalConstants.unexpectedError.server,
                };
            case ErrorSide.security:
                return {
                    status: getStatusCode('Forbidden') || 403,
                    message: msg
                        ? msg
                        : globalConstants.unexpectedError.security,
                };
            case ErrorSide.page404:
                return {
                    status: getStatusCode('Not Found') || 404,
                    message: msg
                        ? msg
                        : globalConstants.unexpectedError.pageNotFound,
                };
            case ErrorSide.service:
                return {
                    status: getStatusCode('Service Unavailable') || 503,
                    message: msg
                        ? msg
                        : globalConstants.unexpectedError.pageNotFound,
                };
            default:
                return {
                    status: getStatusCode('Internal Server Error') || 500,
                    message: msg ? msg : globalConstants.unexpectedError.server,
                };
        }
    };

    private error(
        error?: Error | string | undefined | unknown
    ): string | undefined {
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
    }
}

const errorResponse = new ErrorResponse();
export default errorResponse;
export { ErrorSide };
