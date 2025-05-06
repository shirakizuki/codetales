import Navbar from '@/components/Navbar';
import dinosaurImage from '../assets/dinosaur.png';
import { Footer } from '@/components/Footer';

export const ErrorPage = () => {
    return (
        <>
            <Navbar />
            <div className="flex h-screen bg-codetales-dark">
                <div className="flex flex-col justify-center items-center text-white w-1/2 p-8">
                    <div className="text-5xl sm:text-7xl font-bold">PAGE</div>
                    <div className="text-5xl sm:text-7xl font-bold">NOT</div>
                    <div className="text-5xl sm:text-7xl font-bold">FOUND</div>
                    <p className="mt-4 text-center text-sm sm:text-base">
                        Looks like you followed the wrong path in the multiverse.
                    </p>
                </div>

                <div className="flex flex-col justify-center items-center bg-white w-1/2 relative">
                    <div className="text-9xl sm:text-[12rem] font-bold text-black">4</div>
                    <div className="text-9xl sm:text-[12rem] font-bold text-black">0</div>
                    <div className="text-9xl sm:text-[12rem] font-bold text-black">4</div>

                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
                        <img
                            src={dinosaurImage}
                            alt="T-Rex"
                            className="w-64 sm:w-80 md:w-96"
                        />
                    </div>
                </div>
            </div>
            <Footer />
        </>

    );
};
