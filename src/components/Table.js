
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './Table.css'

let baseURL ='https://jsonplaceholder.typicode.com/todos'
let baseURL1 ='https://jsonplaceholder.typicode.com/users'

export default function Table() {
    const [customer, setCustomer] = useState([]);
    const [details, setDetails] = useState([])
    const [searchInput, setSearchInput] = useState("")
    const [filteredResults, setFilteredResults] = useState([]);

  useEffect(()=>{
    getData();
  },[])

const getData =()=>{
    axios.get(baseURL)
    .then((response) => {
     setCustomer(response.data)
     });
  } 

const UserDetails =(id)=>{
  axios.get(`${baseURL1}/${id}`)
   .then((response) => {
     setDetails(response.data)
     });
    return(<>
      <div className='App'>
        <div className='userDetails'>
            <div>ToDo ID:<strong>{details.id}</strong></div> 
            <div>Name :<strong>{details.name}</strong> </div> 
            <div>User Name:<strong>{details.username}</strong></div>
            <div>Email :<strong>{details.email}</strong></div> 
            </div>
      </div>
    
    </>)
  }

    const searchItems = (searchValue) => {
         setSearchInput(searchValue)
         if (searchInput !== '') {
            const filteredData = customer.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
            })
            setFilteredResults(filteredData)
        }
        else{
            setFilteredResults(customer)
        }
    }
    const sortAscending = () => {
     const numAscending = [...customer].sort((a, b) => a.id - b.id);
     setCustomer(numAscending)
   }
    const sortDescending = () => {
      const numDescending = [...customer].sort((a, b) => b.id - a.id);
    setCustomer(numDescending)
   }


  return (<>
      <div className='App'>
       
        <form>
        <input  className="search" icon='search'
                placeholder='Search...'
                onChange={(e) => searchItems(e.target.value)}
            />
        </form>
        <table className="table table-stripped">
            <thead>
                <tr>
                    <th>ID <button onClick={()=>sortDescending()}>#</button></th>
                    <th>Title</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                { searchInput.length > 1 ? (
                    filteredResults.map((item) =>{
                        return(<>
                        {item.id <= 10 && 
                 <tr key={item.id}>
                   <td>{item.id}</td>
                   <td>{item.title}</td>
                   <td>{item.completed}</td>
                   <td><button style={{fontWeight:'bold'}} onClick={()=>UserDetails(item.id)}>View Status</button> </td>
                </tr>
                    }</>)
                })
                )
                :
                customer.map((item,i) => {
                        return(<>
                        {item.id <= 10 && 
                 <tr key={item.id}>
                   <td>{item.id}</td>
                   <td>{item.title}</td>
                   <td>{item.completed}</td>
                   <td><button style={{backgroundColor:"navy",color:"white",borderRadius:10}} onClick={()=>UserDetails(item.id)}>View User</button> </td>
                </tr>
                    }
                    </>)
                })
              }
            </tbody>
        </table>
        <div className='App'>
         {details !=''? 
          <UserDetails/> : null 
          }
        </div>
    </div>
    </>
  )
}
