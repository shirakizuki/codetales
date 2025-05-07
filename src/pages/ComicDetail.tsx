import { Footer } from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { useParams } from 'react-router-dom';
import { fetchPanelsByChapter, type Panels } from '@/hooks/database';
import { useEffect, useState, useRef, useCallback } from 'react';

// Image cache to store already loaded images
const imageCache = new Map<string, boolean>();

export const ComicDetail = () => {
    const { contentId, number } = useParams<{ contentId: string; number: string; }>();
    const [panels, setPanels] = useState<Panels[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
    const [viewMode, setViewMode] = useState<'list' | 'page'>('list');
    const [currentPanelIndex, setCurrentPanelIndex] = useState(0);

    // Create refs for preloading images
    const imageRefs = useRef<(HTMLImageElement | null)[]>([]);

    useEffect(() => {
        const fetchPanels = async () => {
            setLoading(true);
            setError(null);
            try {
                if (contentId && number) {
                    const data = await fetchPanelsByChapter(contentId, parseInt(number, 10));
                    if (data && data.length > 0) {
                        setPanels(data);
                    } else {
                        setError('No panels found for this chapter');
                    }
                }
                setLoading(false);
            } catch (err) {
                console.error('Error fetching panels:', err);
                setError('Failed to fetch panels');
                setLoading(false);
            }
        };

        fetchPanels();
    }, [contentId, number]);

    // Preload adjacent images when in page view
    useEffect(() => {
        if (viewMode === 'page' && panels.length > 0) {
            // Preload next panel
            if (currentPanelIndex < panels.length - 1) {
                preloadImage(panels[currentPanelIndex + 1].image);
            }
            
            // Preload previous panel
            if (currentPanelIndex > 0) {
                preloadImage(panels[currentPanelIndex - 1].image);
            }
        }
    }, [currentPanelIndex, panels, viewMode]);

    // Function to preload an image
    const preloadImage = useCallback((src: string) => {
        // If image is already cached, skip preloading
        if (imageCache.has(src) || loadedImages.has(src)) {
            return;
        }
        
        const img = new Image();
        img.src = src;
        img.onload = () => {
            imageCache.set(src, true);
            setLoadedImages(prev => new Set(prev).add(src));
        };
    }, [loadedImages]);

    // Handle image loading status
    const handleImageLoad = (src: string) => {
        imageCache.set(src, true);
        setLoadedImages(prev => new Set(prev).add(src));
    };

    // Function to check if image is loaded/cached
    const isImageLoaded = (src: string): boolean => {
        return imageCache.has(src) || loadedImages.has(src);
    };

    return (
        <div className="flex flex-col min-h-screen bg-codetales-dark">
            <Navbar />
            <div className="w-full bg-yellow-600 bg-opacity-80 text-white p-3 sm:p-4 mx-auto text-center mb-4">
                <div className="max-w-3xl mx-auto">
                    <p className="text-sm sm:text-base">
                        <span className="font-semibold">Note:</span> Images may take some time to load on first view. Please be patient while we load the best quality experience for you.
                    </p>
                </div>
            </div>
            <div className="w-full px-4 sm:px-6 md:px-8">
                {loading ? (
                    <div className="flex flex-col items-center justify-center my-16 text-white">
                        <div className="w-16 h-16 border-t-4 border-codetales-primary border-solid rounded-full animate-spin"></div>
                        <p className="mt-4 text-lg">Loading comic panels...</p>
                    </div>
                ) : error ? (
                    <div className="flex flex-col items-center justify-center my-16 text-white">
                        <div className="p-4 bg-red-500 bg-opacity-25 rounded-lg">
                            <p className="text-xl font-semibold">Error</p>
                            <p className="mt-2">{error}</p>
                            <button 
                                onClick={() => window.history.back()}
                                className="mt-4 px-4 py-2 bg-codetales-secondary rounded-lg text-white"
                            >
                                Go Back
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="flex flex-col sm:flex-row justify-center items-center mt-4 sm:mt-8 space-y-2 sm:space-y-0">
                            <button 
                                className={`w-full sm:w-auto px-4 py-3 sm:mx-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-codetales-primary' : 'bg-gray-700'} text-white text-sm sm:text-base`}
                                onClick={() => setViewMode('list')}
                            >
                                List View
                            </button>
                            <button 
                                className={`w-full sm:w-auto px-4 py-3 sm:mx-2 rounded-lg transition-colors ${viewMode === 'page' ? 'bg-codetales-primary' : 'bg-gray-700'} text-white text-sm sm:text-base`}
                                onClick={() => setViewMode('page')}
                            >
                                Page View
                            </button>
                        </div>
                        
                        {viewMode === 'list' ? (
                            <div className="flex flex-col items-center justify-center my-6 sm:my-10 md:my-16 space-y-4 md:space-y-8">
                                {panels.map((panel, index) => (
                                    <div key={index} className="w-full max-w-full sm:max-w-2xl lg:max-w-4xl">
                                        <img 
                                            ref={(el) => { imageRefs.current[index] = el; }}
                                            src={panel.image} 
                                            alt={`Panel ${index + 1}`} 
                                            className="w-full rounded-lg shadow-lg"
                                            loading="lazy"
                                            onLoad={() => handleImageLoad(panel.image)}
                                            style={{
                                                opacity: isImageLoaded(panel.image) ? 1 : 0.5,
                                                transition: 'opacity 0.3s ease-in-out'
                                            }}
                                        />
                                        {!isImageLoaded(panel.image) && (
                                            <div className="flex justify-center items-center py-2">
                                                <div className="animate-pulse text-white text-sm">Loading...</div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center my-6 sm:my-10 md:my-16">
                                {panels.length > 0 && (
                                    <div className="w-full max-w-full sm:max-w-2xl lg:max-w-4xl">
                                        {/* Navigation controls - top */}
                                        <div className="flex justify-between items-center my-4 px-2">
                                            <button 
                                                onClick={() => setCurrentPanelIndex(prev => Math.max(0, prev - 1))}
                                                disabled={currentPanelIndex === 0}
                                                className="px-4 py-3 bg-codetales-primary rounded-lg disabled:bg-gray-700 text-white min-w-[90px] sm:min-w-[100px]"
                                            >
                                                Previous
                                            </button>
                                            <span className="px-2 py-2 text-white text-sm sm:text-base">
                                                {currentPanelIndex + 1} / {panels.length}
                                            </span>
                                            <button 
                                                onClick={() => setCurrentPanelIndex(prev => Math.min(panels.length - 1, prev + 1))}
                                                disabled={currentPanelIndex === panels.length - 1}
                                                className="px-4 py-3 bg-codetales-primary rounded-lg disabled:bg-gray-700 text-white min-w-[90px] sm:min-w-[100px]"
                                            >
                                                Next
                                            </button>
                                        </div>
                                        
                                        <div className="relative">
                                            <img 
                                                src={panels[currentPanelIndex].image} 
                                                alt={`Panel ${currentPanelIndex + 1}`} 
                                                className="w-full rounded-lg shadow-lg"
                                                onLoad={() => handleImageLoad(panels[currentPanelIndex].image)}
                                                style={{
                                                    opacity: isImageLoaded(panels[currentPanelIndex].image) ? 1 : 0.5,
                                                    transition: 'opacity 0.3s ease-in-out'
                                                }}
                                            />
                                            {!isImageLoaded(panels[currentPanelIndex].image) && (
                                                <div className="absolute inset-0 flex justify-center items-center">
                                                    <div className="animate-pulse text-white text-lg bg-black bg-opacity-50 px-4 py-2 rounded">Loading...</div>
                                                </div>
                                            )}
                                            
                                            {/* Hidden preload images for next and previous panels */}
                                            {currentPanelIndex < panels.length - 1 && (
                                                <img 
                                                    src={panels[currentPanelIndex + 1].image} 
                                                    alt="Preload next" 
                                                    className="hidden"
                                                    onLoad={() => handleImageLoad(panels[currentPanelIndex + 1].image)}
                                                />
                                            )}
                                            {currentPanelIndex > 0 && (
                                                <img 
                                                    src={panels[currentPanelIndex - 1].image} 
                                                    alt="Preload previous" 
                                                    className="hidden"
                                                    onLoad={() => handleImageLoad(panels[currentPanelIndex - 1].image)}
                                                />
                                            )}
                                        </div>
                                        
                                        {/* Navigation controls - bottom */}
                                        <div className="flex justify-between items-center mt-4 px-2">
                                            <button 
                                                onClick={() => setCurrentPanelIndex(prev => Math.max(0, prev - 1))}
                                                disabled={currentPanelIndex === 0}
                                                className="px-4 py-3 bg-codetales-primary rounded-lg disabled:bg-gray-700 text-white min-w-[90px] sm:min-w-[100px]"
                                            >
                                                Previous
                                            </button>
                                            <button 
                                                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                                className="px-4 py-3 bg-codetales-secondary rounded-lg text-white text-sm"
                                            >
                                                Back to Top
                                            </button>
                                            <button 
                                                onClick={() => setCurrentPanelIndex(prev => Math.min(panels.length - 1, prev + 1))}
                                                disabled={currentPanelIndex === panels.length - 1}
                                                className="px-4 py-3 bg-codetales-primary rounded-lg disabled:bg-gray-700 text-white min-w-[90px] sm:min-w-[100px]"
                                            >
                                                Next
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </>
                )}
            </div>
            <div className="mt-auto">
                <Footer />
            </div>
        </div>
    );
}
