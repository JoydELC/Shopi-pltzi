import { CircleChevronRight } from 'lucide-react';
import PropTypes from 'prop-types';

const OrdersCard = props => {
    const { totalPrice, totalProducts } = props
  
    return (
      <div className="flex justify-between items-center mb-3 border border-black rounded-lg p-4 w-80">
      <div className='flex justify-between w-full'>
        <p className='flex flex-col'>
          <span className='font-light'>01.02.23</span>
          <span className='font-light'>{totalProducts} articles</span>
        </p>
        <p className='flex items-center gap-2'>
          <span className='font-medium text-2xl'>$ {totalPrice}</span>
          <CircleChevronRight className='h-6 w-6 text-black cursor-pointer' />
        </p>
      </div>
    </div>
    )
  }
  
  export default OrdersCard

  OrdersCard.propTypes = {
      totalProducts:PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      totalPrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
  };