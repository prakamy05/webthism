exports.up = (pgm) => {
  pgm.createExtension('pgcrypto', { ifNotExists: true });

  pgm.createTable('users', {
    id: {
      type: 'uuid',
      primaryKey: true,
      default: pgm.func('gen_random_uuid()')
    },
    name: {
      type: 'varchar(100)',
      notNull: true
    },
    email: {
      type: 'varchar(255)',
      unique: true,
      notNull: true
    },
    password_hash: {
      type: 'text',
      notNull: true
    },
    role: {
      type: 'varchar(20)',
      default: 'customer'
    },
    created_at: {
      type: 'timestamp',
      default: pgm.func('current_timestamp')
    }
  });

  pgm.createTable('restaurants', {
    id: {
      type: 'uuid',
      primaryKey: true,
      default: pgm.func('gen_random_uuid()')
    },
    name: {
      type: 'varchar(255)',
      notNull: true
    },
    description: {
      type: 'text'
    },
    address: {
      type: 'text',
      notNull: true
    },
    phone: {
      type: 'varchar(20)'
    }
  });

  pgm.createTable('menus', {
    id: {
      type: 'uuid',
      primaryKey: true,
      default: pgm.func('gen_random_uuid()')
    },
    restaurant_id: {
      type: 'uuid',
      references: 'restaurants(id)',
      onDelete: 'cascade'
    },
    title: {
      type: 'varchar(100)',
      notNull: true
    }
  });

  pgm.createTable('menu_items', {
    id: {
      type: 'uuid',
      primaryKey: true,
      default: pgm.func('gen_random_uuid()')
    },
    menu_id: {
      type: 'uuid',
      references: 'menus(id)',
      onDelete: 'cascade'
    },
    name: {
      type: 'varchar(255)',
      notNull: true
    },
    description: {
      type: 'text'
    },
    price: {
      type: 'numeric(10,2)',
      notNull: true
    },
    is_available: {
      type: 'boolean',
      default: true
    }
  });

  pgm.createTable('orders', {
    id: {
      type: 'uuid',
      primaryKey: true,
      default: pgm.func('gen_random_uuid()')
    },
    user_id: {
      type: 'uuid',
      references: 'users(id)'
    },
    restaurant_id: {
      type: 'uuid',
      references: 'restaurants(id)'
    },
    status: {
      type: 'varchar(20)',
      default: 'pending'
    },
    total_price: {
      type: 'numeric(10,2)'
    }
  });

  pgm.createTable('order_items', {
    id: {
      type: 'uuid',
      primaryKey: true,
      default: pgm.func('gen_random_uuid()')
    },
    order_id: {
      type: 'uuid',
      references: 'orders(id)',
      onDelete: 'cascade'
    },
    menu_item_id: {
      type: 'uuid',
      references: 'menu_items(id)'
    },
    quantity: {
      type: 'integer',
      notNull: true
    },
    item_price: {
      type: 'numeric(10,2)',
      notNull: true
    }
  });

  pgm.createTable('reservations', {
    id: {
      type: 'uuid',
      primaryKey: true,
      default: pgm.func('gen_random_uuid()')
    },
    user_id: {
      type: 'uuid',
      references: 'users(id)'
    },
    restaurant_id: {
      type: 'uuid',
      references: 'restaurants(id)'
    },
    reservation_time: {
      type: 'timestamp',
      notNull: true
    },
    guests: {
      type: 'integer',
      notNull: true
    },
    status: {
      type: 'varchar(20)',
      default: 'booked'
    }
  });
};

exports.down = (pgm) => {
  pgm.dropTable('reservations');
  pgm.dropTable('order_items');
  pgm.dropTable('orders');
  pgm.dropTable('menu_items');
  pgm.dropTable('menus');
  pgm.dropTable('restaurants');
  pgm.dropTable('users');
};
