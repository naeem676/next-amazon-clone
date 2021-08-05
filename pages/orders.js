import moment from "moment";
import { getSession, useSession } from "next-auth/client";
import db from "../firebase";
import Header from "./components/Header";
import MyOrder from "./components/MyOrder";

function Order({ orders }) {
    
    const [session] = useSession();
    return (
        <div>
            <Header/>
            <main className='max-w-screen-xg mx-auto p-10'>
                <h1 className='text-3xl border-b mb-2 pb-1 border-yellow-400'>Your Orders</h1>
                {
                session ? (
                    <h2>{orders ? orders.length : 'x'} Orders</h2>
                ) : (
                    <h2>Please sign in to see your orders</h2>
                )
            }

            <div className='mt-5 space-y-4'>
                {
                    orders?.map(({id, amount, amountShipping, items, timestamp, images})=>
                    <MyOrder key={id} id={id} amount={amount} items={items} amountShipping={amountShipping} timestamp={timestamp} images={images} />)
                }
            </div>
            </main>
            
        </div>
    )
}

export default Order;

export async function getServerSideProps(context) {
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

    const session = await getSession(context);
    if(!session){
        return{
          props:{},
        }
    }

    const stripeOrders = await db.collection('users').doc(session.user.email)
    .collection('order').orderBy('timestamp', 'desc').get();
    

    const orders = await Promise.all(
        stripeOrders.docs.map(async (order) => ({
            id:order.id,
            amount:order.data().amount,
            amountShipping:order.data().amount_shipping,
            images:order.data().images,
            timestamp: moment(order.data().timestamp.toDate()).unix(),
            items:(
                await stripe.checkout.sessions.listLineItems(order.id, {
                    limit:100
                })
            ).data,
        }))
    );

    

    return {
        props:{
            orders,
        }
    }


}
