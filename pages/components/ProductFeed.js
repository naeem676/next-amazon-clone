import Image from "next/image"
import Product from "./Product"

function ProductFeed({ products }) {


    return (
        <div className='grid grid-flow-row-dense bg-gray-300 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52 mx-auto'>
            {
                products.slice(0, 4).map(({id, _id, price,  title, description, category, image}) => <Product key={_id} 
                id={id} title={title}  price={price} 
                description={description} category={category}
                 image={image}  />)
            }
            <Image className='md:col-span-full' src="https://media-exp1.licdn.com/dms/image/C561BAQFjHL9EU0Yvvg/company-background_10000/0/1619644672652?e=2159024400&v=beta&t=XuCp_lpXR76nK6AAfdrGwZgEVPrlT_sRF1-dZZhw8nE" alt=""/>
            <div className='md:col-span-2'>
                {
                    products.slice(4, 5).map(({id, _id, price,  title, description, category, image}) => <Product key={_id} 
                    id={id} title={title}  price={price} 
                    description={description} category={category}
                    image={image}  />)
                }
            </div>
            {
                products.slice(5, products.length).map(({id, _id, price,  title, description, category, image}) => <Product key={_id} 
                id={id} title={title}  price={price} 
                description={description} category={category}
                 image={image}  />)
            }
        </div>
    )
}

export default ProductFeed
