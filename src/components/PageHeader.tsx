import React from 'react';
import { Link } from 'react-router-dom';

const PageHeader = ({upperTitle, lowerTitle, imageUrl}: 
  {upperTitle: string, lowerTitle: string, imageUrl: string}) => (
    <div className="page-header">
      <div className="content-container height-100">
          <div className="pageheader-container">
            <div className="pageheader__content">
              <img src={imageUrl} alt="Header Image" className="pageheader__image" />
              <h2 className="pageheader__title">
                <small>{upperTitle}</small>
                <br/>
                <span>{lowerTitle}</span>
              </h2>
            </div>
            <div className="pageheader__nav">
              <Link className="pageheader__nav__link" to="/">
                  Home
              </Link>
              <Link className="pageheader__nav__link" to="/globalleader">
                  Global Leaderboard
              </Link>
              <Link className="pageheader__nav__link" to="/allwaifus">
                  All Waifus
              </Link>
            </div>
          </div>
      </div>
    </div>
);

export default PageHeader;