import React, { useState, useEffect } from 'react'
//import { useHistory } from 'react-router-dom'
import { primaryBadge } from '../../genFunctions/genFunctions'
import { store } from '../../redux/store'
import { connect } from 'react-redux'

import { useHistory } from 'react-router'

import {
  CBadge,
  CAlert,
  CCard,
  CModal,

  CModalTitle,
  //CFormText,
  CCardFooter,
  //CInputFile,
  //CInputCheckbox,
  //CInputRadio,
  //CInputGroup,
  //CInputGroupAppend,
  //CInputGroupPrepend,
  //CDropdown,
  //CInputGroupText,
  //CSelect,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CButton,
} from '@coreui/react'
import usersData from './FormsList'
import { storeData } from '../../redux/storeData';

//import CIcon from '@coreui/icons-react'

const FormTransform = ({match}) => {
  const history = useHistory()
  const [modalDelConf, setModalDelConf] = useState(false);
  const [modalData, setModalData] = useState(false);
  const [loading, setLoading] = useState(true)
//  const [loading, setLoading] = useState(true)
  const [userlist, setuserlist] = useState(usersData.usersData)
  
    
  const toggleData = ()=>{
	store.dispatch({ type: 'CHANGE_STATE', payload: { Spinner: " " } })  
    setModalData(!modalData);
	//console.log(store.getState())
  }	

	
  async function generateData() {
    await fetch("http://localhost:9333/forms/generate")
      .then(res => res.json())
      //return
		
    history.go(0)
	}


async function MyfetchData() {
	await fetch("http://localhost:9333/forms/all/list")
      .then(res => res.json())
      .then(
        (result) => {
          if(result){
            console.log(1221122,result)
		  setuserlist(result)
		  //console.log(Datalist)
	        }
		  //return
		}).catch((response) => {
      setLoading(false)
});	
	
    setLoading(false)
}

const toggleDelConf = ()=>{
    setModalDelConf(!modalDelConf);
  }
 
useEffect(() => {
  var dassd = storeData.getState().form_id;
  console.log(212112,dassd)
  MyfetchData();
  

}, []);		
  return (
    <CRow>
      <CCol xl={12}>
        <CCard>
          <CCardHeader>
            Forms Data
            <small className="text-muted"> List Data</small>
          </CCardHeader>
          <CCardBody >
		  <CModal
        show={modalDelConf}
        onClose={toggleDelConf}
      >
        <CModalHeader>
          <CModalTitle>Confirmation</CModalTitle>
        </CModalHeader>
        <CModalBody>
          You are about to delete this item
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary"  onClick={toggleDelConf}>
            Cancel
          </CButton>
          <CButton color="danger">Proceed</CButton>
        </CModalFooter>
      </CModal>
		  <CModal
        show={modalData}
        onClose={toggleData}
      >
        <CModalHeader closeButton>{store.getState().HeadModal}</CModalHeader>
        <CModalBody>
		<CAlert color="success" className={store.getState().ShowHideAl}>{store.getState().AlertMsg}</CAlert>
       
        </CModalBody>
        <CModalFooter>
          {' '}
          <CButton
            color="secondary"
            onClick={toggleData}
          >Cancel</CButton>
        </CModalFooter>
      </CModal>
          <CDataTable
            items={userlist}	
            fields={usersData.fields}
            hover
            striped
            //clickableRows
			loading={loading}
            //onRowClick={(item) => history.push(`/formmanagement/listusers/${item.id}/`+page)}
            scopedSlots = {{
				'index':
                (item,index)=>(
				  <td>
				   <CBadge color="info">
                      {index+1}
                   </CBadge>
				  </td>
                ),
				'id':
                (item)=>(
				  <td>
				  {primaryBadge(item.id)}
				  </td>
                )
            }}
          />
          </CCardBody>
        </CCard>
      </CCol>
      <CCardFooter>
          <CButton size="sm" color="success" onClick={generateData} > Generate</CButton>
          </CCardFooter>
    </CRow>
  )
}

const mapStateToProps = (state, action) => {
  console.log(state)
  return { state: action.history.location.pathname };
};

export default connect(mapStateToProps,{ store: store })(FormTransform)
