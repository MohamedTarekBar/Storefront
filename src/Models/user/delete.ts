import Connect from '../../database/connect';
import * as utils from '../../Utils/commonImports';
import UserValidation from '../../Utils/user/UserValidation';

export interface getterTypes {
    email: string;
    user_name: string;
    uid: string;
}

export default class DeleteUser {
    private byEmail = 'DELETE FROM users WHERE email=$1 AND token=$2';
    private byUsername = 'DELETE FROM users WHERE user_name=$1 AND token=$2';
    private byUid = 'DELETE FROM users WHERE uid=$1 AND token=$2';

    private async deleteUser(query: string, by: string[]): Promise<number> {
        try {
            const result = await Connect.result(query, by);
            return result.rowCount;
        } catch (error) {
            throw utils.errorResponse.json(utils.ErrorSide.database, error);
        }
    }

    async execute(
        token: string,
        options?: Partial<getterTypes>
    ): Promise<{ count: number }> {
        if (options?.email) {
            const email_Validation = new UserValidation({
                email: options.email,
            }).validateEmail();
            if (email_Validation.error) {
                throw utils.errorResponse.json(
                    utils.ErrorSide.validation,
                    email_Validation.error
                );
            }
            const deleted = await this.deleteUser(this.byEmail, [
                options.email.toLowerCase().trim(),
                token,
            ]);
            if (deleted) {
                return { count: deleted };
            } else {
                return { count: 0 };
            }
        } else if (options?.user_name) {
            const username_Validation = new UserValidation({
                user_name: options.user_name,
            }).validateUserName();

            if (username_Validation.error) {
                throw utils.errorResponse.json(
                    utils.ErrorSide.validation,
                    username_Validation.error
                );
            }
            const deleted = await this.deleteUser(this.byUsername, [
                options.user_name.trim(),
                token,
            ]);

            if (deleted) {
                return { count: deleted };
            } else {
                return { count: 0 };
            }
        } else if (options?.uid) {
            if (options.uid.trim() === '') {
                throw utils.errorResponse.json(
                    utils.ErrorSide.validation,
                    utils.globalConstants.missingParams.params
                );
            }
            const deleted = await this.deleteUser(this.byUid, [
                options.uid.trim(),
                token,
            ]);
            if (deleted) {
                return { count: deleted };
            } else {
                throw utils.errorResponse.json(
                    utils.ErrorSide.validation,
                    utils.globalConstants.unexpectedError.security
                );
            }
        } else {
            throw utils.errorResponse.json(
                utils.ErrorSide.database,
                utils.globalConstants.unexpectedError.database
            );
        }
    }
}
