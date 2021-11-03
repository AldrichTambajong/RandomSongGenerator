import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class EditEvents extends Component {

  constructor(props) {
    super(props);

    this.onChangeClass = this.onChangeClass.bind(this);
    this.onChangeSemester = this.onChangeSemester.bind(this);
    this.onChangeOptionalInfo = this.onChangeOptionalInfo.bind(this);
    this.onChangeStartDate = this.onChangeStartDate.bind(this);
    this.onChangeEndDate = this.onChangeEndDate.bind(this);
    this.onChangeMeeting = this.onChangeMeeting.bind(this);
    this.onChangeFrom = this.onChangeFrom.bind(this);
    this.onChangeTo = this.onChangeTo.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      eventclass: '',
      semester: '',
      optionalInfo: '',
      startdate: new Date(),
      enddate: new Date(),
      meeting: '',
      from: '',
      to: ''
    }
  }

  componentDidMount(){
      axios.get('http://localhost:5000/events/'+this.props.match.params.id)
        .then(response => {
            this.setState({
                eventclass: response.data.eventclass,
                semester: response.data.semester,
                optionalInfo: response.data.optionalInfo,
                startDate: new Date(response.data.startDate),
                endDate: new Date(response.data.endDate),
                meeting: response.data.meeting,
                from: response.data.from,
                to: response.data.to
            })
        })
  }

  onChangeClass(e) {
    this.setState({
      eventclass: e.target.value
    })
  }

  onChangeSemester(e) {
    this.setState({
      semester: e.target.value
    })
  }

  onChangeOptionalInfo(e) {
    this.setState({
      optionalInfo: e.target.value
    })
  }

  onChangeStartDate(startDate) {
    this.setState({
      startDate: startDate
    })
  }

  onChangeEndDate(endDate) {
    this.setState({
      endDate: endDate
    })
  }

  onChangeMeeting(e) {
    this.setState({
      meeting: e.target.value
    })
  }

  onChangeFrom(e) {
    this.setState({
      from: e.target.value
    })
  }

  onChangeTo(e) {
    this.setState({
      to: e.target.value
    })
  }

  onChangeFile=event=>{
      this.setState({
          file:event.target.files[0],
          loaded:0
      })
  }

  onSubmit(e) {
    e.preventDefault();

    const event = {
      eventclass: this.state.eventclass,
      semester: this.state.semester,
      optionalInfo: this.state.optionalInfo,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      meeting: this.state.meeting,
      from: this.state.from,
      to: this.state.to
    }

    console.log(event);

    axios.post('http://localhost:5000/events/update/'+this.props.match.params.id,event)
    .then(res => {
        console.log(res.data)
    })
    .catch(error =>{
        console.log(error.response)
    });

    this.setState({
        eventclass:'',
        semester:'',
        optionalInfo:'',
        startDate:new Date(),
        endDate:new Date(),
        meeting:'',
        from:'',
        to:''
    })
  }

  render() {
    return (
    <div>
      <h3>Edit Event</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Class: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.eventclass}
              onChange={this.onChangeClass}
              />
        </div>

        <div className="form-group"> 
          <label>Semester: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.semester}
              onChange={this.onChangeSemester}
              />
        </div>

        <div className="form-group">
          <label>Optional Info: </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.optionalInfo}
              onChange={this.onChangeOptionalInfo}
              />
        </div>

        <div className="form-group">
            <label>Meeting Info:</label>
            <input
                type="text"
                className="form-control"
                value={this.state.meeting}
                onChange={this.onChangeMeeting}
                />
        </div>

        <div className="form-group">
          <label>Start Date: </label>
          <div>
            <DatePicker
              selected={this.state.startDate}
              onChange={this.onChangeStartDate}
            />
          </div>
        </div>

        <div className="form-group">
          <label>End Date: </label>
          <div>
            <DatePicker
              selected={this.state.endDate}
              onChange={this.onChangeEndDate}
            />
          </div>
        </div>

        <div className="form-group">
            <label>From:</label>
            <input
                type="time"
                className="form-control"
                value={this.state.from}
                onChange={this.onChangeFrom}
                />
        </div>

        <div className="form-group">
            <label>To:</label>
            <input
                type="time"
                className="form-control"
                value={this.state.to}
                onChange={this.onChangeTo}
                />
        </div>

        <div className="form-group">
          <input type="submit" value="Change Event" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}
