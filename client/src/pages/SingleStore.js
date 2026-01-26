import React from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_STORE, QUERY_ALL_STORES } from "../utils/queries";
import indieindexlogo from "../images/indieindexlogo.jpg";
import banner from "../images/banner.png";

const SingleStore = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(QUERY_STORE, {
    variables: { _id: id },
    skip: !id,
  });
  const {
    loading: storesLoading,
    error: storesError,
    data: storesData,
  } = useQuery(QUERY_ALL_STORES);

  if (loading || storesLoading) return <div>Loading...</div>;
  if (error || storesError) return <div>Error loading store.</div>;
  if (!data || !data.store) return <div>Store not found.</div>;

  const { storeName, storeURL, storeLogo, storeDescription, dateAdded, tags } = data.store;

  // Find stores that share all the same tags, excluding the current store
  let recommendedStores = [];
  if (storesData && storesData.allStores && tags && tags.length > 0) {
    recommendedStores = storesData.allStores.filter(s => {
      if (s._id === id) return false;
      if (!s.tags || s.tags.length === 0) return false;
      // Check if every tag in 'tags' is present in s.tags
      return tags.every(tag => s.tags.includes(tag));
    });
  }

  return (
    <div>
      <Link className="back-link" to="/">
        ← Back to Home
      </Link>
      <header
        className="header-image"
        style={{
          backgroundImage: `url(${banner})`,
        }}
      ></header>

      <div className="single-store-page">
        <div className="single-store-header">
          <h1>{storeName}</h1>
          {storeLogo && (
            <img
              src={storeLogo ? storeLogo : indieindexlogo}
              alt={storeName + " logo"}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = indieindexlogo;
              }}
              style={{ maxWidth: 200, marginBottom: 16 }}
            />
          )}
        </div>
        <div className="single-store-details">
          <p className="single-store-description">{storeDescription}</p>
          <div className="single-store-bottom">
            {storeURL && (
              <p>
                <a
                  className="single-store-url"
                  href={storeURL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit Store
                </a>
              </p>
            )}
            {tags && tags.length > 0 && (
              <div className="single-store-tags">
                <strong>Tags:</strong> {tags.join(", ")}
              </div>
            )}
          </div>
        </div>
      </div>
        {recommendedStores.length > 0 && (
          <div className="">
            <h2>You might also like</h2>
            <div className="single-store-footer">
              {recommendedStores.map(store => (
                <Link key={store._id} to={`/stores/${store._id}`} className="store-recommendation-card">
                  <div>
                    <img
                      src={store.storeLogo ? store.storeLogo : indieindexlogo}
                      alt={store.storeName + ' logo'}
                      onError={e => { e.currentTarget.onerror = null; e.currentTarget.src = indieindexlogo; }}
                      style={{ maxWidth: 100, marginBottom: 8 }}
                    />
                    <div>{store.storeName}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
    </div>
  );
};

export default SingleStore;
