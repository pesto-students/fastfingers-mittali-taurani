import React from "react";
import "./Header.scss";
import { FaUserAlt, FaGamepad } from "react-icons/fa";

export default function Header(props) {
  return (
    <div className="header-main-content flex-row">
      <section className="user-specific-details flex-column">
        <div><FaUserAlt className="header-icons"/>USER INPUT NAME</div>
        <div><FaGamepad className="header-icons"/>LEVEL : USER INPUT</div>
      </section>
      <section className="game-specific-details flex-column">
        <div className="game-name-common-header">fast fingers</div>
        <div>SCORE: 00:30</div>
      </section>
    </div>
  );
}
