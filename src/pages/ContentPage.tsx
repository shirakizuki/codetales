import { useParams, Link } from 'react-router-dom';
import heroData from '../data/hero.section.json';
import { useState, useEffect } from 'react';
import eyeIcon from '../assets/icons/eye.png';
import chatBubbleIcon from '../assets/icons/chat_bubble.png';
import heartIcon from '../assets/icons/heart2.png';
import Navbar from '../components/Navbar';

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

    // Placeholder stats
    const likes = 18;
    const comments = 16;
    const views = 230;

    useEffect(() => {
        if (title) {
            try {
                const decodedTitle = decodeURIComponent(title);
                const bookEntry = Object.entries(heroData).find(
                    ([_, data]) => {
                        const formattedDataTitle = (data as BookInfo).title.toLowerCase().replace(/\s+/g, '-')
                            .replace(/[^\w-]/g, '');
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
            <div className="content-hero-section dark-bg">
                <div className="hero-card-nobg flex-row pt-0 items-start gap-x-10">
                    <div className="hero-cover">
                        <img 
                            src={`/src/assets/thumbnails/${bookInfo.heroImage}`} 
                            alt={bookInfo.title} 
                            className="cover-image"
                        />
                        <div className="hero-stats-vertical">
                            <div className="hero-stars-row">
                                <span className="hero-stars">{'★'.repeat(Math.round(bookInfo.rating))}{'☆'.repeat(5 - Math.round(bookInfo.rating))}</span>
                                <span className="hero-rating">{bookInfo.rating.toFixed(1)}</span>
                            </div>
                            <div className="hero-meta-row">
                                <span className="hero-likes">{likes} likes</span>
                                <span className="hero-comments">{comments} comments</span>
                                <span className="hero-views">{views} views</span>
                            </div>
                        </div>
                    </div>
                    <div className="hero-info mt-0 pt-15">
                        <h1 className="hero-title mt-0 pt-0 -ml-40">{bookInfo.title}</h1>
                        <div className="hero-author mt-2 -ml-40">Author: B85C - 3A</div>
                        <p className="hero-description mt-3 -ml-40">{bookInfo.description}</p>
                        <div className="hero-buttons flex-row mt-4 -ml-40" style={{alignItems: 'center'}}>
                            <button className="btn hero-read-btn" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6em', borderRadius: '1rem', padding: '0.7rem 2.2rem'}}>
                                <img src={eyeIcon} alt="Read" style={{ width: '1.3em', height: '1.3em' }} />
                                <span>Read</span>
                            </button>
                            <button className="btn hero-comments-btn outlined" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6em', borderRadius: '1rem', padding: '0.7rem 2.2rem'}}>
                                <img src={chatBubbleIcon} alt="Comments" style={{ width: '1.3em', height: '1.3em', filter: 'drop-shadow(0 0 0.5px var(--codetales-pink))' }} />
                                <span>Comments</span>
                            </button>
                            <button className="btn hero-heart-btn outlined" aria-label="Like" style={{
                                background: 'transparent',
                                color: 'var(--codetales-pink)',
                                border: '2px solid var(--codetales-pink)',
                                borderRadius: '1rem',
                                padding: '0.7rem 2.2rem',
                                fontWeight: 700,
                                fontSize: '1.1rem',
                                marginLeft: '0.5rem',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'background 0.2s, color 0.2s',
                            }}>
                                <img src={heartIcon} alt="Like" style={{ width: '1.3em', height: '1.3em' }} />
                            </button>
                        </div>
                        <div className="hero-genres -ml-70 flex-nowrap">
                            {bookInfo.genres.map((genre, idx) => (
                                <span key={idx} className="genre-pill">{genre}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {/* Bottom Section: Latest Release, Comments */}
            <div className="content-bottom-section" style={{ maxWidth: '1250px', margin: '2rem auto', background: 'var(--codetales-dark2)', borderRadius: '1.5rem', padding: '2rem', color: 'white' }}>
                {/* Latest Release */}
                <div className="latest-release-section" style={{ borderBottom: '5px solid var(--codetales-pink)', paddingBottom: '2rem', marginBottom: '2.2rem' }}>
                    <h2 style={{ fontSize: '1.1rem', fontWeight: 400, margin: 0, color: 'white' }}>Latest Release</h2>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.7rem' }}>
                        <span style={{ fontWeight: 700, fontSize: '1.15rem', color: 'white' }}>Chapter 1</span>
                        <span style={{ color: '#aaa', fontSize: '0.98em' }}>1 hour ago</span>
                    </div>
                </div>
                {/* Write Your Comments */}
                <div className="write-comments-section" style={{ marginBottom: '2.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.7rem' }}>
                        <img src={chatBubbleIcon} alt="Comments" style={{ width: '1.3em', height: '1.3em', filter: 'drop-shadow(0 0 0.5px var(--codetales-pink))' }} />
                        <h3 style={{ fontSize: '1.05rem', fontWeight: 500, color: 'var(--codetales-pink)', margin: 0 }}>Write your comments</h3>
                    </div>
                    <form style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                        <textarea
                            placeholder="Write your comments"
                            style={{
                                minHeight: '100px',
                                borderRadius: '0.7rem',
                                border: '2px solid var(--codetales-pink)',
                                background: 'transparent',
                                color: 'white',
                                padding: '1rem',
                                fontSize: '1rem',
                                resize: 'vertical',
                                outline: 'none',
                            }}
                        />
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.7rem' }}>
                            <input
                                type="text"
                                placeholder="Enter your name"
                                style={{
                                    borderRadius: '0.7rem',
                                    border: '2px solid var(--codetales-pink)',
                                    background: 'transparent',
                                    color: 'white',
                                    padding: '0.7rem 1.2rem',
                                    fontSize: '1rem',
                                    width: '200px',
                                    outline: 'none',
                                }}
                            />
                            <button
                                type="submit"
                                className="btn hero-read-btn"
                                style={{
                                    borderRadius: '0.7rem',
                                    padding: '0.7rem 2.2rem',
                                    fontWeight: 700,
                                    background: 'var(--codetales-pink)',
                                    color: 'white',
                                    border: 'none',
                                    fontSize: '1.05rem',
                                    boxShadow: 'none',
                                }}
                            >
                                Post
                            </button>
                        </div>
                    </form>
                </div>
                {/* Comments List */}
                <div className="comments-section">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.7rem' }}>
                        <img src={chatBubbleIcon} alt="Comments" style={{ width: '1.3em', height: '1.3em', filter: 'drop-shadow(0 0 0.5px var(--codetales-pink))' }} />
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 500, color: 'var(--codetales-pink)', margin: 0 }}>Comments</h3>
                        <div style={{ flex: 1, borderBottom: '2px solid var(--codetales-pink)', marginLeft: '0.7rem' }} />
                        <span style={{ color: 'var(--codetales-pink)', fontWeight: 500, fontSize: '1.01rem', marginLeft: '1.5rem', cursor: 'pointer' }}>Newest</span>
                        <span style={{ color: 'white', fontWeight: 500, fontSize: '1.01rem', marginLeft: '1.2rem', cursor: 'pointer' }}>Oldest</span>
                    </div>
                    <div className="comment-list">
                        {/* Example comments, replace with dynamic data later */}
                        {[1,2,3].map((_, idx) => (
                            <div key={idx} className="comment-item" style={{ marginBottom: '1rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ fontWeight: 700, color: 'var(--codetales-pink)', fontSize: '1.01rem' }}>Charles Peter Tiggy</span>
                                    <span style={{ color: 'var(--codetales-pink)', fontWeight: 400, fontSize: '0.98em' }}>( 1 minute ago )</span>
                                </div>
                                <div style={{ marginTop: '0.3rem', color: 'white', fontSize: '1.01rem' }}>This story is so good. Im out of words at this new possibility of the comic. It</div>
                                <div style={{ borderBottom: '1.5px solid var(--codetales-pink)', marginTop: '0.7rem' }} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
