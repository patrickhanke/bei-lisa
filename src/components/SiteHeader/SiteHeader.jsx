import PropTypes from 'prop-types';

import React from 'react';

const SiteHeader = ({isMobile}) => {
   if (isMobile === true )return (
    <div>SiteHeader</div>
  )
}

SiteHeader.propTypes = {
    isMobile: PropTypes.bool
}

SiteHeader.defaultProps = {
    isMobile: false
}


export default SiteHeader