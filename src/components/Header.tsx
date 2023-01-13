import React from 'react';
import GearSystem from './GearSystem';
import Nav from './Nav';

export default function Header() {
  return (
    <header className="header active">
      <Nav />
      <div className="header__content">
        <div className="container">
          <div className="header__content_left_wrapper">
            <div className="header__content_left">
              <h3 className="header__content_name">KONSTANTIN KANG</h3>

              <h1 className="header__content_title pc">
                <span className="header__content_title_span-extra">Hi,</span>
                <span className="">I'm Kang,</span>
                <span className="bordered">Frontend </span>
                <span className="bordered">web-developer.</span>
                <span className="bordered extra">Frontend developer</span>
              </h1>

              <div className="header__content_btn">Contact me</div>
            </div>
          </div>

          <GearSystem />
        </div>
        <div className="scroll_btn_wrapper">
          <span className="scroll_btn"></span>
        </div>
      </div>
    </header>
  );
}
