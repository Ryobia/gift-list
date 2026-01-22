import React, { useState, useEffect, useRef } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import placeholder from '../../images/store_placeholder.png';
import { ADD_FAVORITE_STORE, REMOVE_FAVORITE_STORE } from '../../utils/mutations';
import { QUERY_ME } from '../../utils/queries';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const Store = (props) => {
    const { store } = props;
    const [open, setOpen] = useState(false);
    const [showLoginPrompt, setShowLoginPrompt] = useState(false);
    const modalRef = useRef(null);
    const cardRef = useRef(null);
    const [modalWidth, setModalWidth] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);

    // Get current user's favorite stores
    const { data: meData } = useQuery(QUERY_ME);
    const isLoggedIn = meData?.me?._id;
    
    // Set up mutations
    const [addFavoriteStore] = useMutation(ADD_FAVORITE_STORE, {
        refetchQueries: [{ query: QUERY_ME }]
    });
    const [removeFavoriteStore] = useMutation(REMOVE_FAVORITE_STORE, {
        refetchQueries: [{ query: QUERY_ME }]
    });

    // tolerate multiple possible field names (keeps component resilient to different data shapes)
    const name = store.storeName || store.name || 'Unknown Store';
    const description = store.storeDescription || store.description || '';
    const link = store.storeURL || store.link || '#';
    const logoSrc = store.storeLogo || store.logo || placeholder;

    // Check if this store is favorited when component mounts or meData changes
    useEffect(() => {
        if (meData?.me?.favoriteStores) {
            const favoriteStoreIds = meData.me.favoriteStores.map(s => s._id);
            setIsFavorite(favoriteStoreIds.includes(store._id));
        }
    }, [meData, store._id]);

    useEffect(() => {
        function onKey(e) {
            if (e.key === 'Escape') setOpen(false);
            if ((e.key === 'Enter' || e.key === ' ') && document.activeElement === modalRef.current) {
                setOpen(false);
            }
        }
        if (open) {
            window.addEventListener('keydown', onKey);
        }
        return () => window.removeEventListener('keydown', onKey);
    }, [open]);

    function openModal() {
        // measure the card width so modal can match it
        try {
            const rect = cardRef.current && cardRef.current.getBoundingClientRect();
            if (rect && rect.width) setModalWidth(Math.round(rect.width));
        } catch (e) {
            // ignore
        }
        setOpen(true);
    }

    function closeModal() {
        setOpen(false);
    }

    async function handleFavoriteToggle(e) {
        e.stopPropagation(); // Prevent modal from opening when clicking heart
        
        if (!isLoggedIn) {
            setShowLoginPrompt(true);
            return;
        }
        
        try {
            if (isFavorite) {
                await removeFavoriteStore({
                    variables: { storeId: store._id }
                });
                setIsFavorite(false);
            } else {
                await addFavoriteStore({
                    variables: { storeId: store._id }
                });
                setIsFavorite(true);
            }
        } catch (error) {
            console.error('Error toggling favorite:', error);
        }
    }

    return (
        <>
            <div
                className="store-item "
                role="button"
                tabIndex={0}
                onClick={openModal}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') openModal();
                }}
                aria-label={`Open ${name} details`}
                ref={cardRef}
                style={{ position: 'relative' }}
            >
                <button 
                    type="button"
                    className="store-favorite-btn"
                    onClick={handleFavoriteToggle}
                    aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                >
                    {isFavorite ? <FaHeart /> : <FaRegHeart />}
                </button>
                <div className="store-logo">
                    <img
                        src={logoSrc}
                        alt={`${name} logo`}
                        onError={(e) => {
                            e.currentTarget.onerror = null; // prevent loop if placeholder also fails
                            e.currentTarget.src = placeholder;
                        }}
                    />
                </div>
                <div className="store-content">
                    <h3 className="store-name">{name}</h3>
                </div>
                
            </div>

            {open && (
                <div
                    className="modal-window"
                    onClick={(e) => {
                        // close when clicking on overlay (outside inner modal div)
                        if (e.target === e.currentTarget) closeModal();
                    }}
                >
                    <div
                        className="modal-content"
                        ref={modalRef}
                        role="dialog"
                        aria-modal="true"
                        aria-label={`${name} details`}
                        style={modalWidth ? { width: modalWidth + 'px', maxWidth: 'calc(100% - 2rem)' } : {}}
                    >
                        <div style={{ position: 'relative', paddingRight: '2.5rem' }}>
                            <h2 style={{ margin: 0 }}>{name}</h2>
                            <button 
                                className="modal-close-btn" 
                                onClick={closeModal} 
                                aria-label="Close"
                            >
                                ✕
                            </button>
                        </div>
                        <div style={{ marginTop: '1rem' }}>
                            <p>{description}</p>

            {showLoginPrompt && (
                <div
                    className="modal-window"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) setShowLoginPrompt(false);
                    }}
                >
                    <div
                        className="modal-content"
                        role="dialog"
                        aria-modal="true"
                        aria-label="Login required"
                    >
                        <div style={{ position: 'relative', paddingRight: '2.5rem' }}>
                            <h2 style={{ margin: 0 }}>Login Required</h2>
                            <button 
                                className="modal-close-btn" 
                                onClick={() => setShowLoginPrompt(false)} 
                                aria-label="Close"
                            >
                                ✕
                            </button>
                        </div>
                        <div style={{ marginTop: '1rem' }}>
                            <p>You must be logged in to favorite stores.</p>
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.5rem' }}>
                            <Link to="/login" style={{ flex: 1 }} onClick={() => setShowLoginPrompt(false)}>
                                <button className="modal-visit-btn" style={{ margin: 0, width: '100%' }}>
                                    Login
                                </button>
                            </Link>
                            <Link to="/signup" style={{ flex: 1 }} onClick={() => setShowLoginPrompt(false)}>
                                <button className="modal-visit-btn" style={{ margin: 0, width: '100%' }}>
                                    Signup
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
                        </div>
                        <a href={link} target="_blank" rel="noopener noreferrer" className="modal-visit-btn">Visit Store</a>
                    </div>
                </div>
            )}
        </>
    );
};

export default Store;