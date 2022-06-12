import * as React from "react";
import { Component } from "react";
import NavBar from "./reusable/navbar";
import WatchTable from "./watchTable";
import "../css/watches.css";

interface WatchesProps {}

interface WatchesState {}

class Watches extends React.Component<WatchesProps, WatchesState> {
  render(): React.ReactNode {
    return (
      <div className="watchesContainer">
        <NavBar />
        <WatchTable />
      </div>
    );
  }
}

export default Watches;
