import tokenServices from '../services/token';

export default {
    verifyUser: async (req, res, next) =>{
        if(!req.headers.token){
            return res.status(404).send({
                message: 'No token'
            });
        }
        const response = await tokenServices.decode(req.headers.token);
        if (response.rol == 'Administrator' || response.rol == 'salesman' || response.rol == 'warehousemanager') {
            next();
        } else {
            return res.status(403).send({
                message: 'No autorizado'
            });
        }
    },
    verifyAdministrator: async (req, res, next) =>{
        if(!req.headers.token){
            return res.status(404).send({
                message: 'No token'
            });
        }
        const response = await tokenServices.decode(req.headers.token);
        if (response.rol == 'Administrator') {
            next();
        } else {
            return res.status(403).send({
                message: 'No autorizado'
            });
        }
    },
    verifyManager: async (req, res, next) =>{
        if(!req.headers.token){
            return res.status(404).send({
                message: 'No token'
            });
        }
        const response = await tokenServices.decode(req.headers.token);
        if (response.rol == 'Administrator' || response.rol == 'warehousemanager') {
            next();
        } else {
            return res.status(403).send({
                message: 'No autorizado'
            });
        }
    },
    verifySalesman: async (req, res, next) =>{
        if(!req.headers.token){
            return res.status(404).send({
                message: 'No token'
            });
        }
        const response = await tokenServices.decode(req.headers.token);
        if (response.rol == 'Administrator' || response.rol == 'salesman') {
            next();
        } else {
            return res.status(403).send({
                message: 'No autorizado'
            });
        }
    }   
}