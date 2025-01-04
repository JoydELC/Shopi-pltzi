/**
* This function calculates total price of a new order
 * @param {Array} products cartProduct: Array of Objects
 * @returns {numer} Total price
 */
export const totalPrice = (products) => {
    return products.reduce((sum, product) => sum + (product.price*product.quantity), 0)
} 