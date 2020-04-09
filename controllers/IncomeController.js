import models from '../models';

async function increaseStock (id_article, quantity){
    let {stock} = await models.Article.findOne({_id: id_article});
    let newStock = parseInt(stock) + parseInt(quantity);
    const reg = await models.Article.findByIdAndUpdate({_id: id_article},{stock: newStock});
}

async function decreaseStock (id_article, quantity){
    let {stock} = await models.Article.findOne({_id: id_article});
    let newStock = parseInt(stock) - parseInt(quantity);
    const reg = await models.Article.findByIdAndUpdate({_id: id_article},{stock: newStock});
}

export default {
    add: async (req, res, next) => {
        try {
            const reg = await models.Income.create(req.body);
            //actulizar el stock
            let details = req.body.details;
            details.map ((x) => {
                increaseStock(x._id, x.quantity);
            });
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
            const reg = await models.Income.findOne({_id: req.query._id})
            .populate('usuarios', {name: 1})
            .populate('personas', {name: 1});
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
            const reg = await models.Income.find({$or:[{'voucher_num': new RegExp(value, 'i')}, {'voucher_serial': new RegExp(value, 'i')}]}, {createdAt:0})
            .populate('usuarios', {name: 1})
            .populate('personas', {name: 1})
            .sort({'createdAt': -1});
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrio un error'
            });
            next(e);
        }
    },
    //No se deben modificar mucho menos borrar este tipo de transacciones
    // update: async (req, res, next) => {
    //     try {
    //         const reg = await models.Income.findByIdAndUpdate({_id: req.body._id}, {name: req.body.name, description: req.body.description});
    //         res.status(200).json(reg);
    //     } catch (error) {
    //         res.status(500).send({
    //             message: 'Ocurrio un error'
    //         });
    //         next(e);
    //     }
    // },
    // remove : async (req, res, next) => {
    //     try {
    //         const reg = await models.Income.findByIdAndDelete({_id: req.body._id});
    //         res.status(200).json(reg);
    //     } catch (error) {
    //         res.status(500).send({
    //             message: 'Ocurrio un error'
    //         });
    //         next(e);
    //     }
    // },
    activate : async (req, res, next) => {
        try {
            const reg = await models.Income.findByIdAndUpdate({_id: req.body._id}, {state: 1});
            //actulizar el stock
            let details = reg.details;
            details.map ((x) => {
                increaseStock(x._id, x.quantity);
            });
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
            const reg = await models.Income.findByIdAndUpdate({_id: req.body._id}, {state: 0});
            //actulizar el stock
            let details = reg.details;
            details.map ((x) => {
                decreaseStock(x._id, x.quantity);
            });
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrio un error'
            });
            next(e);
        }
    }
}