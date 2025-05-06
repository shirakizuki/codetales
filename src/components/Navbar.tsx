import { assets } from "@/lib/assets"
import { Link } from "react-router-dom";
import { useState } from "react";
import { cn } from "@/lib/utils";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="w-full bg-gray-0 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-19 shadow-[0px_4px_13.5px_0px_#00000025]">
            <div className="flex items-center justify-between h-full px-4 md:px-8 lg:px-16 py-4">
                {/* Logo and Title */}
                <Link to="/" className="text-codetales-white hover:text-codetales-pink transition duration-300">
                    <div className="flex items-center space-x-2">
                        <img src={assets.images.codetalesLogo} alt="Logo" className="h-9 w-9 sm:h-10 sm:w-10" />
                        <h1 className="text-base sm:text-lg md:text-xl font-medium text-codetales-white">CodeTales</h1>
                    </div>
                </Link>

                {/* Mobile Menu Button */}
                <button 
                    className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5"
                    onClick={toggleMenu}
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                >
                    <span className={cn(
                        "w-6 h-0.5 bg-codetales-white transition-transform duration-300",
                        isMenuOpen && "transform rotate-45 translate-y-2"
                    )}></span>
                    <span className={cn(
                        "w-6 h-0.5 bg-codetales-white transition-opacity duration-300",
                        isMenuOpen && "opacity-0"
                    )}></span>
                    <span className={cn(
                        "w-6 h-0.5 bg-codetales-white transition-transform duration-300",
                        isMenuOpen && "transform -rotate-45 -translate-y-2"
                    )}></span>
                </button>

                {/* Desktop Menu */}
                <div className="hidden md:flex md:items-center md:space-x-8">
                    <Link to="/" className="text-sm font-medium text-codetales-white hover:text-codetales-pink transition duration-300">
                        Home
                    </Link>
                    <Link to="/about" className="text-sm font-medium text-codetales-white hover:text-codetales-pink transition duration-300">
                        About
                    </Link>
                    <Link to="/content/library" className="text-sm font-medium text-codetales-white hover:text-codetales-pink transition duration-300">
                        Library
                    </Link>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            <div className={cn(
                "md:hidden absolute w-full bg-codetales-dark shadow-lg transition-all duration-300 ease-in-out",
                isMenuOpen ? "max-h-60 py-4 opacity-100" : "max-h-0 py-0 opacity-0 overflow-hidden"
            )}>
                <div className="flex flex-col px-4 space-y-3">
                    <Link 
                        to="/" 
                        className="text-base font-medium text-codetales-white hover:text-codetales-pink transition duration-300"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Home
                    </Link>
                    <Link 
                        to="/about" 
                        className="text-base font-medium text-codetales-white hover:text-codetales-pink transition duration-300"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        About
                    </Link>
                    <Link 
                        to="/content/library" 
                        className="text-base font-medium text-codetales-white hover:text-codetales-pink transition duration-300"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Library
                    </Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;