import { Carousel } from 'flowbite-react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        
        <div className='home bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% ...'>

            <Carousel slideInterval={3000} className='w-full h-2/3'>
                <img
                    alt="..."
                    src="https://flowbite.com/docs/images/carousel/carousel-1.svg"
                />
                <img
                    alt="..."
                    src="https://flowbite.com/docs/images/carousel/carousel-2.svg"
                />
                <img
                    alt="..."
                    src="https://flowbite.com/docs/images/carousel/carousel-3.svg"
                />
                <img
                    alt="..."
                    src="https://flowbite.com/docs/images/carousel/carousel-4.svg"
                />
                <img
                    alt="..."
                    src="https://flowbite.com/docs/images/carousel/carousel-5.svg"
                />
            </Carousel>


        </div>


    );
}
 
export default Home;