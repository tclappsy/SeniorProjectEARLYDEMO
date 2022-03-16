import React, { Component,  useEffect, useState } from "react"; 
import axios, { Axios } from 'axios' //npm i axios
import "./ResultList.css"
import SpecialistList from "./SpecialistList";
import SymptomsV5 from "./SymptomsV5";
import Map from "./Map";


const gender = 'male';
const age = 30;
const DIAGNOSIS_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Im5hdG8yNTI3QHlhaG9vLmNvbSIsInJvbGUiOiJVc2VyIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvc2lkIjoiOTY2NyIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvdmVyc2lvbiI6IjIwMCIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbGltaXQiOiI5OTk5OTk5OTkiLCJodHRwOi8vZXhhbXBsZS5vcmcvY2xhaW1zL21lbWJlcnNoaXAiOiJQcmVtaXVtIiwiaHR0cDovL2V4YW1wbGUub3JnL2NsYWltcy9sYW5ndWFnZSI6ImVuLWdiIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9leHBpcmF0aW9uIjoiMjA5OS0xMi0zMSIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbWVtYmVyc2hpcHN0YXJ0IjoiMjAyMS0wOS0xMCIsImlzcyI6Imh0dHBzOi8vc2FuZGJveC1hdXRoc2VydmljZS5wcmlhaWQuY2giLCJhdWQiOiJodHRwczovL2hlYWx0aHNlcnZpY2UucHJpYWlkLmNoIiwiZXhwIjoxNjQ3MzcyMzk0LCJuYmYiOjE2NDczNjUxOTR9.7QPuDAod_7-UXSlHWHePFeKfTVEReQplTJP-TPZRL_w';
const ISSUE_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Im5hdG8yNTI3QHlhaG9vLmNvbSIsInJvbGUiOiJVc2VyIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvc2lkIjoiOTY2NyIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvdmVyc2lvbiI6IjIwMCIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbGltaXQiOiI5OTk5OTk5OTkiLCJodHRwOi8vZXhhbXBsZS5vcmcvY2xhaW1zL21lbWJlcnNoaXAiOiJQcmVtaXVtIiwiaHR0cDovL2V4YW1wbGUub3JnL2NsYWltcy9sYW5ndWFnZSI6ImVuLWdiIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9leHBpcmF0aW9uIjoiMjA5OS0xMi0zMSIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbWVtYmVyc2hpcHN0YXJ0IjoiMjAyMS0wOS0xMCIsImlzcyI6Imh0dHBzOi8vc2FuZGJveC1hdXRoc2VydmljZS5wcmlhaWQuY2giLCJhdWQiOiJodHRwczovL2hlYWx0aHNlcnZpY2UucHJpYWlkLmNoIiwiZXhwIjoxNjQ3MzcyNDEyLCJuYmYiOjE2NDczNjUyMTJ9.Nx6QVjkM5gRuZoF-h9ZWn4RyeN02G9nwOcMqmiouz3M';

// const symptom_id = props;

class ResultList extends Component {
    constructor(props) {
        super(props)
        //console.log('ID', props.idList);
        this.result = 'https://sandbox-healthservice.priaid.ch/diagnosis?symptoms=[' + props.idList + ']&gender=' + gender + '&year_of_birth=' + age + '&token=' + DIAGNOSIS_TOKEN + '&format=json&language=en-gb'

        this.state ={
            results: [],
            specialist: [],
            button : false,
            singleIssue: '',
            singleIssueID: '',
            results2: [],
            showComponent: false,
            mapProp: '',
            symptomProp: [],
            user_id: '',
            selected_issue: '',
            med_desc: '',
            date:''
        }
        this._onButtonClick = this._onButtonClick.bind(this);

        
    }

    componentDidMount(){
        axios.get(this.result)
        .then(response => {
            console.log('DIAGNOSIS DATA', response.data)
            this.setState({results: response.data})
        })
        .catch(error => {
            console.log(error)
        })
    }

    getIssue(data) {

        const result2 = 'https://sandbox-healthservice.priaid.ch/issues/' + data + '/info?token=' + ISSUE_TOKEN + '&format=json&language=en-gb'

        axios.get(result2)
        .then(response => {
            console.log('SINGLE ISSUE DATA:', response.data)
            this.setState({results2: [response.data]})
        })

        .catch(error => {
            console.log(error)
        })
    
    }

    fetchSpecialist(data){
        //console.log('SPECIALIST DATA --> ', data)

            //resets state before next button click 
            this.state.specialist = [];

            data.map(s => {
            //console.log("Specialist:", s.Name)
            
            
            this.state.specialist.push(s);

        })

        this.setState(({button}) => ({button: !button}))
        console.log('SPECIALIST STATE:' , this.state.specialist); 
        
    }

    clearSpecialist() {
    
        this.state.specialist = [];
        this.state.singleIssue = '';
        console.log('NEW STATE', this.state.specialist);

        this.setState(({button}) => ({button: button}))
    }

    fetchIssue(data) {
        //this.setState({singleIssue: data});
        this.setState({singleIssue: data})

        //console.log("TEST ->" , this.singleIssue);
    }

    fetchIssueID(data) {
        this.setState({singleIssueID: data});
        console.log("ISSUE ID: ", data);

        //console.log("ISSUE ID STATE" , this.state.singleIssueID);

        this.getIssue(data)
        
    }

    onClickFunctions(name) {
        this._onButtonClick()
        this.setState({mapProp: name})//sets prop state to param value
        switch(this.mapProp) {
            case "General practice":
                this.setState({mapProp: "Physician"})
                break;
            case "Internal medicine":
                this.setState({mapProp: undefined})
                break;
        }

        console.log('Selected specialist:', this.state.specialist);

       
    }


    _onButtonClick() { //function to show map when button is clicked
        this.setState({
            showComponent: true
        })
    }

    fetchAllData(data1,data2,data3) {
        this.fetchSpecialist(data1);
        this.fetchIssue(data2);
        this.fetchIssueID(data3);
    }


    poop(){
        if( this.state.mapProp !== ''){ //checks if prop state is undefined/blank
            console.log("PROP FOR MAP: ", this.state.mapProp)
            return(this.state.showComponent ? <Map prop ={this.state.mapProp}/> : null)
        }
        else(
            console.log("Map prop is undefined/blank")
        )

        //return (this.state.showComponent ? <Map prop ={'urgent care'}/> : null)//map shouldnt be rendered this way, should go through if statement. find out why mapprop is undefined
    }

    test() {

        axios.defaults.withCredentials = true;
        let tester = ''; 

        axios.get('http://localhost:5000/diagnosis').then((response) => {

            tester = response.data.user[0].id;

            //console.log('user id: ', response.data.user[0].id);
            this.setState({user_id: tester});
            console.log('id state: ', this.state.user_id);
        })


    }

    userHistory = () => {

        axios.defaults.withCredentials = true;
        let user_response = ''; 

        axios.get('http://localhost:5000/diagnosis').then((response) => {

            user_response = response.data.user[0].id;
            let date = new Date;
           

            //add more info here
            //console.log('user id: ', response.data.user[0].id);
            this.setState({user_id: user_response});
            this.setState({med_desc: this.state.results2[0].MedicalCondition});
            this.setState({date:date});
            // //console.log('id state: ', this.state.user_id);
            console.log('state --> ', this.state.med_desc);
            console.log('state date --> ', this.state.date);
            console.log('specialist state --> ', this.state.specialist);
        
            axios.post('http://localhost:5000/diagnosis', {
                user_id : this.state.user_id,
                singleIssue: this.state.singleIssue,
                specialist:this.state.specialist,
                symptoms: this.props.symptoms,
                med_desc:this.state.med_desc,
                date:this.state.date
                //need symptoms and specialist to be complete (both arrays)
                
            }).then((response) => {
                console.log(response);
            });

        })
    }

    printHistory() {

        //this.test();

        const specialist = this.state.specialist; 
        const selected_issue = this.state.singleIssue;
        const selected_symptoms = this.props.symptoms; 
        const description = this.state.results2[0].MedicalCondition;

        let date = new Date;


        console.log('---- USER HISTORY ----');

        console.log('Specialist(s): ', specialist);
        console.log('Issue: ', selected_issue);
        console.log("Description: ", description);
        console.log('Symptom list: ', selected_symptoms);
        console.log(date);
        
        console.log('user ID: ' , this.state.user_id);

        //window.location.reload(); --> set this on a time for 5 seconds? then refresh page with message saying "saved!"
        //alert data saved! 2 seconds --> refresh
        //fix CORS issue

        // for(let i =0; i < this.state.specialist.length; i++) {
        //     console.log(this.state.specialist[i].Name);
        // }
        
    }

   
    
    render() {
        const { results, specialist, singleIssue, results2} = this.state
        return (
            <div>
                <div className = "results_header">
                    <h3>Diagnosis:</h3>
                </div>
                
                <div className = "results_container">
                    <div className = "results_wrapper">
                    {
                        results.length ? results.map(result => <div key={result.Issue.ID}> {result.Issue.Name} - {result.Issue.Accuracy}% <button onClick={() => this.fetchAllData(result.Specialisation, result.Issue.Name, result.Issue.ID) }> Diagnose</button></div>) : <p>No Resuls found</p>
                    }
                    
                   

                    </div>

                </div>

                {/* <div className = "specialist_header">
                    <h3>Specialist</h3>
                </div>

                <div className = "specialist_container">
                    <div className = "specialist_wrapper">

                    
                    <div className = "specialist_header">
                        <h3>Selected Issue: <i className = "singleIssue">{singleIssue}</i></h3>
                    </div>
                    

                    {  
                        specialist.length ? specialist.map(s => <div key = {s.ID}>{s.Name}</div>) : <p>Waiting to search...</p> 
                    }  

                    <div className = "clear_specialist_btn">
                        <button onClick = {() => this.clearSpecialist()}>Clear</button>
                    </div>

                    </div>

                    <br></br>

                   
                </div> */}

                <div className = "issue_container">
                
                    <div className = "issue_wrapper">
                    
                    {<h3 className = "issue_header">Info for: <i className = "single_issue">{singleIssue}</i></h3>}


                    { results2.length ? results2.map(r2 => <div key = {r2.Name}>

                            <div className = "issue_medicalcondition">
                                <b>Medical Condition:</b> {r2.MedicalCondition}
                            </div>
                            
                            <br></br>

                            <div className = "issue_description">
                            <b>Description:</b> {r2.Description}
                            </div>

                            <br></br>

                            <div className = "issue_possiblesymptoms">
                                <b>Possible Symptoms: </b>{r2.PossibleSymptoms}
                            </div>

                            <br></br>

                            <div className = "issue_treatment">
                                <b>Treatment Description: </b> {r2.TreatmentDescription}
                            </div>
                            
                            <br></br>

                            <h3>Specialist(s):</h3>
                            <div className = "test">
                            {  
                                specialist.length ? this.state.specialist.map(s => <div key = {s.ID}>{s.Name} <button onClick={() => {this.onClickFunctions(s.Name)}}>Find Near You</button> </div>) : <p>Waiting to search...</p> 
                            }

                            <br></br>
                            
                            </div>

                            <div className = "test">
                            {  
                                <div> <button onClick={() => {this.onClickFunctions('pharmacy')}}>Find Pharmacy Near You</button> </div>
                            }

                            <div className = "save_history">
                                {
                                    <button onClick = {() =>{this.printHistory()}}>Save Results</button>
                                       
                                }       

                                {
                                    <button onClick = {() =>{this.userHistory()}}>TEST</button>
                                }     
                            </div>

                            <br></br>
                            
                            </div>


            
                        </div>
                        ) : <p className = "issue_no_results">No results found</p> 
                    }

                </div>
               
                </div>
                    
                    {this.poop()}
                    
            </div>
        )
    }
}

export default ResultList;