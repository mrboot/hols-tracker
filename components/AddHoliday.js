import React, { Component } from 'react';
import firebase from '../firestore';

class AddHoliday extends Component {


  addHolidayToDB = (data) => {
    firebase.collection('holidays').add(data);
  }

  daysToHours = (numDays) => {
    return numDays * 8;
  }

  setBalance = (duration) => {
    const { lastBalance } = this.props;
    return lastBalance - this.daysToHours(duration);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new window.FormData(form);
    const payload = {};
    payload["description"] = formData.get("description");
    payload["hol_start_date"] = formData.get("hol-start");
    payload["hol_end_date"] = formData.get("hol-end");
    payload["duration"] = this.daysToHours(formData.get("duration"));
    payload["balance"] = this.setBalance(formData.get("duration"));
    this.addHolidayToDB(payload);
    form.reset();
    this.props.onAddRefresh();
  }

  render() {
    return (
      <div>
        <h3>Add New Holiday</h3>
        <form id="add-holiday" onSubmit={this.handleSubmit}>
          <input placeholder="Description" name="description" type="text" required />
          <input placeholder="From: YYYY-MM-DD" name="hol-start" type="text" required />
          <input placeholder="To: YYYY-MM-DD" name="hol-end" type="text" required />
          <input placeholder="Duration (days)" name="duration" type="number" min="0.5" step="0.5" required />
          <button className='submit' type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

export default AddHoliday;