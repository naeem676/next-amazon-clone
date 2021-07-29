import Image from 'next/image';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

function Banner() {
    return (
        <div className='relative'>
            <Carousel autoPlay infiniteLoop showStatus={false} showIndicators={false} showThumbs={false} interval={5000} >
            <div>
              <img className='h-96' loading='lazy' src='https://images-eu.ssl-images-amazon.com/images/G/31/gateway-2015/amazonshop/Desktop_Banner_Recruitment_Website.jpg'  />
                
            </div>
             <div>
             <img className='h-96' loading='lazy' src='https://images.krisshop.com/cms/WNxnMaubaHErRpqDYffK-VSFYJ7J0gHKgrIpgVfLvx8=/0x0/media/gene-cms/m/a/main_banner_desktop_2.jpg'  />
             </div>
             <div>
             <img className='h-96' loading='lazy' src='https://i.pinimg.com/originals/2e/52/b0/2e52b0d7a32d8494d29353d4559cc908.jpg'  />
             </div>

            </Carousel>
        </div>
    )
}

export default Banner