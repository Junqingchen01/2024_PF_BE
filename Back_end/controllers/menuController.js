const { Weekday, Menu, MenuItem} = require('../models/weekday.js');
const { Food } = require('../models/food.js');


exports.getMenuByWeekday = async (req, res) => {
  try {
    const { type_day, } = req.params;
    const weekday = await Weekday.findOne({ where: { type_day } });

    if (!weekday) {
      return res.status(404).json({ error: 'Weekday not found for the given type_day' });
    }

    const menus = await Menu.findAll({ where: { weekday_id: weekday.weekday_id },
       include: { model: MenuItem, as: 'menuItems', attributes: ['quantity'],
       include: { model: Food, as: 'food', attributes: ['food_id','food_name'] } } });
       
    res.status(200).json({ data: menus  });
  } catch (error) {
    console.error('Error getting menu by weekday id:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getMenuAndType= async (req, res) => {
  try {
    const { type_day, menu_type } = req.params;
    const weekday = await Weekday.findOne({ where: { type_day } });

    if (!weekday) {
      return res.status(404).json({ error: 'Weekday not found for the given type_day' });
    }

    const menus = await Menu.findAll({ 
      where: { 
        weekday_id: weekday.weekday_id,
        menu_type 
      },
      include: { 
        model: MenuItem, 
        as: 'menuItems', 
        attributes: ['quantity'],
        include: { 
          model: Food, 
          as: 'food', 
          attributes: ['food_id','food_name'] 
        } 
      } 
    });
       
    res.status(200).json({ data: menus });
  } catch (error) {
    console.error('Error getting menu by weekday id:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


exports.createMenuByWeekday = async (req, res) => {
  try {
      const { type_day } = req.params;

      const weekday = await Weekday.findOne({ where: { type_day } });
      if (!weekday) {
          return res.status(404).json({ error: 'Weekday not found' });
      }

      const { menu_type, maximum_capacity } = req.body;

      // verifica se o menu já existe para evidar o menu com igual menu_type
      const existingMenu = await Menu.findOne({ 
        where: { 
          menu_type,
          weekday_id: weekday.weekday_id
        } 
      });
      if (existingMenu) {
        return res.status(400).json({ error: `${menu_type} Menu already exists` });
      }
      
      const newMenu = await Menu.create({
          menu_type,
          maximum_capacity,
          weekday_id: weekday.weekday_id, 
      });

      console.log('New menu created:', newMenu.toJSON());
      res.status(201).json({ message: 'New menu created', data: newMenu.toJSON() });
  } catch (error) {
      console.error('Error creating menu by weekday id:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
};

exports.createMenuItemByMenuId = async (req, res) => {
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
  

exports.updateMenuItemAfterOrder = async (req, res) => {
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




  
