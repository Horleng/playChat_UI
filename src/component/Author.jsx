import React from 'react';

const Author = () => {
    return (
        <>
                <h1 className='font-bold text-xl mt-4'>Author</h1>
                <hr className='border-2'/>
            <div className='pt-1 pb-16 h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-600'>
                <img src="https://thumbs.dreamstime.com/z/golden-retriever-dog-wearing-eye-glasses-lying-down-computer-laptop-blue-cup-coffee-sleepy-171768356.jpg" alt="" 
                className='mt-5 mx-auto w-[96%] transition-all hover:scale-x-[1.02] rounded-lg'/>
                <img src="https://media.istockphoto.com/id/1355984042/photo/dog-working-from-home-drinking-coffee.jpg?b=1&s=170667a&w=0&k=20&c=hPoOY0Bkp_hRjhrRTLxNf4gywG-E2-nmMCuk4S-kUaI=" alt="" 
                className='mt-5 mx-auto w-[96%] transition-all hover:scale-x-[1.02] rounded-lg'/>
                <img src="https://images2.minutemediacdn.com/image/upload/c_fill,w_720,ar_16:9,f_auto,q_auto,g_auto/shape/cover/sport/650143-gettyimages-1219240095-0b49bbf16eae5ae2d2705426c9d119ef.jpg" alt="" 
                className='mt-5 mx-auto w-[96%] transition-all hover:scale-x-[1.02] rounded-lg'/>
                <img src="https://images.unsplash.com/photo-1583336663277-620dc1996580?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZG9nJTIwY2xvdGhlc3xlbnwwfHwwfHw%3D&w=1000&q=80" alt="" 
                className='mt-5 mx-auto w-[96%] transition-all hover:scale-x-[1.02] rounded-lg'/>
            </div>
        </>
    );
}

export default Author;
