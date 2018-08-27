/* eslint react/no-did-update-set-state: 0 */
import React, { Component } from "react";
import { hydrate, injectGlobal } from "react-emotion";
import HolidayTable from "../components/HolidayTable";
import db from "../firestore";
import AddHoliday from "../components/AddHoliday";

// Adds server generated styles to emotion cache.
// '__NEXT_DATA__.ids' is set in '_document.js'
if (typeof window !== "undefined") {
  hydrate(window.__NEXT_DATA__.ids);
}

class Index extends Component {
  state = this.getInitialState();

  getInitialState() {
    const { holidays } = this.props;
    return {
      holidays,
      updated: false
    };
  }

  // static async getInitialProps() {
  // const data = [
  //   { id: 1, description: 'Opening balance', hol_start_date: '2018-04-01', hol_end_date: '', duration: 0, balance: 200 },
  //   { id: 2, description: 'Wales trip', hol_start_date: '2018-04-09', hol_end_date: '2018-04-13', duration: 40, balance: 160 },
  //   { id: 3, description: 'Friday off (Solo)', hol_start_date: '2018-06-08', hol_end_date: '2018-06-08', duration: 8, balance: 152 },
  //   { id: 4, description: 'Wedding in Devon', hol_start_date: '2018-08-08', hol_end_date: '2018-08-10', duration: 24, balance: 128 },
  //   { id: 5, description: 'Sept week off', hol_start_date: '2018-09-10', hol_end_date: '2018-09-14', duration: 40, balance: 88 },
  //   { id: 6, description: 'Christmas', hol_start_date: '2018-12-24', hol_end_date: '2018-12-28', duration: 24, balance: 64 },
  // ]
  // return { data }
  // }
  static async getInitialProps() {
    const collection = await db
      .collection("holidays")
      .orderBy("hol_start_date")
      .get();
    const holidays = await collection.docs.map(doc => {
      const holData = doc.data();
      return { id: doc.id, ...holData };
    });
    return { holidays };
  }

  async componentDidUpdate() {
    const { updated } = this.state;
    if (updated) {
      const collection = await db
        .collection("holidays")
        .orderBy("hol_start_date")
        .get();
      const holidays = await collection.docs.map(doc => {
        const holData = doc.data();
        return { id: doc.id, ...holData };
      });
      this.setState({ holidays, updated: false });
    }
  }

  setUpdated = () => {
    this.setState({ updated: true });
  };

  lastBalance = hols =>
    // const balances = hols.map(hol => hol.balance);
    // return Math.min(...balances);
    hols.reduce(
      (min, h) => (h.balance < min ? h.balance : min),
      hols[0].balance
    );

  render() {
    const { holidays } = this.state;
    const lastBal = this.lastBalance(holidays);
    return (
      <div>
        <h1>Holiday Balance Tracker</h1>
        <h3>Holiday year runs from April 1st to March 31st</h3>
        <HolidayTable holidays={holidays} />
        <AddHoliday lastBalance={lastBal} onAddRefresh={this.setUpdated} />
      </div>
    );
  }
}

export default Index;

// Styling

injectGlobal`
  html, body {
    padding: 1rem 1rem;
    margin: 0;
    background: papayawhip;
    min-height: 100%;
    font-family: Helvetica, Arial, sans-serif;
    font-size: 24px;
  }
`;
