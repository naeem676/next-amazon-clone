import Header from "./components/Header";
import Image from 'next/image';
import { useSelector } from "react-redux";
import { selectItem, selectTotal } from "./slice/basketSlice";
import CheckoutProduct from "./components/CheckoutProduct";
import CurrencyFormat from "react-currency-formatter";
import { useSession } from "next-auth/client";

function Checkout() {
    const [session] = useSession();
    const items = useSelector(selectItem);
    const total =  useSelector(selectTotal);
    return (
        <div className='bg-gray-100'>
            <Header/>
            <main className='lg:flex max-w-screen-2xl mx-auto'>
                <div className='flex-grow m-5 shadow-sm'>
                    <Image src='https://www.junglescout.com/wp-content/uploads/2020/05/Prime-day-banner.png' alt='banner' width={1020} height={250} objectFit='contain' />
                    <div className='flex flex-col p-5 space-y-10 bg-white'>
                       <h1 className='text-3xl border-b pb-4'>Your Shopping Basket</h1>
                       {
                           items?.map((item , i)=> <CheckoutProduct
                           key={ i }
                           hasPrime={item.hasPrime}
                           rating={item.rating}
                           id={item.id} 
                           title={item.title} 
                            price={item.price} 
                          description={item.description}
                           category={item.category}
                         image={item.image}
                           />
                              
                           )
                       }
                    </div>
                </div>
                <div className='flex flex-col bg-white p-10 shadow-md'>
                    {
                        items.length > 0 && (
                            <>
                            <h2 className='whitespace-nowrap'>
                                Subtotal ({items.length}):{" "}<span className='font-bold'>
                                <CurrencyFormat
                            quantity={total} currency='USD'
                            />
                            </span>
                            </h2>
                            <button className={`button mt-2 ${!session && 'from-gray-300 to-gray-500 border-gray-200 text-gray-300'}`}>{!session ? 'Sign in to checkout' : 'Proceed to checkout'}</button>
                            </>
                        )
                    }
                </div>
            </main>
        </div>
    )
}

export default Checkout