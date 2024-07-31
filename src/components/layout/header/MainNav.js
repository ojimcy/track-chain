import React from 'react';
import './main-nav.css';
import {  Container, Navbar } from 'reactstrap';

const userName = 'cryptzjay.tg';

function MainNav() {
  return (
    <header>
      <Navbar className="navbar" expand="md">
        <Container className="d-flex align-items-cente justify-content-between">
          <div className="user-avatar align-items-cente justify-content-between">
            <span className="avatar">CJ</span>
            <span className="username">{userName}</span>
          </div>
        </Container>
      </Navbar>
    </header>
  );
}

export default MainNav;
