import config from '../Configs/config';
import bycrypt from 'bcrypt';
import sendErr, { Side } from './sendError.utils';
import constants from './errorConstants.utils';

class CryptPassword {
    async hashPassword(password: string): Promise<string> {
        if (password) {
            try {
                const salt = parseInt(config.salt as string, 10);
                return bycrypt.hashSync(`${password}${config.pepper}`, salt);
            } catch (error) {
                throw sendErr(
                    Side.validation,
                    constants.hash.hashing + ',hash'
                );
            }
        } else {
            throw sendErr(
                Side.validation,
                constants.user.password.required + ',hash'
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
                throw sendErr(
                    Side.validation,
                    constants.hash.compare + ',hash'
                );
            }
        } else {
            throw sendErr(
                Side.validation,
                constants.user.password.required + ',hash'
            );
        }
    }
}
const cryptPassword = new CryptPassword();
export default cryptPassword;
