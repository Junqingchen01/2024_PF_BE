const { Order, Client, Meal, Avaliacao, AvaliacaoFood } = require('../models/order.js');
const { Food } = require('../models/food.js');
const { User } = require('../models/user.js');

exports.createAvaliacao = async (req, res) => {
    const { order_id } = req.params;
    const { foods } = req.body;
    const { UserID } = req; 
    try {
        const { servicerating, temperatureRating, lightRating, Observation } = req.body;
        const order = await Order.findByPk(order_id, {
            include: {
                model: Client,
                include: {
                    model: Meal,
                    include: {
                        model: Food,
                        attributes: ['food_id']
                    }
                }
            }
        });
        
        if (!order) {
            return res.status(400).json({ error: 'Order not found' });
        }

        // Check if order is done
        if (order.avaliar !== 'true') {
            return res.status(400).json({ error: 'Adminstrador ainda não permite de avaliar sobre neste orden !' });
        }

        // check is order is already avaliated
        const avaliacaoExists = await Avaliacao.findOne({ where: { order_id } });
        if (avaliacaoExists) {
            return res.status(400).json({ error: 'Order already avaliated' });
        }
        
        // Create Avaliacao
        const avaliacao = await Avaliacao.create({ order_id, 
            servicerating, 
            temperatureRating, 
            lightRating, 
            Observation,
            UserID: UserID });

        // Create AvaliacaoFood for each food item in the order
        const avaliacaoFoods = [];
        for (const foodData of foods) {
            const { food_id, quantityRating } = foodData;
            const avaliacaoFood = await AvaliacaoFood.create({ avaliacao_id: avaliacao.avaliacao_id, food_id, quantityRating });
            avaliacaoFoods.push(avaliacaoFood);
        }
        res.status(201).json({ avaliacao, avaliacaoFoods });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create avaliacao' });
    }
};

exports.getAllAvaliacao = async (req, res) => {
    try {
        const avaliacoes = await Avaliacao.findAll({
            include: {
                model: AvaliacaoFood,
                attributes: ['food_id', 'quantityRating']
            }
        }); 
        res.status(200).json(avaliacoes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to get all avaliacoes' });
    }
}

exports.getMyAvaliacao = async (req, res) => {
    const { UserID } = req;
    try {
        const avaliacoes = await Avaliacao.findAll({
            where: { UserID },
            include: {
                model: AvaliacaoFood,
                attributes: ['food_id', 'quantityRating']
            }
        });
        res.status(200).json(avaliacoes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to get my avaliacoes' });
    }
}

exports.getAvaliacaoByID = async (req, res) => {
    const { avaliacao_id } = req.params;
    try {
        const avaliacao = await Avaliacao.findByPk(avaliacao_id, {
            include: {
                model: AvaliacaoFood,
                attributes: ['food_id', 'quantityRating']
            }
        });
        if (!avaliacao) {
            return res.status(400).json({ error: 'Avaliacao not found' });
        }
        res.status(200).json(avaliacao);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to get avaliacao' });
    }
},


// delete my avaliacao
exports.delectmyAvaliacao = async (req, res) => {
    try {
        const { avaliacao_id } = req.params;
        const { UserID } = req;
        const avaliacao = await Avaliacao.findOne({ where: { avaliacao_id, UserID } });
        if (!avaliacao) {
            return res.status(400).json({ error: 'Avaliacao not found' });
        }
        await avaliacao.destroy();
        res.status(200).json({ message: 'Avaliacao deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete avaliacao' });
    }
};


