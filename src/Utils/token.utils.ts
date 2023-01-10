import jwt from 'jsonwebtoken';
import config from '../Configs/config';
import constants from './errorConstants.utils';
import sendErr, { Side } from './sendError.utils';

class Token {
    getToken(o: object) {
        if (o) {
            try {
                const token = jwt.sign(o, config.token as unknown as string);
                return token;
            } catch (error) {
                throw sendErr(Side.security, error + ',token');
            }
        } else {
            throw sendErr(Side.security, constants.missParams + ',token');
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
            throw sendErr(Side.security, error + ',token');
        }
    }

    decode(token?: string) {
        if (token) {
            try {
                const result = jwt.decode(token);
                if (result !== null) {
                    return result;
                } else {
                    throw sendErr(
                        Side.security,
                        constants.token.verify + ',token'
                    );
                }
            } catch (error) {
                throw sendErr(Side.security, error + ',token');
            }
        } else {
            throw sendErr(Side.security, constants.token.provide + ',token');
        }
    }
}
const token = new Token();
export default token;
