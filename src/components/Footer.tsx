import { Link } from "react-router-dom";
import { assets } from "@/lib/assets";

export const Footer = () => {
    return (
        <footer className="bg-codetales-dark text-codetales-white border-t border-codetales-pink/20">
            <div className="container mx-auto px-4 py-8">
                {/* Mobile-first layout with flex column, changes to row on medium screens */}
                <div className="flex flex-col md:flex-row justify-between gap-8">
                    {/* Logo and tagline section */}
                    <div className="space-y-4 md:w-1/3">
                        <Link to="/" className="flex items-center space-x-2">
                            <img src={assets.images.codetalesLogo} alt="CodeTales Logo" className="h-8 w-8" />
                            <span className="font-medium text-lg">CodeTales</span>
                        </Link>
                        <p className="text-sm text-codetales-white/80 max-w-xs">
                            A digital book and comic platform bringing stories to life in an interactive format.
                        </p>
                    </div>
                    
                    {/* Links section - using grid for mobile and flex for desktop */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 md:flex md:space-x-12 md:justify-end">
                        {/* Navigation Links */}
                        <div className="space-y-3">
                            <h3 className="text-sm font-semibold text-codetales-pink">Navigation</h3>
                            <ul className="space-y-2">
                                <li>
                                    <Link to="/" className="text-sm hover:text-codetales-pink transition-colors">
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/about" className="text-sm hover:text-codetales-pink transition-colors">
                                        About
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        
                        {/* Content Types */}
                        <div className="space-y-3">
                            <h3 className="text-sm font-semibold text-codetales-pink">Content</h3>
                            <ul className="space-y-2">
                                <li>
                                    <Link to="/content/comics" className="text-sm hover:text-codetales-pink transition-colors">
                                        Comics
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/content/stories" className="text-sm hover:text-codetales-pink transition-colors">
                                        Stories
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        
                        {/* Legal Links */}
                        <div className="space-y-3">
                            <h3 className="text-sm font-semibold text-codetales-pink">Legal</h3>
                            <ul className="space-y-2">
                                <li>
                                    <Link to="/privacy" className="text-sm hover:text-codetales-pink transition-colors">
                                        Privacy Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/terms" className="text-sm hover:text-codetales-pink transition-colors">
                                        Terms of Use
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        
                        {/* Connect - GitHub Link */}
                        <div className="space-y-3">
                            <h3 className="text-sm font-semibold text-codetales-pink">Connect</h3>
                            <ul className="space-y-2">
                                <li>
                                    <a 
                                        href="https://github.com/shirakizuki/codetales" 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="flex items-center space-x-2 hover:text-codetales-pink transition-colors text-sm"
                                    >
                                        <svg 
                                            xmlns="http://www.w3.org/2000/svg" 
                                            width="16" 
                                            height="16" 
                                            viewBox="0 0 24 24" 
                                            fill="none" 
                                            stroke="currentColor" 
                                            strokeWidth="2" 
                                            strokeLinecap="round" 
                                            strokeLinejoin="round" 
                                            className="h-4 w-4"
                                        >
                                            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                                        </svg>
                                        <span>GitHub</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                {/* Copyright - full width on all devices */}
                <div className="mt-8 pt-6 border-t border-codetales-pink/10 text-center sm:text-left text-sm text-codetales-white/60">
                    <p>© {new Date().getFullYear()} CodeTales. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};
