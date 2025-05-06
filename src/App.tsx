// LANDING PAGE
import Navbar from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { Link } from "react-router-dom"
import { Star, Eye } from "lucide-react"
import heroData from "@/data/hero.section.json"
import { useState, useEffect, useRef } from "react"

// Import thumbnail images directly
import whyMeThumbnail from "./assets/thumbnails/why_me_thumbnail.png"
import aMillionToOneThumbnail from "./assets/thumbnails/a_million_to_one_thumbnail.png"
import beyondTheOceanDoorThumbnail from "./assets/thumbnails/beyond_the_ocean_door_thumbnail.png"
import thisIsTheBookTitleThumbnail from "./assets/thumbnails/this_is_the_book_title_thumbnail.png"

// Create a mapping of hero image names to imported images
const thumbnailMap: Record<string, string> = {
  "why_me_thumbnail.png": whyMeThumbnail,
  "a_million_to_one_thumbnail.png": aMillionToOneThumbnail,
  "beyond_the_ocean_door_thumbnail.png": beyondTheOceanDoorThumbnail,
  "this_is_the_book_title_thumbnail.png": thisIsTheBookTitleThumbnail
}

const App = () => {
  const [activeHeroIndex, setActiveHeroIndex] = useState<string>("1")
  const [isTransitioning, setIsTransitioning] = useState(false)
  const autoRotateTimeoutRef = useRef<number | null>(null)
  const transitionTimeoutRef = useRef<number | null>(null)
  const heroKeys = Object.keys(heroData)
  const activeHero = heroData[activeHeroIndex as keyof typeof heroData]

  // Preload all images to prevent flickering
  useEffect(() => {
    // Create image objects for preloading
    Object.values(heroData).forEach(hero => {
      const img = new Image();
      img.src = thumbnailMap[hero.heroImage] || "";
    });
  }, []);

  // Use two separate image elements for crossfade
  const [displayedImage, setDisplayedImage] = useState<string>("1");
  const [backgroundImage1, setBackgroundImage1] = useState<string>(thumbnailMap[heroData["1"].heroImage] || "");
  const [backgroundImage2, setBackgroundImage2] = useState<string>("");
  const [activeLayer, setActiveLayer] = useState<number>(1);

  // Auto-rotate hero items every 5 seconds
  useEffect(() => {
    if (autoRotateTimeoutRef.current) {
      clearTimeout(autoRotateTimeoutRef.current);
    }

    autoRotateTimeoutRef.current = window.setTimeout(() => {
      const currentIndex = heroKeys.indexOf(displayedImage)
      const nextIndex = (currentIndex + 1) % heroKeys.length
      changeHero(heroKeys[nextIndex]);
    }, 5000) as unknown as number;

    return () => {
      if (autoRotateTimeoutRef.current) {
        clearTimeout(autoRotateTimeoutRef.current);
      }
    }
  }, [displayedImage, heroKeys]);

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

  // Calculate filled stars based on rating
  const rating = activeHero.rating
  const filledStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.25 && rating % 1 < 0.75
  const hasFullStar = rating % 1 >= 0.75
  const totalStars = 5

  const changeHero = (index: string) => {
    if (index === displayedImage || isTransitioning) return;

    // Clean up any existing transition
    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current);
    }

    setIsTransitioning(true);
    
    // Set the new image on the currently hidden layer
    if (activeLayer === 1) {
      setBackgroundImage2(thumbnailMap[heroData[index as keyof typeof heroData].heroImage] || "");
    } else {
      setBackgroundImage1(thumbnailMap[heroData[index as keyof typeof heroData].heroImage] || "");
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
                    <span className="ml-2 text-white text-sm">{activeHero.rating.toFixed(1)}</span>
                  </div>

                  {/* Title */}
                  <h1 className="text-center md:text-left text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 text-white">
                    {activeHero.title}
                  </h1>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6 justify-center md:justify-start">
                    {activeHero.genres.map((genre, index) => (
                      <span key={index} className="px-3 py-1 bg-codetales-pink rounded-full text-xs text-white">
                        {genre}
                      </span>
                    ))}
                  </div>

                  {/* Description - Hidden on mobile */}
                  <p className="hidden md:block text-sm sm:text-base text-white/80 mb-8">
                    {activeHero.description}
                  </p>

                  {/* Start Reading Button - Full width on mobile */}
                  <Link to={`/content/stories/${activeHero.title.toLowerCase().replace(/\s+/g, '-')}`} className="w-full md:w-auto flex items-center justify-center bg-codetales-pink text-white px-6 py-3 rounded-lg hover:bg-codetales-pink/90 transition-colors">
                    <Eye className="mr-2 w-5 h-5" /> Start Reading
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Story Navigation Indicators */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-30">
            {Object.keys(heroData).map((key) => (
              <button
                key={key}
                onClick={() => handleHeroChange(key)}
                className={`h-2 rounded-full transition-all duration-300 ${displayedImage === key
                    ? "w-8 bg-codetales-pink"
                    : "w-2 bg-white/50"
                  }`}
                aria-label={`View ${heroData[key as keyof typeof heroData].title}`}
              ></button>
            ))}
          </div>
        </section>
        {/* Main Content Section */}
        <section className="flex-grow flex flex-col items-center justify-center text-codetales-white py-8 px-4 sm:py-12 md:py-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-codetales-pink text-center">Welcome to CodeTales</h1>

          {/* Featured Content Section - Responsive Grid */}
          <div className="mt-8 sm:mt-12 w-full max-w-6xl px-4 sm:px-6">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-codetales-pink text-center">Featured Content</h2>

            {/* Stories For You Cards */}
            <div>

            </div>

            {/* Explore the Realm of Fantasy */}
            <div>

            </div>

            {/* Responsive Grid For Feature Content */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {/* Feature Card 1 */}
              <div className="bg-codetales-dark border border-codetales-pink/25 rounded-lg p-4 sm:p-6 hover:border-codetales-pink transition-colors">
                <h3 className="text-lg font-medium mb-2 text-codetales-pink">Latest Comics</h3>
                <p className="text-sm text-codetales-white/80 mb-4">Check out our newest comic releases and fan favorites.</p>
                <a href="/content/comics" className="inline-flex items-center text-sm font-medium text-codetales-pink hover:underline">
                  Explore Comics <span className="ml-1">→</span>
                </a>
              </div>

              {/* Feature Card 2 */}
              <div className="bg-codetales-dark border border-codetales-pink/25 rounded-lg p-4 sm:p-6 hover:border-codetales-pink transition-colors">
                <h3 className="text-lg font-medium mb-2 text-codetales-pink">Digital Stories</h3>
                <p className="text-sm text-codetales-white/80 mb-4">Immerse yourself in our collection of interactive stories.</p>
                <a href="/content/stories" className="inline-flex items-center text-sm font-medium text-codetales-pink hover:underline">
                  Discover Stories <span className="ml-1">→</span>
                </a>
              </div>

              {/* Feature Card 3 */}
              <div className="bg-codetales-dark border border-codetales-pink/25 rounded-lg p-4 sm:p-6 hover:border-codetales-pink transition-colors">
                <h3 className="text-lg font-medium mb-2 text-codetales-pink">About Us</h3>
                <p className="text-sm text-codetales-white/80 mb-4">Learn more about the CodeTales project and mission.</p>
                <a href="/about" className="inline-flex items-center text-sm font-medium text-codetales-pink hover:underline">
                  Read More <span className="ml-1">→</span>
                </a>
              </div>
            </div>

            {/* Categories */}
            <div>

            </div>

            {/* Call to Action */}
            <div>
              
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </>
  )
}

export default App