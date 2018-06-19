import React, { Component } from 'react';
import { hydrate, injectGlobal } from 'react-emotion';
import DataTable from '../components/DataTable';
import firebase from '../firestore';

// Adds server generated styles to emotion cache.
// '__NEXT_DATA__.ids' is set in '_document.js'
if (typeof window !== 'undefined') {
  hydrate(window.__NEXT_DATA__.ids)
}

class Index extends Component {

  state = {
    holidays: this.props.holidays,
    loading: false
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
    const collection = await firebase.collection('holidays').get();
    const holidays = await collection.docs.map(doc => {
      const holData = doc.data();
      return { id: doc.id, ...holData }
    });
    return { holidays }
  }

  // componentDidMount() {
  //   firebase
  //     .collection('holidays')
  //     .get()
  //     .then(collection => {
  //       const holidays = collection.docs.map(doc => doc.data())
  //       this.setState({ holidays })
  //     })
  // }

  // componentWillUnmount() {
  //   db.close();
  // }

  render() {
    const { holidays } = this.state
    return (
      <div>
        <h1>Holiday Balance Tracker</h1>
        <h3>Holiday year runs from April 1st to March 31st</h3>
        <DataTable holidays={holidays} />
      </div>
    )
  }
}

export default Index

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
`

