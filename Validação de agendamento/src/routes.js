import {Router}from'express';
import multer from 'multer';
import multerConfig from './config/multer';
import UserController from './app/controllers/UserController'
import SessionController from './app/controllers/SessionController'
import FileController from './app/controllers/FileController'
import authMiddleware from './app/middlewares/auth'
import ProviderController from './app/controllers/ProviderController'
import ApointmentController from './app/controllers/AppointmentController'

const routes=new Router();
const upload=multer(multerConfig);

routes.post('/users',UserController.store);
routes.post('/sessions',SessionController.store);

routes.use(authMiddleware);
routes.put('/users',UserController.update);

routes.get('/providers',ProviderController.index)

routes.post('/files',upload.single('file'),FileController.store);


routes.post('/appointments',ApointmentController.store)


export default routes;