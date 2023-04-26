import React from 'react';
const Loading = () => {
    return (
            <div className='absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col gap-5 justify-center sm:w-fit w-[85%] mx-auto'>
                <div class="animate-loading border-t-[#3498db] ease-linear rounded-full border-4 border-t-4 border-gray-400 h-12 w-12 mx-auto mb-4"></div>
                <h2 class="w-fit mx-auto text-xl font-semibold text-gray-600">Loading...</h2>
                <p class="w-fit text-center text-sm text-gray-600 mx-auto">This may take a few seconds, please don't close this page.</p>
            </div>
    );
}

export default Loading;
