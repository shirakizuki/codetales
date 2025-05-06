import { useParams } from 'react-router-dom';
import heroData from '../data/hero.section.json';
import { useState, useEffect } from 'react';

interface BookInfo {
    title: string;
    genres: string[];
    description: string;
    heroImage: string;
    rating: number;
}

export const ContentPage = () => {
    const { title } = useParams<{ title: string }>();
    const [bookInfo, setBookInfo] = useState<BookInfo | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (title) {
            try {
                // Compare the URL-formatted title with a similarly formatted version of each book title
                const decodedTitle = decodeURIComponent(title);
                const bookEntry = Object.entries(heroData).find(
                    ([_, data]) => {
                        const formattedDataTitle = (data as BookInfo).title.toLowerCase().replace(/\s+/g, '-')
                            .replace(/[^\w-]/g, ''); // Remove special characters
                        const formattedParamTitle = decodedTitle.toLowerCase().replace(/[^\w-]/g, '');
                        return formattedDataTitle === formattedParamTitle;
                    }
                );
                
                if (bookEntry) {
                    setBookInfo(bookEntry[1] as BookInfo);
                } else {
                    setError(`Book with title "${decodedTitle}" not found`);
                }
            } catch (err) {
                setError('Error fetching book information');
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
    }, [title]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!bookInfo) return <div>No book information available</div>;

    return (
        <div className="content-page">
            <h1>{bookInfo.title}</h1>
            <div className="book-details">
                <img 
                    src={`/src/assets/thumbnails/${bookInfo.heroImage}`} 
                    alt={bookInfo.title} 
                    className="book-image"
                />
                <div className="book-info">
                    <p className="book-description">{bookInfo.description}</p>
                    <div className="book-metadata">
                        <p className="book-rating">Rating: {bookInfo.rating}/5</p>
                        <div className="book-genres">
                            {bookInfo.genres.map((genre, index) => (
                                <span key={index} className="genre-tag">{genre}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
