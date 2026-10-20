import {useEffect, useState} from 'react';

// Mətni hərf-hərf göstərir. enabled=false olduqda (reduced motion) mətn dərhal tam görünür.
export const useTypewriter = (text: string, enabled: boolean, speed = 28) => {
    const [count, setCount] = useState(enabled ? 0 : text.length);

    useEffect(() => {
        if (!enabled) {
            setCount(text.length);
            return;
        }
        setCount(0);
        const interval = setInterval(() => {
            setCount((value) => {
                if (value >= text.length) {
                    clearInterval(interval);
                    return value;
                }
                return value + 1;
            });
        }, speed);
        return () => clearInterval(interval);
    }, [text, enabled, speed]);

    return {visibleText: text.slice(0, count), done: count >= text.length};
};
