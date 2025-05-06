import { Footer } from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { useParams } from 'react-router-dom';
import { fetchPanelsByChapter, type Panels } from '@/hooks/database';
import { useEffect, useState } from 'react';
// Update comic detail to fetch from the database to ge all panels base on the id and number.

export const ComicDetail = () => {
    const { contentId, number } = useParams<{ contentId: string; number: string; }>();
    const [panels, setPanels] = useState<Panels[]>([]);
    const [, setLoading] = useState(true);
    const [, setError] = useState<string | null>(null);

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

    const [viewMode, setViewMode] = useState<'list' | 'page'>('list');
    const [currentPanelIndex, setCurrentPanelIndex] = useState(0);

    return (
        <div className="flex flex-col min-h-screen bg-codetales-dark">
            <Navbar />
            <div className="w-full px-4 sm:px-6 md:px-8">
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
                            <img 
                                key={index} 
                                src={panel.image} 
                                alt={`Panel ${index + 1}`} 
                                className="w-full max-w-full sm:max-w-2xl lg:max-w-4xl rounded-lg shadow-lg"
                                loading={index < 3 ? "eager" : "lazy"} // Optimize image loading
                            />
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
                                <img 
                                    src={panels[currentPanelIndex].image} 
                                    alt={`Panel ${currentPanelIndex + 1}`} 
                                    className="w-full rounded-lg shadow-lg"
                                />
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
            </div>
            <div className="mt-auto">
                <Footer />
            </div>
        </div>
    );
}
