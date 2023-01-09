import Connect from '../../database/connect';
import { User } from '../../types/type/database';
import * as utils from '../../Utils/commonImports';
import UserValidation from '../../Utils/user/UserValidation';

export interface getterTypes {
    email: string;
    user_name: string;
    uid: string;
}

export default class GetUser {
    private byEmail =
        'SELECT uid, email, user_name, first_name, last_name FROM users WHERE email=$1';
    private byUsername =
        'SELECT uid, email, user_name, first_name, last_name FROM users WHERE user_name=$1';
    private byUid =
        'SELECT uid, email, user_name, first_name, last_name FROM users WHERE uid=$1';

    private async getUser(query: string, by: string): Promise<User> {
        try {
            const result = await Connect.result(query, [by]);
            return result.rows[0];
        } catch (error) {
            throw utils.errorResponse.json(utils.ErrorSide.database, error);
        }
    }

    async execute(options?: Partial<getterTypes>): Promise<User> {

        if (options?.email) {
            const email_Validation = new UserValidation({email: options.email}).validateEmail();
            if (email_Validation.error) {
                throw utils.errorResponse.json(
                    utils.ErrorSide.validation,
                    email_Validation.error
                );
            }
            return await this.getUser(this.byEmail, options.email.toLowerCase().trim());
        } else if (options?.user_name) {
            const username_Validation = new UserValidation({user_name: options.user_name}).validateUserName();
            if (username_Validation.error) {
                throw utils.errorResponse.json(
                    utils.ErrorSide.validation,
                    username_Validation.error
                );
            }
            return await this.getUser(this.byUsername, options.user_name.toLowerCase().trim());
        } else if (options?.uid) {
            if (options.uid.trim() === '') {
                throw utils.errorResponse.json(
                    utils.ErrorSide.validation,
                    utils.globalConstants.missingParams.params
                );
            }
            return await this.getUser(this.byUid, options.uid);
        } else {
            throw utils.errorResponse.json(
                utils.ErrorSide.database,
                utils.globalConstants.unexpectedError.database
            );
        }
    }
}
