import { X } from 'lucide-react'
import PropTypes from 'prop-types';

const OrderCard = ({ id, title, imageUrl, price, quantity = 1, handleDelete }) => {
    let renderXMarkIcon
  if (handleDelete) {
    renderXMarkIcon = <X 
    className='h-6 w-6 text-black cursor-pointer hover:text-red-500 transition-colors' 
    onClick={() => handleDelete(id)}
/>
  }
    return (
        <div className="flex justify-between items-center mb-3">
            <div className='flex items-center gap-2'>
                <figure className='w-20 h-20'>
                    <img 
                        className='w-full h-full rounded-lg object-cover' 
                        src={imageUrl} 
                        alt={title} 
                        onError={(e) => { e.target.src = '/placeholder-image.png' }}
                    />
                </figure>
                <p className='text-sm font-medium'>Qty: {quantity}</p>
                <p className='text- font-light'>{title}</p>
            </div>
            <div className='flex items-center gap-2'>
                <p className='text-lg font-medium px-2'>${price}</p>
                {renderXMarkIcon}
            </div>
        </div>
    )
}

OrderCard.propTypes = {
    id:PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    quantity: PropTypes.number,
    handleDelete: PropTypes.func.isRequired
};

OrderCard.defaultProps = {
    quantity: 1
};

export default OrderCard
