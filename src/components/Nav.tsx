import React from 'react';

export default function Nav() {
  return (
    <nav className="header__nav">
      <a className="header__nav_logo" href="">
        KANG.
      </a>
      <ul className="header__nav_list">
        <li>
          <a className="header__nav_link" id="navBtn-projects" href="">
            Projects
          </a>
        </li>
        <li>
          <a className="header__nav_link" id="navBtn-about" href="">
            About
          </a>
        </li>
      </ul>
    </nav>
  );
}
