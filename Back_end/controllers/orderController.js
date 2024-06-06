const { Order, Client, Meal } = require('../models/order.js');
const { Food } = require('../models/food.js');
const { User } = require('../models/user.js');

exports.createOrder = async (req, res) => {
    try {
        const {number_people, OrderDate, Horario, contents } = req.body;
        const UserID = req.UserID;
        const order = await Order.create({ UserID, number_people, OrderDate, Horario}); 

        for (const content of contents) {
            const client = await Client.create({ order_id: order.order_id, name: content.name, indifferent: content.indifferent });

            for (const meal of content.meals) {
                const food = await Food.findByPk(meal.food_id);
                if (!food) {
                    return res.status(400).json({ error: 'Food not found' });
                }
                await Meal.create({
                    client_id: client.client_id,
                    food_id: food.food_id,
                    observation: meal.observation
                });
            }
        }
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create order' ,error });
    }
};


exports.getOrdersbyUser = async (req, res) => {
    try {
        const UserID = req.UserID;
        const user = await User.findByPk(UserID, { attributes: ['Name'] });
        const orders = await Order.findAll({
            where: { UserID },
            attributes: ['order_id', 'number_people', 'OrderDate', 'Status', 'Horario','avaliar', 'createdAt'],
            include: [
                {
                    model: Client,
                    attributes: ['name', 'indifferent'],
                    include: [
                        {
                            model: Meal,
                            attributes: ['food_id', 'observation'],
                            include: [
                                {
                                    model: Food,
                                    attributes: ['food_id', 'food_name', 'type']
                                }
                            ]
                        }
                    ]
                }
            ]
        });
        res.status(200).json({ user: user.Name, orders });
    } catch (error) {
        res.status(500).json({ error: 'Failed to get orders' });
    }
};

exports.getOrdersDonebyUser = async (req, res) => {
    try {
        const UserID = req.UserID;
        const user = await User.findByPk(UserID, { attributes: ['Name'] });
        const orders = await Order.findAll({
            where: { UserID, Status: 'Done' },
            attributes: ['order_id', 'number_people', 'OrderDate', 'Status', 'Horario','avaliar', 'createdAt'],
            include: [
                {
                    model: Client,
                    attributes: ['name', 'indifferent'],
                    include: [
                        {
                            model: Meal,
                            attributes: ['food_id', 'observation'],
                            include: [
                                {
                                    model: Food,
                                    attributes: ['food_name', 'type']
                                }
                            ]
                        }
                    ]
                }
            ]
        });
        res.status(200).json({ user: user.Name, orders });
    } catch (error) {
        res.status(500).json({ error: 'Failed to get orders' });
    }
}


exports.getOrderbyId = async (req, res) => {
    try {
        const { order_id } = req.params;
        const order = await Order.findOne({
            where: { order_id },
            attributes: ['order_id', 'number_people', 'OrderDate', 'status', 'Horario', 'avaliar', 'createdAt'], 
            include: [
                {
                    model: Client,
                    attributes: ['name', 'indifferent'],
                    include: [
                        {
                            model: Meal,
                            attributes: ['food_id', 'observation'],
                            include: [
                                {
                                    model: Food,
                                    attributes: ['food_name', 'type']
                                }
                            ]
                        }
                    ]
                }
            ]
        });
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get order' });
    }
};


exports.update = async (req, res) => {
    try {
        const { order_id } = req.params;
        const { status } = req.body;
        const {avaliar } = req.body;
        const order = await Order.findByPk(order_id);
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        if(status){
            await order.update({ status });
        }
        
        if(avaliar){
            await order.update({ avaliar });
        }

        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update order' });
    }
}


exports.delete = async (req, res) => {
    try {
        const { order_id } = req.params;
        const order = await Order.findByPk(order_id);
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        await order.destroy();
        res.status(200).json({ message: 'Order deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete order' });
    }
}

exports.getALL = async (req, res) => {
    try {
        const orders = await Order.findAll({
            attributes: ['order_id', 'number_people', 'OrderDate', 'Status', 'Horario','avaliar', 'createdAt'],
            include: [
                {
                    model: Client,
                    attributes: ['name', 'indifferent'],
                    include: [
                        {
                            model: Meal,
                            attributes: ['food_id', 'observation'],
                            include: [
                                {
                                    model: Food,
                                    attributes: ['food_name', 'type']
                                }
                            ]
                        }
                    ]
                }
            ]
        });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get orders' });
    }
}