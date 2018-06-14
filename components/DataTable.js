import React, { Component } from 'react'
import { hydrate, css } from 'react-emotion'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'

dayjs.extend(advancedFormat)

// Adds server generated styles to emotion cache.
// '__NEXT_DATA__.ids' is set in '_document.js'
if (typeof window !== 'undefined') {
  hydrate(window.__NEXT_DATA__.ids)
}

class DataTable extends Component {

  hoursToDays = (hours) => {
    return hours / 8;
  }

  displayDays = (hours) => {
    if (hours == 0) {
      return '';
    } else {
      const days = this.hoursToDays(hours);
      const word = days > 1 ? 'days' : 'day';
      return `${hours} hours (${days} ${word})`;
    }
  }

  displayDates = (startDate, endDate) => {
    return (
      endDate == ''
        ? dayjs(startDate).format('Do MMM YY')
        : `${dayjs(startDate).format('Do MMM YY')} - ${dayjs(endDate).format('Do MMM YY')}`
    );
  }

  render() {
    const { data } = this.props;
    return (
      <table className={tableStyles} >
        <thead>
          <tr>
            <th>Balance</th>
            <th>Dates</th>
            <th>Duration</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {data.map(entry =>
            <tr key={entry.id}>
              <td>{this.displayDays(entry.balance)}</td>
              <td>{this.displayDates(entry.hol_start_date, entry.hol_end_date)}</td>
              <td>{this.displayDays(entry.duration)}</td>
              <td>{entry.description}</td>
            </tr>
          )}
        </tbody>
      </table>
    )
  }
}

export default DataTable;

const tableStyles = css`
  border-collapse: collapse;
  width: 90vw;
  th, td {
    border: 1px solid grey;
  }
  th, td {
    padding: 15px;
    text-align: left;
  }
  th {
    background-color: #26ADE4;
    color: white;
  }
  tr:nth-child(even) {
    background-color: #D2E4FC;
}
  tr:nth-child(odd) {
    background-color: #fff;
}
`