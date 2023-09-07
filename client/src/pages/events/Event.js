
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Carousel, Card } from 'flowbite-react'; 

const Event = () => {

    const [event, setEvent] = useState('');
    const [errors, setErrors] = useState('');

    const { id } = useParams();

    useEffect(() => {

        const eventDetails = async () => {
            const response = await fetch(`/events/${id}`, {
                method: 'GET',
                headers: { 'Content-Type' : 'application/json' }
            });
            const data = await response.json();

            if(data.event){
                setEvent(data.event);
            }
            else{
                setErrors(data.message);
            }
        }

        eventDetails();

    }, []);


    return (
        
        <div className="single-event bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% ..."> 

            {event && 

                <div className='w-full flex flex-col items-center justify-evenly'> 
                    <Carousel slideInterval={3000} className='w-3/4 h-96 mt-8'>
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

                            
                    <Card
                        imgAlt="Meaningful alt text for an image that is not purely decorative"
                        imgSrc="/images/blog/image-1.jpg"
                        className='w-1/2'
                    >
                        <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                            <p> {event.title} </p> 
                        </h5>
                        <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                            <p> Starts on {event.start} </p> 
                        </h5>
                        <h5 className="text-lg font-medium tracking-tight text-gray-900 dark:text-white">
                            <p> Ends on {event.end} </p> 
                        </h5>
                        <h5 className="text-lg font-medium tracking-tight text-gray-900 dark:text-white">
                            <p> Registration Starts on {event.reg_start} </p>
                        </h5>
                        <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                            <p> Registration Ends on {event.reg_end} </p> 
                        </h5>
                        <h5 className="text-lg font-medium tracking-tight text-gray-900 dark:text-white">
                            <p> Venue - {event.venue} </p> 
                        </h5>
                        <h5 className="text-lg font-medium tracking-tight text-gray-900 dark:text-white">
                            <p> Description - {event.description} </p> 
                        </h5>        
                            
                        {/* <p className="font-normal text-gray-700 dark:text-gray-400">
                                    <p>
                                    Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
                                    </p>
                                </p> */}    
                    </Card>

                </div>
                  
            }

            {errors && 
                <div className='container'>
                    <div className='font-bold text-3xl'> The event you are looking for doesn't exist :/. Make Sure the URL is correct </div>
                </div> 
            }
            

        </div>
    );
}
 
export default Event;