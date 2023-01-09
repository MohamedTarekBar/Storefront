import Connect from '../../database/connect';
import { User } from '../../types/type/database';
import * as utils from '../../Utils/commonImports';
import UserValidation from '../../Utils/user/UserValidation';

export default class SignIn {
    private _email: string;
    private _password: string;

    private getPassSQL = 'SELECT password FROM users WHERE email=$1';
    private getUserInfo =
        'SELECT uid, email, user_name, first_name, last_name FROM users WHERE email=$1';

    user: User | undefined = undefined;

    constructor(email: string, password: string) {
        this._email = email;
        this._password = password;
    }

    async comparePassword(password: string, hash: string): Promise<boolean> {
        return await new utils.CryptPassword().compare(password, hash);
    }

    async execute(): Promise<User> {
        const validation = new UserValidation({
            email: this._email,
            password: this._password,
        });
        const email_Validation = validation.validateEmail().error;
        const password_Validation = validation.validatePassword().error;
        if (email_Validation) {
            throw utils.errorResponse.json(
                utils.ErrorSide.validation,
                email_Validation
            );
        }
        if (password_Validation) {
            throw utils.errorResponse.json(
                utils.ErrorSide.validation,
                password_Validation
            );
        }
        const email = this._email;
        const password = this._password;

        try {
            const result = await Connect.result(this.getPassSQL, [
                email.toLowerCase(),
            ]);
            
            const hashPassword = result.rows.length ? result.rows[0].password : undefined;
            if (hashPassword) {
                const isValid = await this.comparePassword(
                    password,
                    hashPassword
                );
                if (isValid) {
                    const result = await Connect.result(this.getUserInfo, [
                        email.toLowerCase().trim(),
                    ]);
                    if (result.rows.length) {
                        const query = 'UPDATE users SET token=$1 WHERE email=$2 RETURNING uid, email, user_name, first_name, last_name, token';
                        this.user = result.rows[0];
                        const token = utils.token.getToken(this.user as User);
                        const auth = await Connect.result(query, [
                            token,
                            this.user?.email
                        ]);
                        return auth.rows[0];
                    } else {
                        throw utils.errorResponse.json(utils.ErrorSide.service, utils.globalConstants.unexpectedError.service);
                    } 
                } else {
                    throw utils.errorResponse.json(utils.ErrorSide.validation, utils.globalConstants.auth.password);
                }
            } else {
                throw utils.errorResponse.json(utils.ErrorSide.validation, utils.globalConstants.auth.email);
            }
        } catch (error) {
            throw utils.errorResponse.json(utils.ErrorSide.database, error);
        }
    }
}
