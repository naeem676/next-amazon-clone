import moment from 'moment';
import Image  from 'next/dist/client/image';
import CurrencyFormat from 'react-currency-formatter';
function MyOrder({id, amount, amountShipping, items, timestamp, images}) {
    return (
        <div className='relative border rounded-md'>
            <div className='flex items-center space-x-10 p-5 bg-gray-100 text-sm text-gray-600'>
                <div>
                    <p className='font-bold text-xs'>ORDER PLACED</p>
                    <p>{moment.unix(timestamp).format('DD MM YYYY')}</p>
                </div>
                <div>
                    <p className='text-xs font-bold'>TOTAL</p>
                    <p>
                        <CurrencyFormat quantity={amount} currency='USD' /> - Next Day Delivery{" "}
                        <CurrencyFormat quantity={amountShipping} currency='EUR'/>
                    </p>
                </div>
                <p className='text-xs whitespace-nowrap sm:text-xl self-end flex-1 text-right text-blue-500'>{items?.length} items</p>
                <p className='absolute top-2 right-2 w-40 lg:w-72 truncate text-xs whitespace-nowrap'>
                    ORDER # {id}

                </p>
            </div>

            <div className='p-5 sm:p-10'>
                <div className='flex space-x-6 overflow-x-auto'>
                    {
                        images.map((image, i)=> 
                        (<Image  key={i}
                            className='h-20 sm:h-32' 
                            src={image} width={150} height={150}  objectFit='contain'
                             alt="product"/>))
                    }
                </div>
            </div>
        
        </div>
    )
}

export default MyOrder
