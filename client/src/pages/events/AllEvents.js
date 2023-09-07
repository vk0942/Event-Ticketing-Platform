
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card } from 'flowbite-react';

const AllEvents = () => {

    const [events, setEvents] = useState('');

    useEffect(() => {

        const getEvents = async () => {
            const response = await fetch('/events/', {
                method: 'GET',
                headers: { 'Content-Type' : 'application/json' }
            });

            const data = await response.json();

            setEvents(data.events);
        }

        getEvents();

    });


    return (

        <div className="container bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% ...">

            {events && events.map(event => (
                <div>
                    <Card
                        imgAlt="Meaningful alt text for an image that is not purely decorative"
                        imgSrc="/images/blog/image-1.jpg"
                    >
                        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            <p> <Link to={'/event/' + event._id}> {event.title} </Link> </p>
                        </h5>
                        <p className="font-normal text-gray-700 dark:text-gray-400">
                            <p>
                            Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
                            </p>
                        </p>
                    </Card>
                 
                    
                </div>
            ))}

        </div>


    );
}
 
export default AllEvents;