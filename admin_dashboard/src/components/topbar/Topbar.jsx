import React from "react";
import "./topbar.css";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";

export default function Topbar() {
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">lamaadmin</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Settings />
          </div>
          <img src="https://media-exp1.licdn.com/dms/image/C5603AQFM8Ob4Y5uysg/profile-displayphoto-shrink_100_100/0/1646472541953?e=1676505600&v=beta&t=wK7ZDpBRXVufIzKAaPmxLyMs9fN8_xzNLdFxDYfNGhA" alt="" className="topAvatar" />
        </div>
      </div>
    </div>
  );
}
