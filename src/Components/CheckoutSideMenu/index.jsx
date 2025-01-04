import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { X } from 'lucide-react'
import { ShoppingCartContext } from '../../Context'
import OrderCard from '../../Components/OrderCard'
import { totalPrice } from '../../utils'

import './styles.css'

const CheckoutSideMenu = () => {
  const context = useContext(ShoppingCartContext)
  const handleDelete = (id) => {
    const filteredProducts = context.cartProducts.filter(product => product.id != id)
    context.setCartProducts(filteredProducts)
    const updatedCounter = filteredProducts.reduce((sum,product)=>
      sum + product.quantity
    ,0)
    context.setCount(updatedCounter)
  }
  
  const handleCheckout = () => {
    const orderToAdd = {
      date: '01.02.23',
      products: context.cartProducts,
      totalProducts: context.count,
      totalPrice: totalPrice(context.cartProducts)
    }
    context.setOrder([...context.order, orderToAdd])
    context.setCartProducts([])
    context.setCount(0)
    context.closeCheckoutSideMenu();
  }

  return (
      <aside
        className={`${context.isCheckoutSideMenuOpen ? 'flex' : 'hidden'} 
          checkout-side-menu flex-col fixed 
          w-full md:w-[360px] 
          h-[calc(100vh-74px)] 
          top-[74px] right-0 
          border border-black rounded-lg bg-white`}>
          
          <div className='flex justify-between items-center p-4 md:p-6 border-b'>
            <h2 className='font-medium text-lg md:text-xl'>My Order</h2>
            <div>
              <X
                className='h-5 w-5 md:h-6 md:w-6 text-black cursor-pointer'
                onClick={() => context.closeCheckoutSideMenu()}/>
            </div>
          </div>

          <div className='flex-1 overflow-y-auto px-4 md:px-6'>
            {context.cartProducts.map(product => (
              <OrderCard 
                key={product.id}
                id={product.id}
                title={product.title}
                imageUrl={product.images[0]}
                price={product.price}
                quantity={product.quantity}
                handleDelete={handleDelete}
              />
            ))}
          </div>

          <div className='px-4 md:px-6 py-4 md:py-6 border-t'>
            <p className='flex justify-between items-center mb-4'>
              <span className='font-light text-base md:text-lg'>Total:</span>
              <span className='font-medium text-xl md:text-2xl'>
                ${totalPrice(context.cartProducts)}
              </span>
            </p>
            <Link to='/my-orders/last' className='block'>
              <button 
                className='bg-black py-3 text-white w-full rounded-lg 
                  text-sm md:text-base hover:bg-gray-800 transition-colors' 
                onClick={handleCheckout}>
                Checkout
              </button>
            </Link>
          </div>
      </aside>
  )
}
  
  export default CheckoutSideMenu