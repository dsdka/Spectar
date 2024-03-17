import * as userController from '../controllers/user.js';
import { checkSession, authorizedRoles } from '../middlewares/authorizations.js';
import { UserRoleId } from '../controllers/user.js';

export default function userRoutes(router) {
  router.put('/register', userController.registerUser)
  router.get('/user_role', userController.getUserRole);
  router.post('/login', userController.login);
  router.get('/whoAmI', checkSession, userController.whoAmi);
  router.get('/logout', checkSession, userController.logout);
  router.get('/users', authorizedRoles([UserRoleId.ADMIN]), userController.getUsers);
  router.post('/users', authorizedRoles([UserRoleId.ADMIN]), userController.updateUser);
  router.delete('/users', authorizedRoles([UserRoleId.ADMIN]), userController.deleteUser);

}
