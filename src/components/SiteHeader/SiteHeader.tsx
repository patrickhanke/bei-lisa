import React from 'react';

interface SiteHeaderProps {
    isMobile?: boolean;
}

const SiteHeader: React.FC<SiteHeaderProps> = ({ isMobile = false }) => {
    if (isMobile === true) return (
        <div>SiteHeader</div>
    );
    return null;
};

export default SiteHeader;
