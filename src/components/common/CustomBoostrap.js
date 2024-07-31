import React from 'react';
import PropTypes from 'prop-types';

const Separator = ({ className }) => (
  <div className={`separator ${className}`} />
);

Separator.propTypes = {
  className: PropTypes.string,
};

export { Separator };
