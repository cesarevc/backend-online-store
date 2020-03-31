import models from '../models';

export default {
    add: async (req, res, next) => {
        try {
            const reg = await models.Article.create(req.body);
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
            const reg = await models.Article.findOne({_id: req.query._id})
            .populate('categoria', {nombre:1});
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
            const reg = await models.Article.find({$or:[{'name': new RegExp(value, 'i')}, {'description': new RegExp(value, 'i')}]}, {createdAt:0})
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
            const reg = await models.Article.findByIdAndUpdate({_id: req.body._id}, {category: req.body.category, code: req.body.code, name: req.body.name, description: req.body.description, sale_price: req.body.sale_price, purchase_price: req.body.purchase_price, stock: req.body.stock });
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrio un error'
            });
            next(e);
        }
    },
    remove : async (req, res, next) => {
        try {
            const reg = await models.Article.findByIdAndDelete({_id: req.body._id});
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrio un error'
            });
            next(e);
        }
    },
    activate : async (req, res, next) => {
        try {
            const reg = await models.Article.findByIdAndUpdate({_id: req.body._id}, {state: 1});
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrio un error'
            });
            next(e);
        }
    },
    deactivate : async (req, res, next) => {
        try {
            const reg = await models.Article.findByIdAndUpdate({_id: req.body._id}, {state: 0});
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrio un error'
            });
            next(e);
        }
    }
}