import { useContext } from 'react'
import { X } from 'lucide-react'
import { ShoppingCartContext } from '../../Context'
import './styles.css'

const ProductDetail = () => {
  const context = useContext(ShoppingCartContext)

  const isValidProduct = context.productToShow && 
                        context.productToShow.images && 
                        context.productToShow.images.length > 0

  return (
    <aside className={`${context.isProductDetailOpen ? 'flex' : 'hidden'} 
      product-detail flex-col fixed 
      w-full h-[calc(100vh-74px)] md:w-[360px] 
      top-[74px] md:right-0 
      border border-black rounded-lg bg-white
      overflow-y-auto`}>
      <div className='flex justify-between items-center p-4 md:p-6'>
        <h2 className='font-medium text-lg md:text-xl'>Detail</h2>
        <div>
          <X className='h-5 w-5 md:h-6 md:w-6 text-black cursor-pointer'
             onClick={() => context.closeProductDetail()}/>
        </div>
      </div>
      {isValidProduct ? (
        <>
          <figure className='px-4 md:px-6'>
            <img
              className='w-full h-auto max-h-[300px] md:max-h-[400px] object-contain rounded-lg'
              src={context.productToShow.images[0]}
              alt={context.productToShow.title || 'Product Image'} 
            />
          </figure>
          <p className='flex flex-col p-4 md:p-6'>
            <span className='font-medium text-xl md:text-2xl mb-2'>
              ${context.productToShow.price || 'N/A'}
            </span>
            <span className='font-medium text-base md:text-md'>
              {context.productToShow.title || 'No Title'}
            </span>
            <span className='font-light text-sm'>
              {context.productToShow.description || 'No description available'}
            </span>
          </p>
        </>
      ) : (
        <div className='p-4 md:p-6 text-center text-gray-500'>
          No product selected
        </div>
      )}
    </aside>
  )
}
  
  export default ProductDetail