import Connect from '../../database/connect';
import { User } from '../../types/type/database';
import * as utils from '../../Utils/commonImports';
import UserValidation from '../../Utils/user/UserValidation';

export default class SignUp {
    private _user: User;

    private sql =
        'INSERT INTO users (email, user_name, first_name, last_name, password) values ($1,$2,$3,$4,$5) returning uid, email, user_name, first_name, last_name';
    user: User | undefined = undefined;

    constructor(user: User) {
        this._user = user;
    }

    hashUserPassword = async (password: string): Promise<string> => {
        return await new utils.CryptPassword().hashPassword(password);
    };

    async execute(): Promise<User> {
        const validation = new UserValidation({
            user: this._user,
        }).validateUser();
        if (validation.error) {
            throw utils.errorResponse.json(
                utils.ErrorSide.validation,
                validation.error
            );
        } else {
            const { email, user_name, first_name, last_name, password } =
                this._user;
            try {
                const hash_password = await this.hashUserPassword(password);
                if (email && user_name && first_name && last_name && password) {
                    try {
                        const result = await Connect.result(this.sql, [
                            email.toLowerCase().trim(),
                            user_name.toLowerCase().trim(),
                            first_name.trim(),
                            last_name.trim(),
                            hash_password,
                        ]);
                        if (result.rows.length) {
                            this.user = result.rows[0];
                            return this.user as User;
                        } else {
                            throw utils.errorResponse.json(
                                utils.ErrorSide.validation,
                                utils.globalConstants.unexpectedError
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
                        utils.globalConstants.missingParams.user
                    );
                }
            } catch (error) {
                throw utils.errorResponse.json(utils.ErrorSide.service, error);
            }
        }
    }
}
