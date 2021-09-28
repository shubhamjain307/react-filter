import React,{ useEffect, useState } from 'react';
import axios from 'axios'
import DataTable from 'react-data-table-component';
import { useHistory,withRouter } from "react-router-dom"
import Select from 'react-select'

function SectionA(props) {

    const [apiData,setApiData] = useState([])
    const [searchField, setSearchField] = useState("");
    const [query, setQuery] = useState("")
    const history = useHistory()
    const [operand,setOperand] = useState(">")
    const [number,setNumber] = useState(">")
    const [startDate,setStartDate] = useState("")
    const [endDate,setEndDate] = useState("")
    const [cityData,setCityData] = useState([]) 

    const options = [
      { value: '<', label: '<' },
      { value: '>', label: '>' },
      { value: '=', label: '=' },
      { value: '>=', label: '>=' },
      { value: '<=', label: '>=' }
    ]

    const apiUrl = `https://testjob-walkwel.herokuapp.com/`
    useEffect(()=>{
      
       getData()
       const params = new URLSearchParams()
    if (query) {
      params.append("name", query)
    } else {
      params.delete("name")
    }
    //history.push({search: params.toString()})
 
    },[query,history])

    const getData = async() =>{
      const respData = await axios.get(apiUrl)
      console.log("data",respData)
      
      let cityArr = []
      respData.data.data.map((apiResp)=>{
           let obj = {}
           obj.value = apiResp.city
           obj.label = apiResp.city
           cityArr.push(obj)
      })

      if(cityArr.length>0)
        setCityData(cityArr)

      setApiData(respData.data.data)
    }
    const handleChange = e => {
      setSearchField(e.target.value);
      let val = e.target.value
      setQuery(e.target.value)
      const filteredData= apiData.filter(
        resp => {
          return (
            resp
            .firstName
            .toLowerCase()
            .includes(searchField.toLowerCase()) 
            || 
            resp
            .lastName
            .toLowerCase()
            .includes(searchField.toLowerCase()) 
            ||
            resp
            .email
            .toLowerCase()
            .includes(searchField.toLowerCase()) 
            ||
            resp
            .address
            .toLowerCase()
            .includes(searchField.toLowerCase()) 
          );
        }
      );

      setApiData(filteredData);
    };

    const handleOperandChange = (e) =>{
      let val = e.value
      setOperand(val)
      const filteredData= apiData.filter(
        resp => {
          switch(val){
              case '<':
                 return resp.iq < number 
              case '>':
                return(resp.iq > number)
           
              case '=':
                return (resp.iq == number)
              case '>=':
                return(resp.iq >= number)
                 
              case '<=':
                return(resp.iq <= number)
                
              default:
                return true          
          }
        }
      );

      setApiData(filteredData);
    }

    const handleNumberChange = (e) => {
      let num = e.target.value
      setNumber(num)
    }

    const handleStartDateChange = (e) => {
      let stDate = e.target.value
      stDate = new Date(stDate).getTime()
      setStartDate(stDate)

      const filteredData= apiData.filter(
        resp => {
               return (resp.dob >= stDate || resp.dob <= endDate )  
        }
      );

      setApiData(filteredData);
    }
    

    const handleEndDateChange = (e) => {
      let etDate = e.target.value
      etDate = new Date(etDate).getTime()
      setEndDate(etDate)
      const filteredData= apiData.filter(
        resp => {
               console.log("con",resp.dob >= startDate || resp.dob <= etDate)
               return(resp.dob >= startDate && resp.dob <= etDate )  
                 
          
        }
      );
     
      setApiData(filteredData);
    }

  return(
    <>
        <input 
          className="pa3 bb br3 grow b--none bg-lightest-blue ma3"
          type = "search" 
          placeholder = "Search People" 
          onChange = {handleChange}
        />
    
        <input 
          className="pa3 bb br3 grow b--none bg-lightest-blue ma3"
          type = "number" 
          placeholder = "Search IQ" 
          onChange = {handleNumberChange}
        />

        <input 
          className="pa3 bb br3 grow b--none bg-lightest-blue ma3"
          type = "date" 
          placeholder = "Start Date" 
          onChange = {handleStartDateChange}
        />  

        <input 
          className="pa3 bb br3 grow b--none bg-lightest-blue ma3"
          type = "date" 
          placeholder = "End Date" 
          onChange = {handleEndDateChange}
        /> 
     <Select options={options}  onChange={handleOperandChange} />
      <table>
      <th>First name </th>
      <th>Last name </th>
      <th>Email </th>
      <th>Date of birth </th>
      <th>Address </th>
      <th>City </th>
      <th>Gender </th>
      <th>IQ </th>
      <tbody>
      {apiData && apiData.map((data)=>{
        return (
        <>
            <tr>
                <td>
                {data.firstName}
                </td>
                <td>
                {data.lastName}
                </td>
                <td>
                {data.email}
                </td>
                <td>
                {data.dob}
                </td>
                <td>
                {data.address}
                </td>
                <td>
                {data.city}
                </td>
                <td>
                {data.gender}
                </td>
                <td>
                {data.iq}
                </td>
            </tr>
        
    
        </>)
       })
      }
      </tbody>
     </table> 
    
  </>
  );
}

export default SectionA;