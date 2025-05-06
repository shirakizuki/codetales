import { useParams, Link } from 'react-router-dom';
import heroData from '../data/hero.section.json';
import { useState, useEffect, useRef } from 'react';
import { Footer } from '@/components/Footer';
import Navbar from '@/components/Navbar';

interface BookInfo {
    title: string;
    genres: string[];
    description: string;
    heroImage: string;
    rating: number;
}

interface Comment {
    username: string;
    text: string;
    timestamp: string;
}

export const ContentPage = () => {
    const { title } = useParams<{ title: string }>();
    const [bookInfo, setBookInfo] = useState<BookInfo | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [commentText, setCommentText] = useState<string>('');
    const [username, setUsername] = useState<string>('');

    const latestReleaseRef = useRef<HTMLDivElement>(null);
    const commentsRef = useRef<HTMLDivElement>(null);

    // Sample latest chapter data (this would typically come from an API)
    const latestChapter = {
        number: 1,
        releaseDate: '1 hour ago'
    };

    // Sample comments (this would typically come from an API)
    const demoComments: Comment[] = [
        {
            username: 'Charles Peter Tigoy',
            text: 'This story is so good! I\'m out of words of how the possibility of the comic is.',
            timestamp: '1 minute ago'
        },
        {
            username: 'John Doe',
            text: 'Amazing story! Can\'t wait for the next chapter.',
            timestamp: '2 minutes ago'
        },
        {
            username: 'Jane Smith',
            text: 'The plot twists are incredible!',
            timestamp: '5 minutes ago'
        }
    ];

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
                    // In a real app, you would fetch comments here
                    setComments(demoComments);
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

    const scrollToLatestRelease = () => {
        latestReleaseRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const scrollToComments = () => {
        commentsRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleSubmitComment = (e: React.FormEvent) => {
        e.preventDefault();
        if (commentText.trim() && username.trim()) {
            const newComment = {
                username,
                text: commentText,
                timestamp: 'Just now'
            };
            setComments([newComment, ...comments]);
            setCommentText('');
            setUsername('');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!bookInfo) return <div>No book information available</div>;

    return (
        <>
            <Navbar />
            <div className="content-page">
                <div className="hero-section bg-cover bg-center p-8 text-white" 
                     style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(/src/assets/thumbnails/${bookInfo.heroImage})` }}>
                    <div className="book-header">
                        <h1 className="text-2xl font-bold">{bookInfo.title}</h1>
                        <div className="author-info mt-1">Author: BSCS - 2A</div>
                    </div>
                    <div className="book-details flex flex-col md:flex-row gap-6 mt-4">
                        <img 
                            src={`/src/assets/thumbnails/${bookInfo.heroImage}`} 
                            alt={bookInfo.title} 
                            className="book-image max-w-[200px] shadow-lg"
                        />
                        <div className="book-info">
                            <p className="book-description">{bookInfo.description}</p>
                            <div className="book-metadata mt-4">
                                <p className="book-rating">
                                    Rating: {Array(Math.round(bookInfo.rating)).fill('★').join('')} {bookInfo.rating}/5
                                </p>
                                <div className="book-genres flex flex-wrap gap-2 mt-2">
                                    {bookInfo.genres.map((genre, index) => (
                                        <span key={index} className="genre-tag bg-gray-800 px-3 py-1 rounded-full text-xs">
                                            {genre}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="action-buttons mt-6 flex gap-4">
                        <button 
                            className="read-btn bg-codetales-pink text-white px-6 py-2 rounded font-bold hover:bg-codetales-pink/90 transition-colors"
                            onClick={scrollToLatestRelease}
                        >
                            Read
                        </button>
                        <button 
                            className="comments-btn bg-transparent text-white px-6 py-2 rounded border border-white hover:bg-white/10 transition-colors"
                            onClick={scrollToComments}
                        >
                            Comments
                        </button>
                    </div>
                </div>

                {/* Latest Release Section */}
                <div className="latest-release p-8 border-b border-gray-700" ref={latestReleaseRef}>
                    <h2 className="text-xl font-bold mb-4">Latest Release</h2>
                    <div className="chapter">
                        <Link 
                            to={`/content/${title}/read/comic`} 
                            className="block p-4 bg-gray-900 rounded-md hover:bg-gray-800 transition-colors text-white no-underline"
                        >
                            <div className="chapter-header flex justify-between">
                                <h3 className="font-semibold">Chapter {latestChapter.number}</h3>
                                <span className="text-gray-400">{latestChapter.releaseDate}</span>
                            </div>
                        </Link>
                    </div>
                </div>

                {/* Comments Section */}
                <div className="comments-section p-8" ref={commentsRef}>
                    <h2 className="text-xl font-bold mb-6">Comments</h2>
                    
                    {/* Comment Form */}
                    <div className="comment-form mb-8">
                        <h3 className="text-lg font-medium mb-3">Write your comments</h3>
                        <form onSubmit={handleSubmitComment} className="flex flex-col gap-4">
                            <textarea 
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                placeholder="Write your comments"
                                className="w-full min-h-[100px] p-2 rounded bg-gray-900 text-white border border-gray-700 focus:border-codetales-pink focus:outline-none"
                            />
                            <div className="flex justify-between items-center">
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Enter your name"
                                    className="p-2 rounded bg-gray-900 text-white border border-gray-700 focus:border-codetales-pink focus:outline-none"
                                />
                                <button
                                    type="submit"
                                    className="bg-codetales-pink text-white px-6 py-2 rounded hover:bg-codetales-pink/90 transition-colors"
                                >
                                    Post
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Comments List */}
                    <div className="comments-sort mb-4 flex">
                        <button 
                            className="bg-transparent text-codetales-pink border-none mr-4 font-bold cursor-pointer"
                        >
                            Newest
                        </button>
                        <button
                            className="bg-transparent text-gray-400 border-none cursor-pointer hover:text-codetales-pink transition-colors"
                        >
                            Oldest
                        </button>
                    </div>

                    <div className="comments-list space-y-6">
                        {comments.map((comment, index) => (
                            <div key={index} className="comment mb-6 pb-4 border-b border-gray-700"> 
                                <div className="flex justify-between">
                                    <strong className="text-codetales-pink">{comment.username}</strong>
                                    <span className="text-xs text-gray-400">{comment.timestamp}</span>
                                </div>
                                <p className="mt-2">{comment.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
