import React from 'react';
import Image from 'next/image';
import { SearchIcon, MenuIcon, ShoppingCartIcon } from '@heroicons/react/outline';
import { signIn, signOut, useSession } from 'next-auth/client';
import { useRouter } from 'next/dist/client/router';
import { useSelector } from 'react-redux';
import { selectItem } from '../../slice/basketSlice';

function Header() {

    const [session] = useSession();
    const router = useRouter();
    const items = useSelector(selectItem);
    return (
        <header>
            <div className='flex items-center bg-black p-1 flex-grow py-2'>
                <div className='mt-2 flex items-center flex-grow sm:flex-grow-0'>
                    <Image
                    onClick={()=> router.push('/')}
                    src='https://www.mabaya.com/wp-content/uploads/2019/10/amazon_PNG25.png' width={150} height={40} objectFit='contain' className='cursor-pointer' alt='logo'
                    />
                </div>

                <div className='hidden sm:flex items-center h-10 rounded-md flex-grow bg-yellow-400 hover:bg-yellow-500 cursor-pointer'>
                    <input className='p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none' readOnly  type="text" placeholder='Search' name="" value=""/>
                          <SearchIcon className='h-12 p-4' />
                </div>
                <div className="flex text-white items-center text-xs space-x-6 mx-6 whitespace-nowrap">
                        <div onClick={!session ? signIn : signOut} className='link'>
                              <p >
                                  { session ?  `Hello, ${session.user.name}` : "Sign in" }
                                  </p> 
                              <p  className='font-extrabold md:text-sm'>Account & Lists</p>       
                         </div>
                        <div onClick={()=> router.push('/orders')} className='link'>
                                <p>Return</p>
                                <p className='font-extrabold md:text-sm'>&Orders</p>
                        </div>
                         <div onClick={()=> router.push('/Checkout')} className='relative link flex items-center '>
                             <span className='absolute top-0 right-0 md:right-10 h-4 bg-yellow-400 text-center rounded-full text-black font-bold'>
                                 {items.length}
                                 </span>
                                <ShoppingCartIcon className='h-10' />
                                <p className='hidden md:inline font-extrabold md:text-sm mt-2'>Basket</p>
                         </div>
                </div>
            </div>

            {/* bottom div */}
            <div className='flex items-center space-x-3 p-2 pl-6 bg-gray-800 text-white text-sm'>
                <p className='link flex items-center'>
                    <MenuIcon className='h-6 mr-1'/>
                    All
                </p>
                <p className='link'>Prime Video</p>
                <p className='link'>Amazon buisness</p>
                <p className='link'>Today&apos;s Deals</p>
                <p className='link hidden lg:inline-flex'>Electronics</p>
                <p className='link hidden lg:inline-flex'>Food & Grocery</p>
                <p className='link hidden lg:inline-flex'>Prime</p>
                <p className='link hidden lg:inline-flex'>Buy again</p>
                <p className='link hidden lg:inline-flex'>Shopper Toolkit</p>
                <p className='link hidden lg:inline-flex'>Health & Personal Care</p>
            </div>
           
        </header>
    )
}

export default Header
