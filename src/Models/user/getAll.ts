import Connect from '../../database/connect';
import * as utils from '../../Utils/commonImports';

export default class GetAllUser { 
    private sql = 'SELECT uid, email, user_name, first_name, last_name FROM users';

    async execute(): Promise<utils.User[]> {
        try {
            const result = await Connect.result(this.sql);
            if (result.rows.length) {
                return result.rows;
            } else {
                throw utils.errorResponse.json(utils.ErrorSide.service,utils.globalConstants.unexpectedError.unavailable);
            }
        } catch (error) {
            throw utils.errorResponse.json(utils.ErrorSide.database,error);
        }
    }
}