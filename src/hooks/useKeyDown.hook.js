import React, { useEffect } from 'react';

const useKeyDown = (code, callback) => {
    const handleKey = (ev) => {

        if (ev.code === code) {
            document.activeElement.blur()
            callback();
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', handleKey)
        return () => {
            window.removeEventListener('keydown', handleKey);
        }
    })

}

export default useKeyDown;