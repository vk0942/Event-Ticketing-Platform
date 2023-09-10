import { useState, useEffect } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import { Card } from 'flowbite-react';

const Profile = () => {

    const [userDetails, setUserDetails] = useState({});

    const { signedin, user, dispatch } = useAuthContext();

    useEffect(() => {
        if (signedin) {
          setUserDetails(user.user);
        }
    }, [signedin, user, dispatch]);

    return (
        <div className='container bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% ...'>

            <Card
                imgAlt="Meaningful alt text for an image that is not purely decorative"
                imgSrc="/images/blog/image-1.jpg"
                className='w-1/2'
            >
                <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                    <p> Username - {userDetails.username} </p> 
                </h5>
                <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                    <p> Email - {userDetails.email} </p> 
                </h5>
                <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                    <p> First Name - {userDetails.fname} </p> 
                </h5>
                <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                    <p> Last Name - {userDetails.lname} </p>
                </h5>
                <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                    <p> DOB - {userDetails.dob} </p> 
                </h5>

                
                    
                {/* <p className="font-normal text-gray-700 dark:text-gray-400">
                            <p>
                            Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
                            </p>
                        </p> */}    
            </Card>

        </div>
    );
}
 
export default Profile;