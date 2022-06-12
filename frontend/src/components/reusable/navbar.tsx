import * as React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faHome, faMessage } from "@fortawesome/free-solid-svg-icons";
import "../../css/navbar.css";
import { runInThisContext } from "vm";

interface NavBarProps {}

interface NavBarState {
  isNavMenuActive: boolean;
  isSortingMenuActive: boolean;
}

class NavBar extends React.Component<NavBarProps, NavBarState> {
  state: Readonly<NavBarState> = {
    isNavMenuActive: false,
    isSortingMenuActive: false,
  };

  private checkActive(name: string) {
    const { isNavMenuActive, isSortingMenuActive } = this.state;
    switch (name) {
      case "navigation": {
        if (isNavMenuActive) return "navigation active";
        else return "navigation";
      }
      case "sorting": {
        if (isSortingMenuActive) return "sorting active";
        else return "sorting";
      }
      default:
        console.error("Name not found in checkActive function");
        return "";
    }
  }

  private openMenu(name: string) {
    const { isNavMenuActive, isSortingMenuActive } = this.state;
    switch (name) {
      case "navigation": {
        if (isNavMenuActive) this.setState({ isNavMenuActive: false });
        else this.setState({ isNavMenuActive: true });
        break;
      }
      case "sorting": {
        if (isSortingMenuActive) this.setState({ isSortingMenuActive: false });
        else this.setState({ isSortingMenuActive: true });
        break;
      }
      default:
        console.error("Name not found in openMenu function");
        break;
    }
  }

  private checkExitMenus() {
    const { isNavMenuActive, isSortingMenuActive } = this.state;
    if (isNavMenuActive && isSortingMenuActive) {
      this.setState({ isNavMenuActive: false, isSortingMenuActive: false });
      return null;
    }

    if (isNavMenuActive) {
      this.setState({ isNavMenuActive: false });
    }

    if (isSortingMenuActive) {
      this.setState({ isSortingMenuActive: false });
    }
  }

  render(): React.ReactNode {
    return (
      <div className="container">
        <div onClick={() => this.checkExitMenus()} className="rest"></div>
        <nav
          onClick={() => this.openMenu("navigation")}
          className={this.checkActive("navigation")}
        >
          <span id="span1"></span>
          <span id="span2"></span>
          <span id="span3"></span>
        </nav>
        <div
          onClick={() => this.openMenu("sorting")}
          className={this.checkActive("sorting")}
        >
          <div className="title">Filters</div>
        </div>
      </div>
    );
  }
}

export default NavBar;
