import * as React from "react";
import { Component } from "react";
import ProductCard from "./reusable/productCard";
import "../css/watchTable.css";

interface WatchTableProps {}

interface WatchTableState {}

class WatchTable extends React.Component<WatchTableProps, WatchTableState> {
  render(): React.ReactNode {
    return (
      <section>
        <div className="containter"></div>
      </section>
    );
  }
}

export default WatchTable;
