import config from '../../Configs/config';
import bycrypt from 'bcrypt';
import errorResponse, { ErrorSide } from '../throwErrorResponse';
import globalConstants from '../error.constant';

class CryptPassword {
    async hashPassword(password: string): Promise<string> {
        if (password) {
            try {
                const salt = parseInt(config.salt as string, 10);
                return bycrypt.hashSync(`${password}${config.pepper}`, salt);
            } catch (error) {
                throw errorResponse.json(
                    ErrorSide.validation,
                    globalConstants.hashError.hashing + error
                );
            }
        } else {
            throw errorResponse.json(
                ErrorSide.validation,
                globalConstants.missingParams.password
            );
        }
    }

    async compare(password: string, hashedPassword: string): Promise<boolean> {
        if (hashedPassword || password) {
            try {
                return bycrypt.compareSync(
                    `${password}${config.pepper}`,
                    hashedPassword
                );
            } catch (error) {
                throw errorResponse.json(
                    ErrorSide.validation,
                    globalConstants.hashError.compare + error
                );
            }
        } else {
            throw errorResponse.json(
                ErrorSide.validation,
                globalConstants.missingParams.password
            );
        }
    }
}

export default CryptPassword;
