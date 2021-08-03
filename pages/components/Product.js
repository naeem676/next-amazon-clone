import { StarIcon } from "@heroicons/react/solid";
import Image from "next/image";
import { useState } from "react";
import Currency from 'react-currency-formatter';
import { useDispatch } from "react-redux";
import { addToBasket } from "../../slice/basketSlice";



function Product({id, price, title, description, category, image}) {

    const dispatch = useDispatch();



    const [rating] = useState(
        Math.floor(Math.random() * 5) + 1
    );
    const [hasPrime] = useState(
        Math.random() < 0.5
    )
    const addToItem = () =>{
        const product = {id, rating, hasPrime, price, title, description, category, image};
        dispatch(addToBasket(product))
    }
    return (
        <div className='relative flex flex-col m-5 bg-white z-30 p-10'>
            <p className='absolute top-2 right-2 text-xs italic text-gray-400'>{category}</p>

            <Image src={image} height={200} width={200} 
            objectFit='contain' alt="product" />
            <h4 className='my-3'>{title}</h4>
            <div className='flex'>
                {
                    Array(rating)
                    .fill()
                    .map(( _, i) =>
                        <StarIcon className='h-5 text-yellow-500' key={StarIcon} />
                    )
                }
            </div>
            <p className='text-xs my-2 line-clamp-2'>{description}</p>

            <div className='mb-5'>
            <Currency
               quantity={price} 
               currency='USD'/>
            </div>
            {
                hasPrime && <div className='flex items-center space-x-2 mt-5 mb-2'>
                    <Image 
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Amazon_Prime_Logo.svg/1200px-Amazon_Prime_Logo.svg.png" width={100} height={20} objectFit='contain' alt=""/>
                    <p className='text-xs text-gray-500'>FREE Next-day Delivery</p>
                </div>
            }
            <button onClick={addToItem} className='mt-auto button'>Add to Basket</button>
        </div>
    )
}

export default Product
