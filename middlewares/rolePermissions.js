const AccessControl = require('accesscontrol');
const ac = new AccessControl();

// Customer Role
ac.grant('customer')
    .readOwn('profile') // Can read their profile
    .updateOwn('profile') // Can update their profile
    .createOwn('order') // Can create an order
    .readOwn('order') // Can read their orders
    .updateOwn('order'); // Can update their orders

// Owner Role
ac.grant('owner')
    .extend('customer') // Inherits permissions from customer
    // Add specific permissions for the owner role
    // Can create a store
    // Can read their stores
    // Can update their stores
    // Can delete their stores
    // Can read their orders
    // Can add food items to their store
    // Can read food items in their store
    // Can update food items in their store
    // Can delete food items in their store
    .createOwn('store')
    .readOwn('store')
    .updateOwn('store')
    .deleteOwn('store')
    .readOwn('order')
    .createOwn('foodItem')
    .readOwn('foodItem')
    .updateOwn('foodItem')
    .deleteOwn('foodItem');
    


// Restaurant Role
ac.grant('restaurant')
    .extend('owner') // Inherits permissions from owner
    // Add specific permissions for the restaurant role

// DeliveryMan Role
ac.grant('deliveryMan')
    .readAny('order') // Can read any order
    // Add specific permissions for the deliveryMan role

// Admin Role
ac.grant('admin')
    .extend('customer') // Inherits permissions from customer
    .extend('owner') // Inherits permissions from owner
    .extend('restaurant') // Inherits permissions from restaurant
    .extend('deliveryMan') // Inherits permissions from deliveryMan
    .readAny('profile') // Can read any profile
    .updateAny('profile') // Can update any profile
    .deleteAny('profile'); // Can delete any profile
    // Add more permissions as needed for admin

module.exports = ac;
