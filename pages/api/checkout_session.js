const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default  async function handler  (req, res) {
    const {items, email} = req.body;
    const transfromedItems = items.map(item => ({
        description:item.description,
        quantity:1,
        price_data:{
            currency:'usd',
            unit_amount:item.price * 100,
            product_data:{
                name:item.title,
                images:[item.image],
            },
        },
    }));

    const session = await stripe.checkout.sessions.create({
        payment_method_types:['card'],
        shipping_rates:[
            'shr_1JKkdBFz4lVH0YokjlFKNayt'],
        shipping_address_collection:{
            allowed_countries:['GB', 'US', "CA", "BD"],
        },
        line_items:transfromedItems,
        mode:'payment',
        success_url:`${process.env.HOST}/Success`,
        cancel_url:`${process.env.HOST}/Checkout`,
        metadata:{
            email,
            images:JSON.stringify(items.map(item=> item.image)),
        }
    });
    res.status(200).json({id:session.id});
};

// export default async function handler(req, res) {
//   if (req.method === 'POST') {
//     try {
//       // Create Checkout Sessions from body params.
//       const session = await stripe.checkout.sessions.create({
//         payment_method_types: [
//           'card',
//         ],
//         line_items: [
//           {
//             // TODO: replace this with the `price` of the product you want to sell
//             price: '{{PRICE_ID}}',
//             quantity: 1,
//           },
//         ],
//         mode: 'payment',
//         success_url: `${req.headers.origin}/?success=true&session_id={CHECKOUT_SESSION_ID}`,
//         cancel_url: `${req.headers.origin}/?canceled=true`,
//       });

//       res.redirect(303, session.url);
//     } catch (err) {
//       res.status(err.statusCode || 500).json(err.message);
//     }
//   } else {
//     res.setHeader('Allow', 'POST');
//     res.status(405).end('Method Not Allowed');
//   }
// }
