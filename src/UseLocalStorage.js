import { useState, useEffect } from 'react';

const UseLocalStorage = (key, defaultValue) => {
    const [state, setState] = useState(() => {
        let value = window.localStorage.getItem(key) || defaultValue;
        return value;      
    });

    useEffect(() => {
       window.localStorage.setItem(key, state)
    }, [state])

    return [state, setState];
}

export default UseLocalStorage;