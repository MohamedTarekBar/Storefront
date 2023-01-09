import jwt from 'jsonwebtoken';
import config from '../../Configs/config';
import globalConstants from '../error.constant';
import errorResponse, { ErrorSide } from '../throwErrorResponse';

class Token {
    getToken(o: object) {
        if (o) {
            try {
                const token = jwt.sign(
                    o,
                    config.token as unknown as string
                );
                return token;
            } catch (error) {
                throw errorResponse.json(ErrorSide.security, error);
            }
        } else {
            throw errorResponse.json(
                ErrorSide.security,
                globalConstants.missingParams.user
            );
        }
    }

    verify(user_token: string) {
        try {
            const ver = jwt.verify(
                user_token,
                config.token as unknown as string
            );
            return ver;
        } catch (error) {
            throw errorResponse.json(ErrorSide.security, error);
        }
    }

    decode(token?: string) {
        if (token) {
            try {
                const result = jwt.decode(token);
                if(result !== null) {
                    return result;
                } else {
                    throw errorResponse.json(ErrorSide.security, globalConstants.tokenError.notVerified);
                }
            } catch (error) {
                throw errorResponse.json(ErrorSide.security, error);
            }
        } else {
            throw errorResponse.json(
                ErrorSide.security,
                globalConstants.tokenError.notProvided
            );
        }
    }
}
const token = new Token();
export default token;
