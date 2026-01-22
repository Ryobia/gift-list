import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import banner from "../images/banner.png";
import Store from "../components/Store";
import Footer from "../components/Footer";
import { QUERY_ALL_STORES, QUERY_ME } from "../utils/queries";
import { PiCompassBold } from "react-icons/pi";
import { FiSearch } from "react-icons/fi";

const Home = () => {
  const { loading, error, data } = useQuery(QUERY_ALL_STORES);
  const { data: meData } = useQuery(QUERY_ME);
  const [sortBy, setSortBy] = useState("favorites-first");
  const [selectedTags, setSelectedTags] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const stores = data?.allStores || [];
  const favoriteStoreIds = useMemo(() => {
    return new Set(meData?.me?.favoriteStores?.map(store => store._id) || []);
  }, [meData]);

  // Extract unique tags from all stores
  const allTags = useMemo(() => {
    const tagSet = new Set();
    stores.forEach((store) => {
      if (store.tags && Array.isArray(store.tags)) {
        store.tags.forEach((tag) => tagSet.add(tag));
      }
    });
    return Array.from(tagSet).sort();
  }, [stores]);

  // Filter by tags, search, and sort
  const filteredAndSortedStores = useMemo(() => {
    let filtered = stores;

    // Filter by search term
    if (searchTerm.trim() !== "") {
      const lower = searchTerm.toLowerCase();
      filtered = filtered.filter(store => {
        const nameMatch = (store.storeName || store.name || "").toLowerCase().includes(lower);
        const descMatch = (store.storeDescription || store.description || "").toLowerCase().includes(lower);
        const tagsMatch = (store.tags || []).some(tag => tag.toLowerCase().includes(lower));
        return nameMatch || descMatch || tagsMatch;
      });
    }

    // Filter by selected tags - only show stores with ALL selected tags
    if (selectedTags.length > 0) {
      filtered = stores.filter((store) =>
        selectedTags.every((tag) => store.tags && store.tags.includes(tag))
      );
    }

    // Apply sorting
    return [...filtered].sort((a, b) => {
      const aName = (a.storeName || a.name || "").toLowerCase();
      const bName = (b.storeName || b.name || "").toLowerCase();
      const aDate = new Date(a.dateAdded || 0).getTime();
      const bDate = new Date(b.dateAdded || 0).getTime();
      const aIsFavorite = favoriteStoreIds.has(a._id);
      const bIsFavorite = favoriteStoreIds.has(b._id);

      switch (sortBy) {
        case "favorites-first":
          if (aIsFavorite && !bIsFavorite) return -1;
          if (!aIsFavorite && bIsFavorite) return 1;
          return aName.localeCompare(bName);
        case "name-asc":
          return aName.localeCompare(bName);
        case "name-desc":
          return bName.localeCompare(aName);
        case "newest":
          return bDate - aDate;
        case "oldest":
          return aDate - bDate;
        default:
          return 0;
      }
    });
  }, [stores, sortBy, selectedTags, favoriteStoreIds, searchTerm]);

  if (loading) return <p>Loading stores...</p>;
  if (error) return <p>Error loading stores: {error.message}</p>;

  function toggleTag(tag) {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }

  function clearFilters() {
    setSelectedTags([]);
  }

  return (
    <main className="homePage">
      {/* Text and Search Bar over header image */}
      <div className="search-bar-div">
        <div className="search-bar-text">Discover Unique. Support Local. <br></br> Shop Indie Index</div>
        <div className="search-bar-wrapper">
          <input
            className="search-bar"
            type="text"
            placeholder="Search stores, tags, descriptions..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <span className="search-icon">
            <FiSearch size={18} />
          </span>
        </div>
      </div>
      <header 
        
        className="header-image"
        style={{
          backgroundImage: `url(${banner})`,
          
        }}
      ></header>
      {/* Sidebar toggle button (mobile) */}
      <button
        className="sidebarToggleBtn"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label="Toggle sidebar"
      >
        <PiCompassBold /> Filters
      </button>

      {/* Main content with sidebar */}
      <div className="homeContentWrapper">
        {/* Sidebar with sorting and tag options */}
        <aside className={`homeSidebar ${sidebarOpen ? "open" : ""}`}>
          <button
            className="sidebarCloseBtn"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            ✕
          </button>

          <div className="sortingOptions">
            <h3>Sort By</h3>
            <div className="sortButtonGroup">
              <button
                className={`sortBtn ${sortBy === "favorites-first" ? "active" : ""}`}
                onClick={() => setSortBy("favorites-first")}
              >
                Favorites First
              </button>
              <button
                className={`sortBtn ${sortBy === "name-asc" ? "active" : ""}`}
                onClick={() => setSortBy("name-asc")}
              >
                Name (A-Z)
              </button>
              <button
                className={`sortBtn ${sortBy === "name-desc" ? "active" : ""}`}
                onClick={() => setSortBy("name-desc")}
              >
                Name (Z-A)
              </button>
              <button
                className={`sortBtn ${sortBy === "newest" ? "active" : ""}`}
                onClick={() => setSortBy("newest")}
              >
                Newest First
              </button>
              <button
                className={`sortBtn ${sortBy === "oldest" ? "active" : ""}`}
                onClick={() => setSortBy("oldest")}
              >
                Oldest First
              </button>
            </div>
          </div>

          {/* Tag Filtering */}
          {allTags.length > 0 && (
            <div className="tagsFilter">
              <h3>Filter by Tags</h3>
              <div className="tagButtonGroup">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    className={`tagBtn ${selectedTags.includes(tag) ? "active" : ""}`}
                    onClick={() => toggleTag(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
              {selectedTags.length > 0 && (
                <button className="clearFiltersBtn" onClick={clearFilters}>
                  Clear Filters
                </button>
              )}
            </div>
          )}
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="sidebarOverlay"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
        )}



        {/* Stores section */}
        <section className="storesSection">
          
          <div className="stores-container ">
            {filteredAndSortedStores.length > 0 ? (
              filteredAndSortedStores.map((store) => (
                <Store
                  key={store._id}
                  store={store}
                />
              ))
            ) : (
              <div className="no-stores-message">
                <p>
                  No stores found matching all selected tags.
                </p>
                {selectedTags.length > 0 && (
                  <p>
                    Try selecting fewer tags or clearing your filters.
                  </p>
                )}
              </div>
            )}
          </div>
        </section>
      </div>
            <Footer />
    </main>
  );
};

export default Home;
