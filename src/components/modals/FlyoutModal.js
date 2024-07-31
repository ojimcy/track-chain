import React from 'react';
import PropTypes from 'prop-types';
import { FaTimes } from 'react-icons/fa';
import { Container } from 'reactstrap';

import './modal.css';
import { Separator } from '../common/CustomBoostrap';

function FlyoutModal({
  title,
  children,
  isOpen,
  closeIconMargin,
  handleClose,
}) {
  return (
    <div style={{ width: '100%' }}>
      <Container>
        <div className={`flyout ${isOpen ? 'show' : ''}`}>
          <div className="flyout-header mb-5">
            <div className="flyout-header-text">
              <h1>{title}</h1>
            </div>
            <div className="flyout-header-icon">
              <FaTimes
                className="close-icon mb-3"
                onClick={handleClose}
                style={{ marginLeft: closeIconMargin }}
              />
            </div>
            <Separator />
          </div>
          <div className="flyout-content">{children}</div>
        </div>
      </Container>
    </div>
  );
}

FlyoutModal.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
  closeIconMargin: PropTypes.string,
  handleClose: PropTypes.func.isRequired,
};

FlyoutModal.defaultProps = {
  closeIconMargin: '0px',
};

export default FlyoutModal;
