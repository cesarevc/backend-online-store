import models from '../models';


export default {
    add: async (req, res, next) => {
        try {
            const reg = await models.Person.create(req.body);
            res.status(200).json(reg);
        } catch (e) {
            res.status(500).send({
                message: 'Ocurrio un error'
            });
            next(e);
        }
    },
    query: async (req, res, next) => {
        try {
            const reg = await models.Person.findOne({_id: req.query._id});
            if (!reg) {
                res.status(404).send({
                    message: 'El registro no existe'
                });
            } else {
                res.status(200).json(reg);
            }
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrio un error'
            });
            next(e);
        }
    },
    list: async (req, res, next) => {
        try {
            let value = req.query.value;
            const reg = await models.Person.find({$or:[{'name': new RegExp(value, 'i')}, {'email': new RegExp(value, 'i')}]}, {createdAt:0})
            .populate('categoria', {nombre:1})
            .sort({'createdAt': -1});
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrio un error'
            });
            next(e);
        }
    },
    listClients: async (req, res, next) => {
        try {
            let value = req.query.value;
            const reg = await models.Person.find({$or:[{'name': new RegExp(value, 'i')}, {'email': new RegExp(value, 'i')}], 'personType':'Client'}, {createdAt:0})
            .populate('categoria', {nombre:1})
            .sort({'createdAt': -1});
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrio un error'
            });
            next(e);
        }
    },
    listProviders: async (req, res, next) => {
        try {
            let value = req.query.value;
            const reg = await models.Person.find({$or:[{'name': new RegExp(value, 'i')}, {'email': new RegExp(value, 'i')}], 'personType':'Provider'}, {createdAt:0})
            .populate('categoria', {nombre:1})
            .sort({'createdAt': -1});
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrio un error'
            });
            next(e);
        }
    },
    update: async (req, res, next) => {
        try {
            const reg = await models.Person.findByIdAndUpdate(
                {_id: req.body._id}, 
                {
                    personType: req.body.personType, 
                    name: req.body.name, 
                    document_type: req.body.document_type, 
                    document_num: req.body.document_num, 
                    address: req.body.address, 
                    phone: req.body.phone, 
                    email: req.body.email, 
                });
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrio un error'
            });
            next(e);
        }
    },
    remove: async (req, res, next) => {
        try {
            const reg = await models.Person.findByIdAndDelete({_id: req.body._id});
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrio un error'
            });
            next(e);
        }
    },
    activate: async (req, res, next) => {
        try {
            const reg = await models.Person.findByIdAndUpdate({_id: req.body._id}, {state: 1});
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrio un error'
            });
            next(e);
        }
    },
    deactivate: async (req, res, next) => {
        try {
            const reg = await models.Person.findByIdAndUpdate({_id: req.body._id}, {state: 0});
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrio un error'
            });
            next(e);
        }
    }
}