import React from 'react';

const Spinner = () => {
    return (
        <div className=''>
            <div className="border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-blue-600 fixed top-1/2 left-1/2 z-30" />
        </div>
    );
};

export default Spinner;