import React from 'react'
import './App.css';
import Table from './components/Table';
import Header from './components/Header';
const App = () => {
  return (
   <>
   
   <Header></Header>
   <h1 style={{marginLeft:32,marginTop:35}}>ToDos</h1>
   <Table></Table>
   </>
  )
}

export default App
