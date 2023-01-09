import connect from '../../database/connect';
import User from '../../types/User.type';
import constants from '../../Utils/errorConstants.utils';
import CryptPassword from '../../Utils/hashPassword.utils';
import sendErr, { Side } from '../../Utils/sendError.utils';
import token from '../../Utils/token.utils';

class UserModel {
    private getUser = (user: {id: number, email: string, first_name: string, last_name:string, token: string}): User => {
        return {
            id: user.id,
            email: user.email,
            firstName: user.first_name,
            lastName: user.last_name,
            token: user.token,
        };
    };

    createUser = async (user: User) => {
        try {
            const sql =
                'INSERT INTO users (first_name, last_name, email, password) values ($1,$2,$3,$4) returning *';
            const hash = await CryptPassword.hashPassword(
                user.password as string
            );
            const result = await connect.result(sql, [
                user.firstName,
                user.lastName,
                user.email,
                hash,
            ]);

            if (result.rows.length) {
                const user = result.rows[0];
                return this.getUser(user);
            } else {
                throw sendErr(Side.database, constants.default.unexpectedError);
            }
        } catch (error) {
            console.log((error as Error).message);
            // eslint-disable-next-line quotes
            if ((error as Error).message.includes("duplicate key value violates unique constraint \"users_email_key\"")) {
                throw sendErr(Side.database, constants.user.email.unique);
            }
            throw sendErr(Side.database, error);
        }
    };

    authUser = async (user: User) => {
        try {
            const sql = 'SELECT * from users WHERE email=$1';
            const result = await connect.result(sql, [user.email]);
            if (result.rows.length && result.rows[0].password) {
                const hashedPassword = result.rows[0].password;
                const isValidPassword = await CryptPassword.compare(
                    user.password as string,
                    hashedPassword
                );
                if (isValidPassword) {
                    const sql =
                        'UPDATE users SET token=$1 WHERE email=$2 RETURNING *';
                    const userWithoutToken = this.getUser(result.rows[0]);
                    userWithoutToken.token = undefined;
                    const userToken = token.getToken(userWithoutToken);
                    const update = await connect.result(sql, [
                        userToken,
                        user.email,
                    ]);
                    const updatedUser = update.rows[0];
                    return this.getUser(updatedUser);
                } else {
                    throw sendErr(
                        Side.database,
                        constants.user.password.incorrect
                    );
                }
            } else {
                throw sendErr(Side.database, constants.user.email.store);
            }
        } catch (error) {
            throw sendErr(Side.database, error);
        }
    };

    indexUsers = async (): Promise<User[]> => {
        try {
            const sql = 'SELECT * from users';
            const result = await connect.result(sql);
            if (result.rows.length) {
                const arrOfUsers: User[] = [];
                result.rows.forEach((user) => {
                    arrOfUsers.push(this.getUser(user));
                });
                return arrOfUsers;
            } else {
                throw sendErr(Side.database, constants.default.noDataFound);
            }
        } catch (error) {
            throw sendErr(Side.database, error);
        }
    };
    showUser = async (id: number): Promise<User> => {
        try {
            const sql = 'SELECT * from users WHERE id=$1';
            const result = await connect.result(sql, [id]);
            if (result.rows.length) {
                return result.rows[0];
            } else {
                throw sendErr(Side.database, constants.default.noDataFound);
            }
        } catch (error) {
            throw sendErr(Side.database, error);
        }
    };
}
export default UserModel;
