import React, {Component} from "react";
import axios from 'axios'
import "./SpecialistList.css"

const gender = 'male';
const age = 30;
const SPECIALIST_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Im5hdG8yNTI3QHlhaG9vLmNvbSIsInJvbGUiOiJVc2VyIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvc2lkIjoiOTY2NyIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvdmVyc2lvbiI6IjIwMCIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbGltaXQiOiI5OTk5OTk5OTkiLCJodHRwOi8vZXhhbXBsZS5vcmcvY2xhaW1zL21lbWJlcnNoaXAiOiJQcmVtaXVtIiwiaHR0cDovL2V4YW1wbGUub3JnL2NsYWltcy9sYW5ndWFnZSI6ImVuLWdiIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9leHBpcmF0aW9uIjoiMjA5OS0xMi0zMSIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbWVtYmVyc2hpcHN0YXJ0IjoiMjAyMS0wOS0xMCIsImlzcyI6Imh0dHBzOi8vc2FuZGJveC1hdXRoc2VydmljZS5wcmlhaWQuY2giLCJhdWQiOiJodHRwczovL2hlYWx0aHNlcnZpY2UucHJpYWlkLmNoIiwiZXhwIjoxNjQzMTU2OTgxLCJuYmYiOjE2NDMxNDk3ODF9.taeuHFOVMMe2FGpOvD4q6ajiWL1G7NnOOZrf1MhVFtI';
const z = 238;

class SpecialistList extends Component {
    constructor(props) {
        super(props)

        //logs prop FOR TESTING PURPOSES
        //console.log('prop value: ' ,props.idList);

        this.result = 'https://sandbox-healthservice.priaid.ch/diagnosis/specialisations?symptoms=[' + props.idList + ']&gender=' + gender + '&year_of_birth=' + age + '&token=' + SPECIALIST_TOKEN + '&format=json&language=en-gb';
        
        //implementation of state (results array which will hold API returned data)
        this.state = {
            results: []
        }
    }

    //makes API call, sets state (results) to API returned data
    componentDidMount() {
        axios.get(this.result)
        .then(response => {
            console.log('SPECIALIST DATA' ,response.data);
            this.setState({results:response.data})

            //log current state now that its filled
            //console.log('STATE', this.state.results);
            
        })
        .catch(error => {
            console.log(error);
        })
    }


    render() {
        const {results} = this.state;
        return (
            <div>

                <div className = "specialist_header">
                    <h3>Specialist</h3>
                </div>

                <div className = "specialist_container">
                    <div className = "specialist_wrapper">
                {
                    results.length ? results.map(result => 
                        <div key = {result.ID}>{result.Name} - {result.Accuracy}% </div>) : <p>no results found</p>
                }
                    </div>

                </div>                
            </div>
        )
    }








}

export default SpecialistList;

