import { db } from "@/lib/firebase";
import { collection, getDocs, query } from "firebase/firestore";
import { useEffect, useState } from "react";

type Comments = {
    id: string;
    name: string;
    comment: string;
    date: string;
    rating: number;
}

type Panels = {
    number: number;
    image: string;
}

type ComicData = {
    id: string;
    title: string;
    rating: number;
    likes: number;
    description: string;
    chapter: Map<number, Array<Panels>>; 
    genres: Array<string>;
    comments: Array<Comments>;
    thumbnail: string;
    author: string;
}

// Type for the extracted fields
type ComicSummary = {
    id: string;
    title: string;
    rating: number;
    description: string;
    thumbnail: string;
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
                thumbnail: doc.data()?.thumbnail
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
        thumbnail: doc.data()?.thumbnail
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
        
        // Check if the chapter exists in the comic data
        if (comicData.chapter && comicData.chapter.get(chapterNumber)) {
            return comicData.chapter.get(chapterNumber) || null;
        } else {
            console.log(`Chapter ${chapterNumber} not found in comic with ID: ${id}`);
            return null;
        }
    } catch (error) {
        console.error(`Error fetching panels for comic ${id}, chapter ${chapterNumber}:`, error);
        return null;
    }
}