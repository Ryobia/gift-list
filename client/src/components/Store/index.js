import React, { useState, useEffect, useRef } from 'react';
import placeholder from '../../images/store_placeholder.png';

const Store = (props) => {
    const { store } = props;
    const [open, setOpen] = useState(false);
    const modalRef = useRef(null);
    const cardRef = useRef(null);
    const [modalWidth, setModalWidth] = useState(null);

    // tolerate multiple possible field names (keeps component resilient to different data shapes)
    const name = store.storeName || store.name || 'Unknown Store';
    const description = store.storeDescription || store.description || '';
    const link = store.storeURL || store.link || '#';
    const logoSrc = store.storeLogo || store.logo || placeholder;

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

    return (
        <>
            <div
                className="store-item"
                role="button"
                tabIndex={0}
                onClick={openModal}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') openModal();
                }}
                aria-label={`Open ${name} details`}
                ref={cardRef}
            >
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
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h2 style={{ margin: 0 }}>{name}</h2>
                            <button className="sortBtn" onClick={closeModal} aria-label="Close">Close</button>
                        </div>
                        <div style={{ marginTop: '1rem' }}>
                            <p>{description}</p>
                            <a href={link} target="_blank" rel="noopener noreferrer" className="sortBtn">Visit Store</a>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Store;