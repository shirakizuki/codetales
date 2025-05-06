import { db } from "@/lib/firebase";
import { collection, doc, getDocs, query, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

type Comments = {
    id: string;
    name: string;
    comment: string;
    date: string;
    rating: number;
}

export type Panels = {
    image: string;
}

export type ComicData = {
    id: string;
    title: string;
    rating: number;
    likes: number;
    description: string;
    chapter: Array<string>; // Updated: Array of image URLs
    genre: Array<string>;
    comments: Array<Comments>;
    thumbnail: string;
    author: string;
    commentsCount: number;
}

// Type for the extracted fields
type ComicSummary = {
    id: string;
    title: string;
    rating: number;
    description: string;
    thumbnail: string;
    genre: Array<string>;
}

export const useFetchData = () => {
    const [data, setData] = useState<ComicData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            const querySnapshot = await getDocs(collection(db, "contents"));
            const docs = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as ComicData[];
            setData(docs);
            setLoading(false);
        };
        
        fetchData();
    }, []);

    return { data, loading };
};

/**
 * Hook to fetch only specific fields (id, title, rating, description, thumbnail) from comics
 * This queries the database directly for only these fields, improving performance
 */
export const useFetchComicSummaries = () => {
    const [summaries, setSummaries] = useState<ComicSummary[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchSummaries = async () => {
            // Create a query that only selects the fields we want
            const comicsQuery = query(collection(db, "contents"));
            
            const querySnapshot = await getDocs(comicsQuery);
            const summariesData = querySnapshot.docs.map(doc => ({
                id: doc.id, // ID comes from the document reference
                title: doc.data()?.title,
                rating: doc.data()?.rating,
                description: doc.data()?.description,
                thumbnail: doc.data()?.thumbnail,
                genre: doc.data()?.genre.map((g: string) => g) // Convert genre to lowercase
            }));
            setSummaries(summariesData as ComicSummary[]);
            setLoading(false);
        };
        
        fetchSummaries();
    }, []);

    return { summaries, loading };
};

/**
 * Non-hook function to fetch only specific fields (id, title, rating, description, thumbnail) from comics
 * This queries the database directly for only these fields, improving performance
 * @returns Promise with an array of comic summaries
 */
export const fetchComicSummaries = async (): Promise<ComicSummary[]> => {
    const comicsQuery = query(collection(db, "contents"));
    
    const querySnapshot = await getDocs(comicsQuery);
    return querySnapshot.docs.map(doc => ({
        id: doc.id,
        title: doc.data()?.title,
        rating: doc.data()?.rating,
        description: doc.data()?.description,
        thumbnail: doc.data()?.thumbnail,
        genre: doc.data()?.genre.map((g: string) => g) // Convert genre to lowercase
    })) as ComicSummary[];
};

export const fetchComicData = async (id: string): Promise<ComicData | null> => {
    try {
        // Import the doc and getDoc functions from firebase/firestore
        const { doc, getDoc } = await import("firebase/firestore");
        
        // Create a reference to the specific document in the "contents" collection
        const docRef = doc(db, "contents", id);
        
        // Fetch the document
        const docSnap = await getDoc(docRef);
        
        // Check if the document exists
        if (docSnap.exists()) {
            // Return the document data with the ID
            return {
                id: docSnap.id,
                ...docSnap.data()
            } as ComicData;
        } else {
            console.log("No comic found with ID:", id);
            return null;
        }
    } catch (error) {
        console.error("Error fetching comic data:", error);
        return null;
    }
}

/**
 * Fetches panels from a comic based on the comic ID and chapter number
 * @param id The ID of the comic
 * @param chapterNumber The chapter number to retrieve panels for
 * @returns Promise with an array of Panels or null if not found
 */
export const fetchPanelsByChapter = async (id: string, chapterNumber: number): Promise<Panels[] | null> => {
    try {
        // First fetch the comic data
        const comicData = await fetchComicData(id);
        
        if (!comicData) {
            console.log("No comic found with ID:", id);
            return null;
        }
        
        // Check if the chapter data exists
        if (comicData.chapter) {
            // Check if chapter is an object with numeric keys (like {1: Array(22)})
            if (typeof comicData.chapter === 'object' && !Array.isArray(comicData.chapter)) {
                // Access the specific chapter by its number
                const chapterImages = comicData.chapter[chapterNumber];
                
                if (Array.isArray(chapterImages)) {
                    // Convert the array of URLs to an array of Panel objects
                    if (Array.isArray(chapterImages)) {
                        const panels: Panels[] = (chapterImages as string[]).map(url => ({ image: url }));
                        return panels;
                    } else {
                        console.error(`Chapter ${chapterNumber} for comic ${id} is not an array:`, chapterImages);
                        return null;
                    }
                } else {
                    console.error(`Chapter ${chapterNumber} for comic ${id} is not an array:`, chapterImages);
                    return null;
                }
            } 
            // Check for the legacy format where chapter is directly an array
            else if (Array.isArray(comicData.chapter)) {
                const panels: Panels[] = comicData.chapter.map(url => ({ image: url }));
                return panels;
            } 
            else {
                console.error(`Chapter data for comic ${id} is not in a recognized format:`, comicData.chapter);
                return null;
            }
        }
        
        console.log(`No panels found for comic with ID: ${id}`);
        return null;
    } catch (error) {
        console.error(`Error fetching panels for comic ${id}, chapter ${chapterNumber}:`, error);
        return null;
    }
}

// Type for comment data
export type CommentData = {
  text: string;
  author: string;
  rating: number;
  timestamp: Date;
};

// Function to post a comment to the database
export const saveComment = async (
  contentId: string,
  commentData: CommentData
): Promise<boolean> => {
  try {
    const { collection, doc, addDoc, getDoc, updateDoc, serverTimestamp } = await import("firebase/firestore");
    
    // Using modular API for Firestore
    const commentRef = collection(db, 'contents', contentId, 'comments');
    
    await addDoc(commentRef, {
      text: commentData.text,
      author: commentData.author,
      rating: commentData.rating,
      timestamp: serverTimestamp() // Use server timestamp
    });
    
    // Update the average rating for the comic
    const comicRef = doc(db, 'contents', contentId);
    
    // Get current comic data to calculate new average rating
    const comicDoc = await getDoc(comicRef);
    const comicData = comicDoc.data();
    
    if (comicData) {
      const currentRating = comicData.rating || 0;
      const ratingCount = comicData.ratingCount || 0;
      
      // Calculate new average rating
      const newRatingCount = ratingCount + 1;
      const newRating = ((currentRating * ratingCount) + commentData.rating) / newRatingCount;
      
      // Update the comic document with new rating data
      await updateDoc(comicRef, {
        rating: newRating,
        ratingCount: newRatingCount
      });
    }
    
    return true;
  } catch (error) {
    console.error("Error saving comment:", error);
    return false;
  }
}

// Function to fetch comments for a comic
export const fetchComments = async (contentId: string): Promise<CommentData[]> => {
  try {
    const { collection, query, orderBy, getDocs } = await import("firebase/firestore");
    
    const commentsRef = collection(db, 'contents', contentId, 'comments');
    const commentsQuery = query(commentsRef, orderBy('timestamp', 'desc'));
    const snapshot = await getDocs(commentsQuery);
    
    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        text: data.text,
        author: data.author,
        rating: data.rating,
        timestamp: data.timestamp.toDate()
      };
    });
  } catch (error) {
    console.error("Error fetching comments:", error);
    return [];
  }
};

/**
 * Updates the like count for a specific content item
 * @param contentId The ID of the content to update likes for
 * @param newLikeCount The new like count to set
 * @returns Promise resolving to true if successful, false otherwise
 */
export const updateLikes = async (contentId: string, newLikeCount: number): Promise<boolean> => {
  try {
    // Get the existing content data
    const contentRef = doc(db, 'contents', contentId);
    
    // Update only the likes field
    await updateDoc(contentRef, {
      likes: newLikeCount
    });
    
    return true;
  } catch (error) {
    console.error('Error updating likes:', error);
    return false;
  }
};
