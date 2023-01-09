import { Router } from 'express';
import * as utils from '../../../Utils/commonImports';

const usersRoute = Router();

usersRoute
    .route('/')
    .post(utils.signUp)
    .get(utils.authenticationMiddlewere, utils.indexUsers);

usersRoute.route('/auth').post(utils.authUser);

usersRoute
    .route('/username/:user_name')
    .get(utils.authenticationMiddlewere, utils.showUser)
    .delete(utils.authenticationMiddlewere, utils.deleteUser);
usersRoute
    .route('/email/:email')
    .get(utils.authenticationMiddlewere, utils.showUser)
    .delete(utils.authenticationMiddlewere, utils.deleteUser);
    
usersRoute
    .route('/uid/:uid')
    .get(utils.authenticationMiddlewere, utils.showUser)
    .delete(utils.authenticationMiddlewere, utils.deleteUser)
    .put(utils.authenticationMiddlewere, utils.updateUser);

export default usersRoute;
