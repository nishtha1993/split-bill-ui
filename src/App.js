//import React, { useState, useEffect } from 'react';
//import logo from './logo.svg';
import './App.css';
import Sidebar from "./components/sidebar";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Box, Container, Toolbar } from "@mui/material";
import Home from "./pages/home";
import Expenses from "./pages/Expenses";
import Groups from "./pages/Groups";
import ErrorPage from "./pages/404";

function App() {
  //const [healthStatus, setHealthStatus] = useState('');

  /*
  useEffect(() => {
    fetchHealth();
  }, []);

  const fetchHealth = async () => {
    try {
      const url = "http://split-ms-env.eba-7nqqpwsj.us-east-1.elasticbeanstalk.com" 
      const requestUrl = url + "/health"
      const response = await fetch(requestUrl);
      
      // const response = await fetch(requestUrl, {
      //                               method: 'GET',
      //                               headers: {
      //                                 'Access-Control-Allow-Origin': '*'
      //                               },
      //                             });
      
      if (!response.ok) {
        throw new Error('Failed to fetch');
      }
      const data = await response.text();
      setHealthStatus(data);
    } catch (error) {
      console.error('Error fetching health status:', error);
    }
  };
  */

  return (
    <Router>
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Toolbar />
        <Box>
          <Container maxWidth="lg">
            {
              <Routes>
                <Route exact path={"React-Sidebar-example/"} element={<Home/>} />
                <Route path={"React-Sidebar-example/Expenses"} element={<Expenses/>} />
                <Route path={"React-Sidebar-example/Groups"} element={<Groups/>} />
                <Route
                  path="*"
                  element={<ErrorPage/>}
                />
              </Routes>
            }
          </Container>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
