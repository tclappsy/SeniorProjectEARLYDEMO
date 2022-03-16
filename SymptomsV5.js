import React, { useEffect, useState } from "react";
import ResultList from "./ResultList";
import "./Symptoms.css"


var symptomsCounter = 0;

    function SymptomsV5(props) {
        const [symptom, setSymptom] = useState([]); //list of ALL symptoms from API
        const [singleSymptom, setSingleSymptom] = useState() //chosen symptom from select box. becomes rewritten when another symptom is selected
        const [symptomList, setSymptomList] = useState([]) // the state of the selected symptoms from the drop down 
        const [symptomID, setSymptomID] = useState() //the ID of the symptom when added to the list. becomes rewritten when submitting another symptom
        const [symptomIdList, setSymptomIdList] = useState([]) // the list of all symptom IDs in the list on the screen
        const [searchButton, setSearchButton] = useState(false) //tracks if the user hits the search button for a diagnosis. then searches
        const [specialistButton, setSepicalistButton] = useState(false);
        const [mutatedList, setMutatedList] = useState([]) //this list will be used for the drop down and will be modified as the user selects symptoms


    useEffect(() => {
        
        fetch("/symptoms")
        .then(res=>res.json())
        .then((symptom)=> {
            const newSymptom = symptom.map((s) => {
                return s;
            })
            
            setSymptom(newSymptom);
            setMutatedList(newSymptom)
            console.log('ALL SYMPTOMS', symptom); //logs current state after filling it with mapped array

        })

        

    }, [])

    //this is called when the second button is hit

    useEffect(() => {

        var y
        const tempList = mutatedList.map((s) => {
            if(s.Name === singleSymptom)
            {
                y = s.ID
                setSymptomID(y) //sets current state to the id of the chosen symptom. putting this in useEffect allows the state to be set before it is added to the array. This was originally inside the clickHandler but it was adding the state to the list before it was updated. This resulted in a NULL value in the 0 index
            }
        })
        

    })
        
    const handleRemove = (id) => {
        const newList = mutatedList.filter((test) => test.ID !== id)
        setMutatedList(newList)
    }

    const handleSingleRemove = (name) => {

        var tempID = 0;
        symptom.map((s) => {
            if(s.Name === name) {
                tempID = s.ID;
            }
        })

        console.log(tempID);
        
       const newList = symptomList.filter((test) => test !== name)
       const newIDList = symptomIdList.filter((test) => test !== tempID)

       setSymptomList(newList);
       setSymptomIdList(newIDList);

       symptomsCounter--;
       console.log('symptoms counter', symptomsCounter);

       const test = symptom.map((s) => {
           if(s.Name === name) {
               setMutatedList(oldList => oldList.concat(s))
           }
       })
    }



    const clickHandler = () => {
        
        if(singleSymptom === undefined) {
            console.log('please select a smyptom');
        } else {
            setSymptomList(oldList => oldList.concat(singleSymptom) ) //sets the state of the old list to update the added symptom
            setSymptomIdList(oldIdList => oldIdList.concat((symptomID)) ) //adds current state of the symptom ID to the list of selected symptom IDs
            handleRemove(symptomID)

            symptomsCounter++;
            //console.log('symptoms counter', symptomsCounter);
        }
    }

    const checkStates = () => {
        console.log('RECETNLY SELECTED SYMPTOM: ', singleSymptom) //logs selected symptom
        console.log('SELECTED SYMPTOM LIST: ', symptomList) //log updated list
        console.log('SELECTED SYMPTOM ID LIST: ', symptomIdList) //logs list of chosen symptom IDs
    }

    const getResults = () => {

            // console.log(symptomIdList)
            //with searchbutton set to true itll call API call from other component
            //logic for this is 158/159
            setSearchButton(true)
            
            
    }

    const getSpecialist = () => {
        //console.log(symptomIdList);
         //with searchbutton set to true itll call API call from other component
        //logic for this is 158/159

        setSepicalistButton(true);
    }

    const clearEntry = () => {
        setSearchButton(false)
        setSepicalistButton(false)
        setMutatedList(symptom)
        setSymptomList([])
        setSymptomIdList([])
        setSingleSymptom()
        symptomsCounter=0;
        console.log('symptoms counter', symptomsCounter);
    }

    const clearResults = () => {
        setSearchButton(false)
        setSepicalistButton(false)
        setMutatedList(symptom)
        setSymptomList([])
        setSymptomIdList([])
        setSingleSymptom()
        symptomsCounter = 0;

        console.log('symptoms counter', symptomsCounter);
    }

    const getSymptoms = () => {
        console.log(symptomList);

    }


    return (
        <div>

           

        {/* <div className = "main_header">
            <h1>Symptoms </h1>
            
        </div> */}
        
        <div className = "main_feature">
            <h3>Please select from the drop down menu</h3>
            <br></br>
        

        {/* this select is the drop down box */}
        <select value={singleSymptom} onChange={e=>setSingleSymptom(e.target.value)}>
            
            {/* sets first options to be a dash, with an unidentified value */}
            <option>Select symptoms</option> 

            {mutatedList.map(s => (
                <option key = {s.ID}>
                    {s.Name}
                </option>
                
            ))}
        </select>


        {symptomsCounter != 5 && <button onClick={clickHandler} > Add </button>}

        </div>

        <div className = "selected_container">
            <div className = "selected_items">

        {/* list of selected symptoms */}
            <ul>
                {symptomList.map(s => (
                    <li key = {s}>
                        {s} <button onClick = {() => handleSingleRemove(s)}>delete</button>
                    </li>
                ))} 
            </ul>
            </div>
        </div>

        <div className = "button_container">
            <button onClick={checkStates}>Check States</button>
                    <br/><br/>

            <button onClick={getResults}>Get Diagnosis</button>
            {/* <button onClick = {getSpecialist}>Get Specialist</button> */}
            {/* <button onClick = {clearEntry}>Clear</button> */}
        </div>

        {/* if search button is set to true and the idList contains state then make diagnosis (from ResultsList) */}
        {searchButton === true && <ResultList idList={symptomIdList} symptoms = {symptomList} />}
        {/* {specialistButton === true && <SpecialistList idList = {symptomIdList} />} */}

        <div className = "clear_button">
            {searchButton === true && <button onClick={clearResults}>Clear All</button>}
        </div>

    

        <i class="bi bi-backspace"></i>

        </div>
    )


}

export default SymptomsV5;
