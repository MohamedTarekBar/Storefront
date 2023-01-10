import { Router } from 'express';
import {
    authUser,
    changeUserPassword,
    createUser,
    deleteUser,
    indexUsers,
    showUser,
    updateUser,
} from '../../Handler/User/user.controller';
import authenticationMiddlewere from '../../Middleweres/authentication.middleware';
import showUserValidator from '../../Middleweres/Order_Products/show.middlewere';
import authUserValidator from '../../Middleweres/User/auth.middleware';
import changePasswordUserValidator from '../../Middleweres/User/changePassword.middleware';
import createUserValidator from '../../Middleweres/User/create.middleware';
import deleteUserValidator from '../../Middleweres/User/delete.middleware';
import updateUserValidator from '../../Middleweres/User/update.middleware';

const userRoute = Router();
userRoute.route('/').post(createUserValidator, createUser).get(indexUsers);
userRoute.route('/auth').post(authUserValidator, authUser);
userRoute.use(authenticationMiddlewere);
userRoute
    .route('/:id')
    .get(showUserValidator, showUser)
    .delete(deleteUserValidator, deleteUser)
    .put(updateUserValidator, updateUser);
userRoute
    .route('/password/:id')
    .put(changePasswordUserValidator, changeUserPassword);

export default userRoute;
