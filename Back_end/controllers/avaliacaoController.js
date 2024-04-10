const { Order, Client, Meal, Avaliacao, AvaliacaoFood } = require('../models/order.js');
const { Food } = require('../models/food.js');
const { User } = require('../models/user.js');

exports.createAvaliacao = async (req, res) => {
    const { order_id } = req.params;
    const { foods } = req.body;
    try {
        const { servicerating, temperatureRating, lightRating, serviceObservation, temperatureObservation, lightObservation } = req.body;
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
        if (order.status !== 'done') {
            return res.status(400).json({ error: 'Order is not done' });
        }
        
        // Create Avaliacao
        const avaliacao = await Avaliacao.create({ order_id, servicerating, temperatureRating, lightRating, serviceObservation, temperatureObservation, lightObservation });

        // Create AvaliacaoFood for each food item in the order
        const avaliacaoFoods = [];
        for (const foodData of foods) {
            const { food_id, quantityRating, content } = foodData;
            const avaliacaoFood = await AvaliacaoFood.create({ avaliacao_id: avaliacao.avaliacao_id, food_id, quantityRating, content });
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
                attributes: ['food_id', 'quantityRating', 'content']
            }
        }); 
        res.status(200).json(avaliacoes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to get all avaliacoes' });
    }
}
