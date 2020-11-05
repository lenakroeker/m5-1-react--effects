import React, { useEffect } from 'react';

const useDocumentTitle = (title, fallbackTitle) => {
    useEffect(() => {
        document.title = title + " cookies";
        return () => {
            document.title = fallbackTitle;
        }
    }, [title]);
}

export default useDocumentTitle;