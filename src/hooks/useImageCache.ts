import { useState, useCallback } from 'react';

// Global image cache that persists across component renders
const globalImageCache = new Map<string, boolean>();

interface UseImageCacheReturn {
  isLoaded: (src: string) => boolean;
  preloadImage: (src: string) => void;
  handleImageLoad: (src: string) => void;
  loadedImages: Set<string>;
  preloadImages: (srcs: string[]) => void;
}

/**
 * Hook for caching and managing image loading states
 * Provides utilities to check if images are cached, preload images, and handle image loading events
 */
export function useImageCache(): UseImageCacheReturn {
  // Local state to track images loaded during this component's lifecycle
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  
  // Check if an image is loaded/cached
  const isLoaded = useCallback((src: string): boolean => {
    return globalImageCache.has(src) || loadedImages.has(src);
  }, [loadedImages]);

  // Handle single image loading
  const handleImageLoad = useCallback((src: string) => {
    globalImageCache.set(src, true);
    setLoadedImages(prev => {
      const newSet = new Set(prev);
      newSet.add(src);
      return newSet;
    });
  }, []);

  // Preload a single image
  const preloadImage = useCallback((src: string) => {
    // Skip if already cached
    if (globalImageCache.has(src) || loadedImages.has(src)) {
      return;
    }
    
    const img = new Image();
    img.src = src;
    img.onload = () => {
      handleImageLoad(src);
    };
  }, [handleImageLoad, loadedImages]);

  // Preload multiple images at once
  const preloadImages = useCallback((srcs: string[]) => {
    srcs.forEach(src => preloadImage(src));
  }, [preloadImage]);

  return {
    isLoaded,
    preloadImage,
    handleImageLoad,
    loadedImages,
    preloadImages
  };
}