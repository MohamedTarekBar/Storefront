import { Router } from 'express';
import { authUser, createUser, indexUsers, showUser } from '../../Handler/User/user.controller';
import showUserValidator from '../../Middleweres/Order_Products/show.middlewere';
import authUserValidator from '../../Middleweres/User/auth.middleware';
import createUserValidator from '../../Middleweres/User/create.middleware';

const userRoute = Router();
userRoute.route('/').post(createUserValidator,createUser).get(indexUsers);
userRoute.route('/auth').post(authUserValidator,authUser);
userRoute.route('/:id').get(showUserValidator,showUser);
export default userRoute;
