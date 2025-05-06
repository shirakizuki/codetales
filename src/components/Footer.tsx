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
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 md:flex md:space-x-12 md:justify-end">
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
                                <li>
                                    <Link to="/content/library" className="text-sm hover:text-codetales-pink transition-colors">
                                        Library
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
