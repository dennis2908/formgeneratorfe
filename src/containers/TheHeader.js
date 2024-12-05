import { useEffect, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { storeData } from '../views/redux/storeData';
import { useHistory } from 'react-router'


import { useSelector, useDispatch } from 'react-redux'
import {
  CHeader,
  CToggler,
  CHeaderBrand,
  CHeaderNav,
  CHeaderNavItem,
  CHeaderNavLink,
  CSubheader,
  CBreadcrumbRouter,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

// routes config
import routes from '../routes'

const TheHeader = () => {

  const history = useHistory()

// then add this to the function that is called for re-rendering


  const [data, setData] = useState([]);
  const [getCounty] = useState([]);
  useEffect(() => {
    axios
      .get(
        "http://localhost:9333/forms/group"
      )
      .then((response) => {
        if(response.data){
        console.log(response.data);
        setData(response.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const country = [...new Set(data.map((item) => item.Form_id))];
  // console.log(country);

  // console.log(data);

  const handleCountry = async (event, value) => {
    let states = data.filter((state) => state.country === value);
    states = [...new Set(states.map((item) => item.name))];
    states.sort();
    console.log(111,value)
    await storeData.dispatch({
      type: 'CHANGE_STATE',
      payload: { form_id: value },
    });

    history.go(0)

    // setState(states);
  };
  const dispatch = useDispatch()
  const sidebarShow = useSelector(state => state.sidebarShow)

  const toggleSidebar = () => {
    const val = [true, 'responsive'].includes(sidebarShow) ? false : 'responsive'
    dispatch({type: 'set', sidebarShow: val})
  }

  const toggleSidebarMobile = () => {
    const val = [false, 'responsive'].includes(sidebarShow) ? true : 'responsive'
    dispatch({type: 'set', sidebarShow: val})
  }

  return (
    <CHeader withSubheader>
      <CToggler
        inHeader
        className="ml-md-3 d-lg-none"
        onClick={toggleSidebarMobile}
      />
      <CToggler
        inHeader
        className="ml-3 d-md-down-none"
        onClick={toggleSidebar}
      />
      <CHeaderBrand className="mx-auto d-lg-none" to="/">
        <CIcon name="logo" height="48" alt="Logo"/>
      </CHeaderBrand>

      <CHeaderNav className="d-md-down-none mr-auto">
       
        <CHeaderNavItem className="px-7">
      
          <CHeaderNavLink><Autocomplete
         style={{width: "400px"}}
        onChange={(event, value) => handleCountry(event, value)}
        id="country"
        className="ml-12"
        getOptionLabel={(country) => `${country}`}
        options={country}
        isOptionEqualToValue={(option, value) => option.name === value.name}
        noOptionsText={"No Available Data"}
        renderOption={(props, country) => (
          <Box component="li" {...props} key={country} value={getCounty}>
            {country}
          </Box>
        )}
        renderInput={(params) => <TextField {...params} label="Select Form" />}
      /></CHeaderNavLink>
        </CHeaderNavItem>
      </CHeaderNav>

      <CSubheader className="px-3 justify-content-between">
        <CBreadcrumbRouter 
          className="border-0 c-subheader-nav m-0 px-0 px-md-3" 
          routes={routes} 
        />
        
      </CSubheader>
    </CHeader>
  )
}

export default TheHeader
