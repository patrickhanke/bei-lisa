import { useState, useEffect } from 'react';

interface LayoutHookReturn {
    mainclientheight: number | null;
    scrollheight: number | undefined;
}

export const useLayoutHook = (): LayoutHookReturn => {
    const [mainclientheight, setMainClientHeight] = useState<number | null>(null);
    const [scrollheight, setScrollheight] = useState<number>();

    const handleScroll = (e: Event): void => {
        setScrollheight(window.scrollY);
    };
    
    useEffect(() => {
        window.addEventListener("scroll", handleScroll, false);
        const mainWrapper = document.getElementById('mainwrapper');
        if (mainWrapper) {
            setMainClientHeight(mainWrapper.clientHeight);
        }
        return () => window.removeEventListener("scroll", handleScroll, false);
    }, [scrollheight]);

    return {
        mainclientheight,
        scrollheight,
    };
};
