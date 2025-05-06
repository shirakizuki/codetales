// LANDING PAGE
import Navbar from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { Link } from "react-router-dom"
import { Star, Eye } from "lucide-react"
import { useState, useEffect, useRef } from "react"

// Import thumbnail images directly
import { fetchComicSummaries } from "./hooks/database"

// Type definition for comic summary data
type ComicSummary = {
  id: string;
  title: string;
  rating: number;
  description: string;
  thumbnail: string;
}

const App = () => {
  const [activeHeroIndex, setActiveHeroIndex] = useState<string>("0")
  const [isTransitioning, setIsTransitioning] = useState(false)
  const autoRotateTimeoutRef = useRef<number | null>(null)
  const transitionTimeoutRef = useRef<number | null>(null)
  const [heroSummaries, setHeroSummaries] = useState<ComicSummary[]>([])
  
  // Use two separate image elements for crossfade
  const [displayedImage, setDisplayedImage] = useState<string>("0");
  const [backgroundImage1, setBackgroundImage1] = useState<string>("");
  const [backgroundImage2, setBackgroundImage2] = useState<string>("");
  const [activeLayer, setActiveLayer] = useState<number>(1);

  // Load hero data from database
  async function loadHero() {
    try {
      const summaries = await fetchComicSummaries();
      setHeroSummaries(summaries);
      
      // Initialize with the first hero if available
      if (summaries.length > 0) {
        // Set initial background image
        setBackgroundImage1(summaries[0].thumbnail || "");
      }
    } catch (error) {
      console.error("Error loading hero data:", error);
    }
  }

  // Load hero data on component mount
  useEffect(() => {
    loadHero();
  }, []);

  // Preload all images to prevent flickering
  useEffect(() => {
    // Create image objects for preloading
    heroSummaries.forEach(hero => {
      if (hero.thumbnail) {
        const img = new Image();
        img.src = hero.thumbnail;
      }
    });
  }, [heroSummaries]);

  // Auto-rotate hero items every 5 seconds
  useEffect(() => {
    if (autoRotateTimeoutRef.current) {
      clearTimeout(autoRotateTimeoutRef.current);
    }

    // Only start auto-rotation if we have summaries
    if (heroSummaries.length > 0) {
      autoRotateTimeoutRef.current = window.setTimeout(() => {
        const currentIndex = parseInt(activeHeroIndex);
        const nextIndex = (currentIndex + 1) % heroSummaries.length;
        changeHero(nextIndex.toString());
      }, 5000) as unknown as number;
    }

    return () => {
      if (autoRotateTimeoutRef.current) {
        clearTimeout(autoRotateTimeoutRef.current);
      }
    }
  }, [displayedImage, activeHeroIndex, heroSummaries]);

  // Clean up timeouts on unmount
  useEffect(() => {
    return () => {
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
      if (autoRotateTimeoutRef.current) {
        clearTimeout(autoRotateTimeoutRef.current);
      }
    };
  }, []);

  // Get the active hero data
  const activeHero = heroSummaries[parseInt(activeHeroIndex)] || {
    id: "",
    title: "",
    rating: 0,
    description: "",
    thumbnail: ""
  };

  // Calculate filled stars based on rating
  const rating = activeHero.rating;
  const filledStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.25 && rating % 1 < 0.75;
  const hasFullStar = rating % 1 >= 0.75;
  const totalStars = 5;

  const changeHero = (index: string) => {
    if (index === displayedImage || isTransitioning || !heroSummaries.length) return;

    // Clean up any existing transition
    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current);
    }

    setIsTransitioning(true);

    const heroIndex = parseInt(index);
    if (heroIndex < 0 || heroIndex >= heroSummaries.length) return;

    // Set the new image on the currently hidden layer
    if (activeLayer === 1) {
      setBackgroundImage2(heroSummaries[heroIndex].thumbnail || "");
    } else {
      setBackgroundImage1(heroSummaries[heroIndex].thumbnail || "");
    }

    // Toggle the active layer to reveal the new image
    setActiveLayer(activeLayer === 1 ? 2 : 1);

    // Update the active hero index for content
    setActiveHeroIndex(index);
    setDisplayedImage(index);

    // End transition after animation completes
    transitionTimeoutRef.current = window.setTimeout(() => {
      setIsTransitioning(false);
      transitionTimeoutRef.current = null;
    }, 600) as unknown as number;
  };

  const handleHeroChange = (index: string) => {
    changeHero(index);
  };

  return (
    <>
      {/* Fixed Navbar at the top */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      <main className="bg-codetales-dark min-h-screen flex flex-col">
        {/* Hero Section -- OKAY */}
        <section className="relative w-full overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="relative min-h-[500px] md:min-h-[800px] bg-codetales-dark">
            {/* First image layer */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-opacity duration-600"
              style={{
                backgroundImage: `url(${backgroundImage1})`,
                opacity: activeLayer === 1 ? 1 : 0,
                transitionProperty: 'opacity',
                transitionDuration: '600ms',
                backgroundPosition: 'center 40%',
                backgroundSize: 'cover',
                filter: 'brightness(0.6)',
                willChange: 'opacity'
              }}
            ></div>

            {/* Second image layer */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-opacity duration-600"
              style={{
                backgroundImage: `url(${backgroundImage2})`,
                opacity: activeLayer === 2 ? 1 : 0,
                transitionProperty: 'opacity',
                transitionDuration: '600ms',
                backgroundPosition: 'center 40%',
                backgroundSize: 'cover',
                filter: 'brightness(0.6)',
                willChange: 'opacity'
              }}
            ></div>

            {/* Content Overlay with stronger gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1b1919] via-[#1b1919]/40 to-transparent md:bg-gradient-to-r md:from-[#1b1919] md:via-[#1b1919]/40 md:to-transparent z-20">
              <div className="container mx-auto py-10 sm:py-16 md:py-20 h-full flex flex-col justify-end">
                <div className="max-w-xl px-4">
                  {/* Rating above title on mobile */}
                  <div className="hidden md:flex sm:block items-center mb-4 mt-2 order-first md:order-none">
                    {Array.from({ length: totalStars }).map((_, index) => {
                      // Determine if this star should be filled, half-filled, or empty
                      const isFilled = index < filledStars
                      const isHalfFilled = !isFilled && index === filledStars && hasHalfStar
                      const isLastFilled = !isFilled && !isHalfFilled && index === filledStars && hasFullStar

                      return (
                        <Star
                          key={index}
                          className={`w-5 h-5 ${isFilled || isHalfFilled || isLastFilled ? 'fill-codetales-pink' : ''} text-codetales-pink`}
                          fill={isFilled || isHalfFilled || isLastFilled ? 'currentColor' : 'none'}
                        />
                      )
                    })}
                    <span className="ml-2 text-white text-sm">{activeHero.rating?.toFixed(1) || "0.0"}</span>
                  </div>

                  {/* Title */}
                  <h1 className="text-center md:text-left text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 text-white">
                    {activeHero.title || "Loading..."}
                  </h1>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6 justify-center md:justify-start">
                    {/* If we don't have genres in the database summary, we can't show them */}
                    <span className="px-3 py-1 bg-codetales-pink rounded-full text-xs text-white">
                      Comic
                    </span>
                  </div>

                  {/* Description - Hidden on mobile */}
                  <p className="hidden md:block text-sm sm:text-base text-white/80 mb-8">
                    {activeHero.description || "Loading description..."}
                  </p>

                  {/* Start Reading Button - Full width on mobile */}
                  <Link to={`/content/${activeHero.id}`} className="w-full md:w-auto flex items-center justify-center bg-codetales-pink text-white px-6 py-3 rounded-lg hover:bg-codetales-pink/90 transition-colors">
                    <Eye className="mr-2 w-5 h-5" /> Start Reading
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Story Navigation Indicators */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-30">
            {heroSummaries.map((_, index) => (
              <button
                key={index}
                onClick={() => handleHeroChange(index.toString())}
                className={`h-2 rounded-full transition-all duration-300 ${displayedImage === index.toString()
                  ? "w-8 bg-codetales-pink"
                  : "w-2 bg-white/50"
                  }`}
                aria-label={`View ${heroSummaries[index]?.title || `Story ${index + 1}`}`}
              ></button>
            ))}
          </div>
        </section>
        {/* Welcome Content */}
        <section className="flex-grow flex flex-col items-center justify-center text-codetales-white py-8 px-4 sm:py-12 md:py-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-codetales-pink text-center">Welcome to CodeTales</h1>
        </section>
        {/* Stories For You Cards */}
        <section className="py-10 px-4 sm:px-6 md:px-8 bg-codetales-dark">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-codetales-pink border-l-4 border-codetales-pink pl-3">Stories For You</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {heroSummaries.map((story, index) => (
              <Link
                key={index}
                to={`/content/${story.id}`}
                className="group block bg-codetales-dark border border-codetales-pink/20 rounded-lg overflow-hidden hover:border-codetales-pink transition-all duration-300 hover:shadow-[0_0_10px_rgba(236,72,153,0.3)]"
              >
                <div className="relative aspect-[2/3] overflow-hidden">
                  <img
                    src={story.thumbnail}
                    alt={story.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                    <div className="flex items-center gap-1 mb-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(story.rating) ? 'fill-codetales-pink text-codetales-pink' : 'text-gray-400'}`}
                        />
                      ))}
                      <span className="ml-1 text-xs text-white">{story.rating.toFixed(1)}</span>
                    </div>
                    <h3 className="text-sm font-semibold text-white">{story.title}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
        {/* Explore the Realm of Fantasy */}
        <section className="py-16 px-4 sm:px-6 md:px-8 bg-gradient-to-b from-codetales-dark to-[#2d1b36]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-codetales-pink">Explore the Realm of Fantasy</h2>
            <p className="text-white/80 text-center max-w-2xl mx-auto mb-10 text-sm sm:text-base">
              Immerse yourself in magical worlds where code meets creativity. Discover stories that blend technology with fantasy for a unique reading experience.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {/* Left Feature */}
              <div className="bg-codetales-dark/50 backdrop-blur-sm rounded-lg overflow-hidden border border-codetales-pink/30 shadow-lg hover:shadow-codetales-pink/20 transition-shadow">
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-4 text-codetales-pink">Coding Adventures</h3>
                  <p className="text-white/80 mb-6 text-sm">
                    Follow the journeys of programmers, developers, and tech enthusiasts as they navigate through challenges both in code and beyond.
                  </p>
                  <Link to="/content/categories/coding" className="inline-block px-5 py-2 bg-codetales-pink/20 text-codetales-pink rounded-lg hover:bg-codetales-pink/30 transition-colors text-sm font-medium">
                    Discover Coding Tales
                  </Link>
                </div>
              </div>

              {/* Right Feature */}
              <div className="bg-codetales-dark/50 backdrop-blur-sm rounded-lg overflow-hidden border border-codetales-pink/30 shadow-lg hover:shadow-codetales-pink/20 transition-shadow">
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-4 text-codetales-pink">Fantasy Worlds</h3>
                  <p className="text-white/80 mb-6 text-sm">
                    Step into magical realms where technology and fantasy intertwine, creating immersive experiences that captivate your imagination.
                  </p>
                  <Link to="/content/categories/fantasy" className="inline-block px-5 py-2 bg-codetales-pink/20 text-codetales-pink rounded-lg hover:bg-codetales-pink/30 transition-colors text-sm font-medium">
                    Enter Fantasy Realms
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Feature Content Section */}
        <section className="px-4 sm:px-6 md:px-8 py-12 sm:py-16 bg-codetales-dark">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-codetales-pink border-l-4 border-codetales-pink pl-3">Featured Content</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {/* Feature Card 1 */}
              <div className="bg-codetales-dark/70 border border-codetales-pink/25 rounded-lg p-6 hover:border-codetales-pink transition-colors hover:shadow-[0_0_15px_rgba(236,72,153,0.1)]">
                <h3 className="text-lg font-medium mb-3 text-codetales-pink">Latest Comics</h3>
                <p className="text-sm text-white/80 mb-5">Check out our newest comic releases and fan favorites. Updated weekly with fresh content.</p>
                <Link to="/content/comics" className="inline-flex items-center text-sm font-medium text-codetales-pink hover:text-codetales-pink/80 hover:underline transition-colors">
                  Explore Comics <span className="ml-1">→</span>
                </Link>
              </div>

              {/* Feature Card 2 */}
              <div className="bg-codetales-dark/70 border border-codetales-pink/25 rounded-lg p-6 hover:border-codetales-pink transition-colors hover:shadow-[0_0_15px_rgba(236,72,153,0.1)]">
                <h3 className="text-lg font-medium mb-3 text-codetales-pink">Digital Stories</h3>
                <p className="text-sm text-white/80 mb-5">Immerse yourself in our collection of interactive stories that blend code with captivating narratives.</p>
                <Link to="/content/stories" className="inline-flex items-center text-sm font-medium text-codetales-pink hover:text-codetales-pink/80 hover:underline transition-colors">
                  Discover Stories <span className="ml-1">→</span>
                </Link>
              </div>

              {/* Feature Card 3 */}
              <div className="bg-codetales-dark/70 border border-codetales-pink/25 rounded-lg p-6 hover:border-codetales-pink transition-colors hover:shadow-[0_0_15px_rgba(236,72,153,0.1)]">
                <h3 className="text-lg font-medium mb-3 text-codetales-pink">About Us</h3>
                <p className="text-sm text-white/80 mb-5">Learn more about the CodeTales project and mission to bring coding concepts to life through storytelling.</p>
                <Link to="/about" className="inline-flex items-center text-sm font-medium text-codetales-pink hover:text-codetales-pink/80 hover:underline transition-colors">
                  Read More <span className="ml-1">→</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
        {/* Categories Section */}
        <section className="py-16 px-4 sm:px-6 md:px-8 bg-codetales-dark/90">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold mb-10 text-codetales-pink border-l-4 border-codetales-pink pl-3">Browse By Category</h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
              {/* Category 1 */}
              <Link to="/content/categories/coding" className="group flex flex-col items-center p-4 bg-codetales-dark/50 rounded-lg border border-codetales-pink/20 hover:border-codetales-pink/50 transition-colors text-center">
                <div className="w-14 h-14 mb-3 flex items-center justify-center bg-codetales-pink/20 rounded-full group-hover:bg-codetales-pink/30 transition-colors">
                  <span className="text-xl font-bold text-codetales-pink">{"{ }"}</span>
                </div>
                <h3 className="text-sm font-medium text-white">Coding</h3>
                <p className="mt-1 text-xs text-white/60">24 stories</p>
              </Link>

              {/* Category 2 */}
              <Link to="/content/categories/fantasy" className="group flex flex-col items-center p-4 bg-codetales-dark/50 rounded-lg border border-codetales-pink/20 hover:border-codetales-pink/50 transition-colors text-center">
                <div className="w-14 h-14 mb-3 flex items-center justify-center bg-codetales-pink/20 rounded-full group-hover:bg-codetales-pink/30 transition-colors">
                  <span className="text-xl font-bold text-codetales-pink">✨</span>
                </div>
                <h3 className="text-sm font-medium text-white">Fantasy</h3>
                <p className="mt-1 text-xs text-white/60">18 stories</p>
              </Link>

              {/* Category 3 */}
              <Link to="/content/categories/adventure" className="group flex flex-col items-center p-4 bg-codetales-dark/50 rounded-lg border border-codetales-pink/20 hover:border-codetales-pink/50 transition-colors text-center">
                <div className="w-14 h-14 mb-3 flex items-center justify-center bg-codetales-pink/20 rounded-full group-hover:bg-codetales-pink/30 transition-colors">
                  <span className="text-xl font-bold text-codetales-pink">🌍</span>
                </div>
                <h3 className="text-sm font-medium text-white">Adventure</h3>
                <p className="mt-1 text-xs text-white/60">15 stories</p>
              </Link>

              {/* Category 4 */}
              <Link to="/content/categories/sci-fi" className="group flex flex-col items-center p-4 bg-codetales-dark/50 rounded-lg border border-codetales-pink/20 hover:border-codetales-pink/50 transition-colors text-center">
                <div className="w-14 h-14 mb-3 flex items-center justify-center bg-codetales-pink/20 rounded-full group-hover:bg-codetales-pink/30 transition-colors">
                  <span className="text-xl font-bold text-codetales-pink">🚀</span>
                </div>
                <h3 className="text-sm font-medium text-white">Sci-Fi</h3>
                <p className="mt-1 text-xs text-white/60">12 stories</p>
              </Link>

              {/* Category 5 */}
              <Link to="/content/categories/horror" className="group flex flex-col items-center p-4 bg-codetales-dark/50 rounded-lg border border-codetales-pink/20 hover:border-codetales-pink/50 transition-colors text-center">
                <div className="w-14 h-14 mb-3 flex items-center justify-center bg-codetales-pink/20 rounded-full group-hover:bg-codetales-pink/30 transition-colors">
                  <span className="text-xl font-bold text-codetales-pink">👻</span>
                </div>
                <h3 className="text-sm font-medium text-white">Horror</h3>
                <p className="mt-1 text-xs text-white/60">8 stories</p>
              </Link>

              {/* Category 6 */}
              <Link to="/content/categories/mystery" className="group flex flex-col items-center p-4 bg-codetales-dark/50 rounded-lg border border-codetales-pink/20 hover:border-codetales-pink/50 transition-colors text-center">
                <div className="w-14 h-14 mb-3 flex items-center justify-center bg-codetales-pink/20 rounded-full group-hover:bg-codetales-pink/30 transition-colors">
                  <span className="text-xl font-bold text-codetales-pink">🔍</span>
                </div>
                <h3 className="text-sm font-medium text-white">Mystery</h3>
                <p className="mt-1 text-xs text-white/60">10 stories</p>
              </Link>

              {/* Category 7 */}
              <Link to="/content/categories/thriller" className="group flex flex-col items-center p-4 bg-codetales-dark/50 rounded-lg border border-codetales-pink/20 hover:border-codetales-pink/50 transition-colors text-center">
                <div className="w-14 h-14 mb-3 flex items-center justify-center bg-codetales-pink/20 rounded-full group-hover:bg-codetales-pink/30 transition-colors">
                  <span className="text-xl font-bold text-codetales-pink">⏱️</span>
                </div>
                <h3 className="text-sm font-medium text-white">Thriller</h3>
                <p className="mt-1 text-xs text-white/60">7 stories</p>
              </Link>

              {/* Category 8 - All Categories */}
              <Link to="/content/categories" className="group flex flex-col items-center p-4 bg-codetales-dark/50 rounded-lg border border-codetales-pink/20 hover:border-codetales-pink/50 transition-colors text-center">
                <div className="w-14 h-14 mb-3 flex items-center justify-center bg-codetales-pink/20 rounded-full group-hover:bg-codetales-pink/30 transition-colors">
                  <span className="text-xl font-bold text-codetales-pink">+</span>
                </div>
                <h3 className="text-sm font-medium text-white">All Categories</h3>
                <p className="mt-1 text-xs text-white/60">94 total</p>
              </Link>
            </div>
          </div>
        </section>
        {/* Call to Action Section */}
        <section className="py-16 px-4 sm:px-6 md:px-8 bg-gradient-to-t from-codetales-dark to-[#2d1b36]">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-codetales-pink">Join the CodeTales Community</h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto text-sm sm:text-base">
              Get access to exclusive stories, early releases, and connect with fellow coding enthusiasts and storytellers.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/about"
                className="w-full sm:w-auto px-6 py-3 bg-transparent border border-codetales-pink text-codetales-pink rounded-lg font-medium hover:bg-codetales-pink/10 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </>
  )
}

export default App