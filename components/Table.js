import React, { Component } from "react";
import Table1 from "./Table1";

let data;
if (localStorage.getItem("data")) {
  data = JSON.parse(localStorage.getItem("data")).slice(0, 10);
} else {
  data = [{ long: "", lat: "", adress: "", weather: "  ", temp: "" }];
}

class Table extends Component {
  render() {
    return (
      <div className="Table">
        <p className="Table-header">Последние 10 запросов</p>
        <Table1 data={data} />
      </div>
    );
  }
}

export default Table;
