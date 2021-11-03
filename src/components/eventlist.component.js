import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import axios,{post} from 'axios';
import XLSX from 'xlsx';

const NewEvent = props =>(
    <tr>
        <td>{props.event.eventclass}</td>
        <td>{props.event.semester}</td>
        <td>{props.event.startDate.substring(0,10)}</td>
        <td>{props.event.endDate.substring(0,10)}</td>
        <td>
            <Link to={"/edit/"+props.event._id}>Edit Event</Link> | <a href="#" onClick={() =>{ props.deleteEvent(props.event._id) }}>Delete Event</a>
        </td>
        <td>
            <form action="/users" method="post" encType="multipart/form-data">
                <div className="form-group">
                    <input type="file" name="file" />
                </div>
                <div className="form-group">
                    <input type="submit"  value="Upload" className="btn btn-primary"/>
                </div>
            </form>
        </td>
    </tr>
)

export default class EventList extends Component{
    constructor(props){
        super(props);

        this.deleteEvent = this.deleteEvent.bind(this);
        //this.onFormSubmit = this.onFormSubmit.bind(this);

        this.state = {
            events:[],
            //file:null
        };
    }

    /*fileUpload(file){
        const url = 'http://localhost:5000/';
        const formData = new FormData();
        formData.append('file',file)
        const config = {
            headers: {
                'content-type':'multipart/form-data'
            }
        }
        return post(url,formData,config);
    }

    onSubmitForm(e){

        let file = this.state.file;

        let formdata = new FormData()

        formdata.append


        axios({
            url: 
        })
    }*/

    handleChange(e){
        const files = e.target.files;
        if(files && files[0])this.setState({file:files[0]});
    };

    handleFile(){
        const reader = new FileReader();
        const rABS = !!reader.readAsBinaryString;

        reader.onload = (e) => {
            const bstr = e.target.result;
            const wb = XLSX.read(bstr,{type: rABS ? 'binary' : 'array',bookVBA:true});
        }
    }
    componentDidMount(){
        axios.get('http://localhost:5000/events/')
            .then(response =>{
                this.setState({events: response.data});
            })
            .catch((error) => {
                console.log(error);
            })
    }

    deleteEvent(id){
        console.log(id);
        axios.delete('http://localhost:5000/events/'+id)
            .then(res => console.log(res.data));

            this.setState({
                events: this.state.events.filter(el =>el._id != id)
            })
    }

    eventList(){
        return this.state.events.map(currentevent => {
            return <NewEvent event = {currentevent} deleteEvent={this.deleteEvent} key={currentevent._id}/>;
        })
    }


    render(){
        return(
            <div>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Name</th>
                            <th>Semester</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Modify/Delete</th>
                            <th>Upload File</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.eventList()}
                    </tbody>
                </table>
            </div>
        );
    }
}