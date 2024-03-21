const { Weekday, Menu, MenuItem} = require('../models/weekday.js');
const { Food } = require('../models/food.js');


const getMenuByWeekdayId = async (req, res) => {
  try {
    const { weekday_id } = req.params;
    const weekday = await Weekday.findByPk(weekday_id, {
      include: [
        {
          model: Menu,
          as: 'menus',
          attributes: ['menu_type', 'maximum_capacity'],
          include: [
            {
              model: MenuItem,
              as: 'menuItems',
              include: [
                {
                  model: Food,
                  as: 'food',
                  attributes: ['food_name'] // mostar apenas o nome da comida
                }
              ]
            }
          ]
        }
      ]
    });

    if (!weekday) {
      return res.status(404).json({ error: 'Weekday not found' });
    }

    res.status(200).json({ data: weekday });
  } catch (error) {
    console.error('Error getting menu by weekday id:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

  
const createMenuByWeekdayId = async (req, res) => {
    try {
      const { weekday_id } = req.params;
      const weekday = await Weekday.findByPk(weekday_id);
      if (!weekday) {
        res.status(404).json({ error: `Weekday not found` });
        return;
      }
  
      const { menu_type, maximum_capacity } = req.body;
  
      // vertifica se o menu já existe
      const existingMenu = await Menu.findOne({ where: { menu_type } });
      if (existingMenu) {
        res.status(400).json({ error: `${menu_type} Menu already exists` });
        return;
      }
  
      // criar
      const newMenu = await Menu.create({
        menu_type,
        maximum_capacity,
        weekday_id: weekday_id,
      });
  
      console.log('New menu created:', newMenu.toJSON());
      res.status(201).json({ message: 'New menu created', data: newMenu.toJSON() });
    } catch (error) {
      console.error('Error creating menu by weekday id:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
};


const createMenuItemByMenuId = async (req, res) => {
    try {
      const { menu_id } = req.params;
      const { items } = req.body;
      
      // verifica se o menu existe
      const menu = await Menu.findByPk(menu_id);
      if (!menu) {
        return res.status(404).json({ error: 'Menu not found' });
      }
  
      // limpar todos os itens de menu existentes
      await MenuItem.destroy({ where: { menu_id } });
  
      // criar novos itens de menu
      const createdItems = [];
      let itemIdCounter = 1; // reiniciar item_id
      for (const item of items) {
        const { food_id, quantity } = item;
        // verifica se a comida existe
        const food = await Food.findByPk(food_id);
        if (!food) {
          return res.status(400).json({ error: `Food with ID ${food_id} not found` });
        }
        // reiniciar item_id
        const menuItem = await MenuItem.create({
          menu_id,
          item_id: itemIdCounter++, 
          food_id,
          quantity
        });
        createdItems.push(menuItem.toJSON());
      }
  
      console.log('New menu items created:', createdItems);
      // repor o maximo de capacidade
      await menu.update({ maximum_capacity: 40 });
  
      return res.status(201).json({ message: 'New menu items created', data: createdItems });
    } catch (error) {
      console.error('Error creating menu items by menu id:', error.message);
      return res.status(500).json({ error: error.message });
    }
};
  

const updateMenuItemAfterOrder = async (req, res) => {
  try {
    const { menu_id } = req.params;
    const { numberOfPeople, orderedItems } = req.body;

    // pesquisa menu
    const menu = await Menu.findByPk(menu_id, { include: 'menuItems' });
    if (!menu) {
      return res.status(404).json({ error: 'Menu not found' });
    }

    // atualiza a quantidade de itens de menu
    for (const orderedItem of orderedItems) {
      const menuItem = menu.menuItems.find(item => item.food_id === orderedItem.food_id);
      if (!menuItem) {
        return res.status(400).json({ error: `Menu item with food ID ${orderedItem.food_id} not found in menu` });
      }
      // diminuir a quantidade de itens de menu
      menuItem.quantity -= orderedItem.quantity;
      await menuItem.save();
    }

    // diminuir a capacidade máxima do menu
    menu.maximum_capacity -= numberOfPeople;
    await menu.save();

    res.status(200).json({ message: 'Menu updated successfully' });
  } catch (error) {
    console.error('Error updating menu after order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};




  
module.exports = { getMenuByWeekdayId, createMenuByWeekdayId ,createMenuItemByMenuId,updateMenuItemAfterOrder};  