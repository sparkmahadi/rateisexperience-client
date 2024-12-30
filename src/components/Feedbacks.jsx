import React, { useEffect, useState } from 'react';
import FeedbacksDisplay from './FeedbacksDisply';
import Spinner from './Spinner/Spinner';

const Feedbacks = () => {
    const [loading, setLoading] = useState(true);
    const [feedbacks, setFeedbacks] = useState([]);
    const [refetch, setRefetch] = useState(false);
    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/feedback/all`);
                const data = await response.json();
                console.log(data);
                setFeedbacks(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching feedbacks:', error);
                setLoading(false);
            }
        };

        fetchFeedbacks();
    }, [refetch]);

    if(loading) return <Spinner/>

    return (
        <div className='max-w-6xl mx-auto'>
            <h3 className='text-3xl'>Total Number of Feedbacks : {feedbacks?.length}</h3>
            <FeedbacksDisplay data={feedbacks} setRefetch={setRefetch}/>
        </div>
    );
};

export default Feedbacks;