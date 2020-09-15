import React, { Component } from "react";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from "react-bootstrap-table-next";

import "./Table.css";
import "./alert.css";

const columns = [
  {
    dataField: "date",
    text: "Дата",
  },
  {
    dataField: "time",
    text: "Время",
  },
  {
    dataField: "adress",
    text: "Адрес",
  },
  {
    dataField: "lat",
    text: "Широта",
  },
  {
    dataField: "long",
    text: "Долгота",
  },
];

class Table1 extends Component {
  state = {
    id: "",
    modal: false,
  };

  tableRowEvents = {
    onClick: (e, row, rowIndex) => {
      this.setState({ id: rowIndex, modal: true });
    },
  };
  infoData(id) {
    const { modal } = this.state;
    const info = this.props.data[id];
    if (!modal) {
      return null;
    } else {
      return (
        <div className=" alertm_all    ">
          <div className="alertm_h1\">Погода в это время</div>
          <a
            href="#"
            onClick={() => this.closeMoadal()}
            className="alertm_close"
          >
            x
          </a>
          <div className="alertm_wrapper">
            Время: {info.time} <br />
            Дата: {info.date} <br />
            Адрес: {info.adress} <br />
            Погода: {info.weather}
            <br />
            температура: {info.temp}°
          </div>
          <div className="alertm_but" onClick={() => this.closeMoadal()}>
            OK
          </div>
        </div>
      );
    }
  }
  closeMoadal() {
    this.setState({ modal: false });
  }
  render() {
    const { id } = this.state;
    const info = this.infoData(id);
    return (
      <div>
        <BootstrapTable
          keyField="id"
          data={this.props.data}
          columns={columns}
          rowEvents={this.tableRowEvents}
        />
        {info}
      </div>
    );
  }
}

export default Table1;
