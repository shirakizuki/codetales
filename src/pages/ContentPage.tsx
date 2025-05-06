// React and React Router imports
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

// UI Components
import Navbar from '../components/Navbar';
import { Footer } from '@/components/Footer';
import { Star } from "lucide-react";

// Assets
import chatBubbleIcon from '../assets/icons/chat_bubble.png';
import heartIcon from '../assets/icons/heart2.png';

// Data services and types
import { fetchComicData, saveComment, fetchComments, updateLikes } from '@/hooks/database';
import type { ComicData, CommentData } from '@/hooks/database';

export const ContentPage = () => {
    const { contentId } = useParams<{ contentId: string }>();
    const [bookInfo, setBookInfo] = useState<ComicData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [comment, setComment] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [selectedRating, setSelectedRating] = useState<number | null>(null);
    const [hoverRating, setHoverRating] = useState<number | null>(null);
    const [comments, setComments] = useState<CommentData[]>([]);
    const [isLiked, setIsLiked] = useState<boolean>(false);
    const [, setIsPostingComment] = useState<boolean>(false);
    const [, setCommentError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchComicData(contentId || '');
                setBookInfo(data);
                
                // Also fetch comments for this content
                const commentsData = await fetchComments(contentId || '');
                setComments(commentsData);
                
                // Check if content is liked (from localStorage or user state)
                const likedContents = JSON.parse(localStorage.getItem('likedContents') || '{}');
                setIsLiked(!!likedContents[contentId || '']);
            } catch (err) {
                setError('Failed to fetch book information');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [contentId]);

    // Add like/unlike functionality
    const handleLikeToggle = async () => {
        if (!contentId || !bookInfo) return;
        
        try {
            const newLikeStatus = !isLiked;
            const newLikeCount = newLikeStatus 
                ? (bookInfo.likes || 0) + 1 
                : Math.max((bookInfo.likes || 0) - 1, 0);
            
            // Update like status in database
            const success = await updateLikes(contentId, newLikeCount);
            
            if (success) {
                // Update local state
                setIsLiked(newLikeStatus);
                setBookInfo({
                    ...bookInfo,
                    likes: newLikeCount
                });
                
                // Save liked status to localStorage
                const likedContents = JSON.parse(localStorage.getItem('likedContents') || '{}');
                if (newLikeStatus) {
                    likedContents[contentId] = true;
                } else {
                    delete likedContents[contentId];
                }
                localStorage.setItem('likedContents', JSON.stringify(likedContents));
            }
        } catch (err) {
            console.error('Error updating likes:', err);
        }
    };

    const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setComment(e.target.value);
    };

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    const handleSubmitComment = async (e: React.FormEvent) => {
        e.preventDefault();
        if (comment.trim() && username.trim() && selectedRating !== null && contentId) {
            setIsPostingComment(true);
            setCommentError(null);
            
            const newComment: CommentData = {
                text: comment,
                author: username,
                timestamp: new Date(),
                rating: selectedRating
            };
            
            try {
                // Save the comment to the database
                const success = await saveComment(contentId, newComment);
                
                if (success) {
                    // Add the new comment to the local state
                    setComments([newComment, ...comments]);
                    
                    // Reset the form
                    setComment('');
                    setSelectedRating(null);
                    
                    // Refresh book info to get updated rating
                    const updatedBookInfo = await fetchComicData(contentId);
                    setBookInfo(updatedBookInfo);
                } else {
                    setCommentError('Failed to post comment. Please try again.');
                }
            } catch (err) {
                setCommentError('An error occurred while posting your comment.');
                console.error('Comment submission error:', err);
            } finally {
                setIsPostingComment(false);
            }
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!bookInfo) return <div>No book information available</div>;

    // Calculate filled stars based on rating
    const rating = bookInfo.rating;
    const filledStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.25 && rating % 1 < 0.75;
    const hasFullStar = rating % 1 >= 0.75;
    const totalStars = 5;

    return (
        <div className="flex flex-col min-h-screen bg-codetales-dark">
            {/* Fixed Navbar at the top */}
            <div className="fixed top-0 left-0 right-0 z-50">
                <Navbar />
            </div>
            <main className="flex-1 pt-16 pb-8">
                <div className='relative w-full'>
                    <div className='relative md:min-h-screen bg-codetales-dark'>
                        <div
                            className="absolute inset-0 bg-cover bg-center transition-opacity duration-600"
                            style={{
                                backgroundImage: `url(${bookInfo.thumbnail})`,
                                backgroundPosition: 'center 40%',
                                backgroundSize: 'cover',
                                filter: 'brightness(0.6)',
                            }}
                        ></div>
                        <div className="relative md:min-h-screen inset-0 bg-gradient-to-t from-[#1b1919] via-[#1b1919] via-40% to-transparent md:to-transparent">
                            <div className='container mx-auto flex flex-col items-center justify-start md:justify-center h-full z-20 pt-20 md:pt-0'>
                                <div className="md:mt-32 px-4 w-full max-w-md md:max-w-none mx-auto md:mx-0">
                                    {/* Content container */}
                                    <div className='flex flex-col md:flex-row'>
                                        {/* LEFT COLUMN */}
                                        <div className="flex-shrink-0 mb-6 flex flex-col items-center md:items-start">
                                            <img
                                                src={bookInfo.thumbnail}
                                                alt={bookInfo.title}
                                                className="w-full max-w-[140px] md:max-w-[200px] lg:max-w-xs rounded-lg shadow-lg"
                                            />

                                            {/* Rating stars - visible on all devices */}
                                            <div className="flex items-center mt-4 justify-center md:justify-start">
                                                {Array.from({ length: totalStars }).map((_, index) => {
                                                    // Determine if this star should be filled, half-filled, or empty
                                                    const isFilled = index < filledStars
                                                    const isHalfFilled = !isFilled && index === filledStars && hasHalfStar
                                                    const isLastFilled = !isFilled && !isHalfFilled && index === filledStars && hasFullStar

                                                    return (
                                                        <Star
                                                            key={index}
                                                            className={`w-4 h-4 md:w-5 md:h-5 ${isFilled || isHalfFilled || isLastFilled ? 'fill-codetales-pink' : ''} text-codetales-pink`}
                                                            fill={isFilled || isHalfFilled || isLastFilled ? 'currentColor' : 'none'}
                                                        />
                                                    )
                                                })}
                                                <span className="ml-2 text-white text-xs md:text-sm">{bookInfo.rating?.toFixed(1) || "0.0"}</span>
                                            </div>

                                            {/* Likes, Comments, and Views - visible only on desktop */}
                                            <div className="hidden md:flex flex-wrap justify-start items-center gap-2 mt-4">
                                                <div className="flex items-center mr-3">
                                                    <img src={heartIcon} alt="Likes" className="w-4 h-4 md:w-5 md:h-5 mr-1" />
                                                    <span className="text-white text-xs md:text-sm">{bookInfo.likes} Likes</span>
                                                </div>
                                                <div className="flex items-center mr-3">
                                                    <img src={chatBubbleIcon} alt="Comments" className="w-4 h-4 md:w-5 md:h-5 mr-1" />
                                                    <span className="text-white text-xs md:text-sm">0 Comments</span>
                                                </div>
                                            </div>
                                        </div>
                                        {/* RIGHT COLUMN */}
                                        <div className='flex flex-col w-full mt-4 md:mt-0 md:ml-8 lg:ml-12 items-center md:items-start md:justify-end'>
                                            {/* Title */}
                                            <h1 className="text-center md:text-left text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-2 text-white">
                                                {bookInfo.title}
                                            </h1>
                                            {/* Author info */}
                                            <p className="text-center md:text-left text-gray-300 text-xs md:text-sm mb-4">
                                                Author: {bookInfo.author || 'Unknown'}
                                            </p>
                                            {/* Read, Comments, Like buttons - improved mobile sizing */}
                                            <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-4 w-full">
                                                <Link to={`/read/comic/${contentId}/chapter/1`}>
                                                    <button className="cursor-pointer bg-gradient-to-r from-[#DB2D69] to-[#DB372D] text-white font-semibold py-3 md:py-3 px-6 md:px-8 rounded-lg hover:opacity-90 transition duration-300 text-sm md:text-base flex items-center">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-4 md:w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                                        </svg>
                                                        Read
                                                    </button>
                                                </Link>
                                                <button onClick={() => { const section = document.querySelector('#comments_section'); section?.scrollIntoView({ behavior: 'smooth' }); }} className="cursor-pointer border border-codetales-pink bg-transparent text-codetales-pink font-semibold py-3 md:py-3 px-6 md:px-8 rounded-lg hover:bg-codetales-pink hover:bg-opacity-10 transition duration-300 text-sm md:text-base flex items-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-4 md:w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                                                    </svg>
                                                    Comments
                                                </button>
                                                <button 
                                                    onClick={handleLikeToggle}
                                                    className={`cursor-pointer ${isLiked ? 'bg-codetales-pink bg-opacity-20' : 'bg-transparent'} p-3 rounded-full hover:bg-codetales-pink hover:bg-opacity-10 transition duration-300 flex items-center justify-center`}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill={isLiked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={isLiked ? '0' : '1.5'} style={{ color: '#DB2D69' }}>
                                                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                                    </svg>
                                                </button>
                                            </div>
                                            {/* Summary - visible on all devices */}
                                            <h3 className="text-center md:text-left text-gray-200 text-xs sm:text-sm md:text-xl mb-4 md:mb-6">
                                                {bookInfo.description}
                                            </h3>
                                            {/* Genres/Tags */}
                                            <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4 md:mb-6">
                                                {bookInfo.genre && bookInfo.genre.length > 0 ? (
                                                    bookInfo.genre.map((gen, idx) => (
                                                        <div key={idx} className="bg-[#401F2A] px-3 py-1 md:px-5 md:py-2 rounded-md">
                                                            <h3 className='text-white text-xs md:text-sm'>{gen}</h3>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <>
                                                        <span className="px-3 py-1 bg-codetales-pink bg-opacity-10 border border-codetales-pink rounded-full text-xs text-white">
                                                            No Tags Available
                                                        </span>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container mx-auto px-4 mt-8">
                    <h2 className="text-white text-lg md:text-xl font-semibold mb-4">Latest Release</h2>
                    {bookInfo.chapter && Object.keys(bookInfo.chapter).length > 0 ? (
                        <Link to={`/read/comic/${contentId}/chapter/${Math.max(...Array.from(Object.keys(bookInfo.chapter)).map(Number))}`} className="mb-4">
                            <div className="bg-[#1A1A1A] rounded-md p-4 flex justify-between items-center cursor-pointer hover:bg-gray-800 transition duration-200">
                                <h3 className="text-white font-medium">
                                    Chapter {Math.max(...Array.from(Object.keys(bookInfo.chapter)).map(Number))}
                                </h3>
                                <span className="text-gray-400 text-sm">Available now</span>
                            </div>
                        </Link>
                    ) : (
                        <div className="bg-[#1A1A1A] rounded-md p-4">
                            <p className="text-gray-400">No chapters available yet</p>
                        </div>
                    )}
                </div>
                {/* Add comments section here */}
                <div className="container mx-auto px-4 mt-8 mb-8" id="comments_section">
                    <h2 className="text-white text-lg md:text-xl font-semibold mb-4">Comments</h2>
                    <div className="bg-[#1A1A1A] rounded-lg p-4">
                        <form onSubmit={handleSubmitComment} className="mb-6">
                            <div className="mb-4">
                                <textarea
                                    className="w-full bg-transparent border border-codetales-pink rounded-lg p-4 text-white placeholder-gray-400 focus:outline-none focus:border-pink-400 resize-none"
                                    placeholder="Write your comments"
                                    rows={4}
                                    value={comment}
                                    onChange={handleCommentChange}
                                ></textarea>
                            </div>
                            
                            {/* Number Rating Input */}
                            <div className="flex items-center mb-4">
                                <p className="text-white mr-3">Rating:</p>
                                <div className="flex space-x-2">
                                    {[1, 2, 3, 4, 5].map((num) => (
                                        <button
                                            key={num}
                                            type="button"
                                            className={`cursor-pointer w-8 h-8 rounded-full font-medium flex items-center justify-center transition-colors duration-200
                                                ${(hoverRating !== null && num <= hoverRating) || 
                                                   (hoverRating === null && selectedRating !== null && num <= selectedRating) 
                                                    ? "bg-codetales-pink text-white" 
                                                    : "bg-transparent border border-codetales-pink text-codetales-pink hover:bg-codetales-pink hover:bg-opacity-10"}`}
                                            onClick={() => setSelectedRating(num)}
                                            onMouseEnter={() => setHoverRating(num)}
                                            onMouseLeave={() => setHoverRating(null)}
                                        >
                                            {num}
                                        </button>
                                    ))}
                                </div>
                                {selectedRating === null && (
                                    <span className="ml-2 text-red-400 text-sm">Required</span>
                                )}
                            </div>
                            
                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                                <input
                                    type="text"
                                    className="flex-grow sm:flex-grow-0 sm:w-48 md:w-64 bg-transparent border border-codetales-pink rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-pink-400"
                                    placeholder="Enter your name"
                                    value={username}
                                    onChange={handleUsernameChange}
                                />
                                <button
                                    type="submit"
                                    className={`ml-auto bg-gradient-to-r from-[#DB2D69] to-[#DB372D] text-white font-semibold py-2 px-8 rounded-lg transition duration-300 ${
                                        !comment.trim() || !username.trim() || selectedRating === null 
                                            ? "opacity-50 cursor-not-allowed" 
                                            : "hover:opacity-90 cursor-pointer"
                                    }`}
                                    disabled={!comment.trim() || !username.trim() || selectedRating === null}
                                >
                                    Post
                                </button>
                            </div>
                        </form>
                        
                        {/* Display existing comments */}
                        <div className="mt-6 space-y-4">
                            {comments.length > 0 ? (
                                comments.map((item, index) => (
                                    <div key={index} className="border-b border-gray-700 pb-4">
                                        <div className="flex justify-between items-center mb-2">
                                            <h4 className="text-white font-medium">{item.author}</h4>
                                            <span className="text-gray-400 text-sm">
                                                {item.timestamp.toLocaleDateString()}
                                            </span>
                                        </div>
                                        {/* Display comment rating */}
                                        <div className="flex items-center mb-2">
                                            <span className="text-white mr-1">{item.rating}</span>
                                            <Star className="w-4 h-4 fill-codetales-pink text-codetales-pink" />
                                        </div>
                                        <p className="text-gray-300">{item.text}</p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-400">No comments yet. Be the first to comment!</p>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            <div className="mt-auto">
                <Footer />
            </div>
        </div>
    );
}