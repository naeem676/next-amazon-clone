import { StarIcon } from "@heroicons/react/solid";
import Image from "next/image";
import CurrencyFormat from "react-currency-formatter";
import { useDispatch } from "react-redux";
import { addToBasket, removeFromBasket } from "../../slice/basketSlice";

function CheckoutProduct({id, hasPrime, rating, price, title, description, category, image}) {

    const dispatch = useDispatch();
    

    const addToItem = () => {
        const product= {id, hasPrime, rating, price, title, description, category, image};
       dispatch(addToBasket(product))
    }
    const removeItem = () => {
        dispatch(removeFromBasket({id}))
    }
    return (
        <div className='grid grid-cols-5'>
         <Image src={image} alt='product' width
         ={200} height={200} objectFit='contain' />

         <div className='col-span-3 mx-5'>
             <p>{title}</p>
             <div className='flex'>
                 { Array(rating).fill().map(( _, i)=>
                     <StarIcon key={i} className='h-5 text-yellow-500' />
                 )}
             </div>
             <p className='text-xs my-2 line-clamp-3'>{description}</p>
             <CurrencyFormat
               quantity={price} 
               currency='EUR'/>
               {
                hasPrime && <div className='flex items-center space-x-2 mt-5 mb-2'>
                    <Image 
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Amazon_Prime_Logo.svg/1200px-Amazon_Prime_Logo.svg.png" width={100} height={20} objectFit='contain' alt=""/>
                    <p className='text-xs text-gray-500'>FREE Next-day Delivery</p>
                </div>
            }
         </div>
         <div className='flex flex-col space-y-2 my-auto justify-self-end'>
            <button onClick={addToItem} className='button'>Add to Basket</button>
            <button onClick={removeItem} className='button'>Remove from basket</button>
         </div>
        </div>
    )
}

export default CheckoutProduct
