import Connect from '../../database/connect';
import * as utils from '../../Utils/commonImports';
import UserValidation from '../../Utils/user/UserValidation';

export default class UpdateUser {
    uid: string;
    newEmail: string | undefined;
    newPassword: string | undefined;
    token: string;

    private sql = {
        updateBoth:
            'UPDATE users SET email=$1 , password=$2 WHERE uid=$3 AND token=$4 RETURNING uid, email, user_name, first_name, last_name, token',
        updateEmail:
            'UPDATE users SET email=$1 WHERE uid=$2 AND token=$3 RETURNING uid, email, user_name, first_name, last_name, token',
        updatePassword:
            'UPDATE users SET password=$1 WHERE uid=$2 AND token=$3 RETURNING uid, email, user_name, first_name, last_name, token',
    };

    constructor(
        uid: string,
        newEmail: string | undefined,
        newPassword: string | undefined,
        token: string
    ) {
        this.uid = uid;
        this.newEmail = newEmail;
        this.newPassword = newPassword;
        this.token = token;
    }
    hashUserPassword = async (password: string): Promise<string> => {
        return await new utils.CryptPassword().hashPassword(password);
    };
    async execute(): Promise<utils.User> {
        if (this.uid) {
            let sql = '';
            let data = '';
            if (this.newEmail && this.newPassword) {
                const validateEmail = new UserValidation({
                    email: this.newEmail,
                }).validateEmail().error?.message;
                const validatePassword = new UserValidation({
                    password: this.newPassword,
                }).validatePassword().error?.message;

                if (validateEmail || validatePassword) {
                    throw utils.errorResponse.json(
                        utils.ErrorSide.validation,
                        validateEmail || validatePassword
                    );
                } else {
                    sql = this.sql.updateBoth;
                    try {
                        const hash_password = await this.hashUserPassword(
                            this.newPassword
                        );
                        const result = await Connect.result(sql, [
                            this.newEmail.toLowerCase(),
                            hash_password,
                            this.uid,
                            this.token
                        ]);
                        if (result.rows.length) {
                            return result.rows[0];
                        } else {
                            throw utils.errorResponse.json(
                                utils.ErrorSide.service,
                                utils.globalConstants.unexpectedError
                                    .unavailable
                            );
                        }
                    } catch (error) {
                        throw utils.errorResponse.json(
                            utils.ErrorSide.database,
                            error
                        );
                    }
                }
            }
            if (this.newEmail) {
                const validateEmail = new UserValidation({
                    email: this.newEmail,
                }).validateEmail().error?.message;
                if (validateEmail) {
                    throw utils.errorResponse.json(
                        utils.ErrorSide.validation,
                        validateEmail
                    );
                } else {
                    sql = this.sql.updateEmail;
                    data = this.newEmail.toLowerCase();
                }
            }
            if (this.newPassword) {
                const validatePassword = new UserValidation({
                    password: this.newPassword,
                }).validatePassword().error?.message;
                if (validatePassword) {
                    throw utils.errorResponse.json(
                        utils.ErrorSide.validation,
                        validatePassword
                    );
                } else {
                    sql = this.sql.updatePassword;
                    const hash_password = await this.hashUserPassword(
                        this.newPassword
                    );
                    data = hash_password;
                }
            }

            if (sql != '') {
                try {
                    const result = await Connect.result(sql, [data, this.uid, this.token]);
                    if (result.rows.length) {
                        return result.rows[0];
                    } else {
                        throw utils.errorResponse.json(
                            utils.ErrorSide.service,
                            utils.globalConstants.unexpectedError.unavailable
                        );
                    }
                } catch (error) {
                    throw utils.errorResponse.json(
                        utils.ErrorSide.database,
                        error
                    );
                }
            } else {
                throw utils.errorResponse.json(
                    utils.ErrorSide.validation,
                    utils.globalConstants.missingParams.update
                );
            }
        } else {
            throw utils.errorResponse.json(
                utils.ErrorSide.validation,
                utils.globalConstants.missingParams.uid
            );
        }
    }
}
