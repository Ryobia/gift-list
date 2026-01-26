import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import placeholder from '../../images/store_placeholder.png';
import { ADD_FAVORITE_STORE, REMOVE_FAVORITE_STORE } from '../../utils/mutations';
import { QUERY_ME } from '../../utils/queries';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const Store = (props) => {
    const { store } = props;
    const [showLoginPrompt, setShowLoginPrompt] = useState(false);
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

    const navigate = useNavigate();

    // Check if this store is favorited when component mounts or meData changes
    useEffect(() => {
        if (meData?.me?.favoriteStores) {
            const favoriteStoreIds = meData.me.favoriteStores.map(s => s._id);
            setIsFavorite(favoriteStoreIds.includes(store._id));
        }
    }, [meData, store._id]);





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
        <div
            className="store-item"
            style={{ position: 'relative', cursor: 'pointer' }}
            onClick={() => navigate(`/stores/${store._id}`)}
        >
            <button 
                type="button"
                className="store-favorite-btn"
                onClick={e => { e.stopPropagation(); handleFavoriteToggle(e); }}
                aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
                {isFavorite ? <FaHeart /> : <FaRegHeart />}
            </button>
            <div className="store-logo">
                <img
                    src={logoSrc}
                    alt={`${name} logo`}
                    onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = placeholder;
                    }}
                />
            </div>
            <div className="store-content">
                <h3 className="store-name">{name}</h3>
            </div>
        </div>
    );
};

export default Store;