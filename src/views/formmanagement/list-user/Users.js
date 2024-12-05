import React, { useState, useEffect } from 'react'
//import { useHistory } from 'react-router-dom'
import { primaryBadge } from '../../genFunctions/genFunctions'
import { store } from '../../redux/store'
import { connect } from 'react-redux'
import {
  CBadge,
  CAlert,
  CCard,
  CSpinner,
  CModal,
  CForm,
  CFormGroup,
  CModalTitle,
  //CFormText,
  CValidFeedback,
  CInvalidFeedback,
  //CTextarea,
  CInput,
  //CInputFile,
  //CInputCheckbox,
  //CInputRadio,
  //CInputGroup,
  //CInputGroupAppend,
  //CInputGroupPrepend,
  //CDropdown,
  //CInputGroupText,
  CSelect,
  CLabel,
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
import CIcon from '@coreui/icons-react'
import usersData from './FormsData'
import { storeData } from '../../redux/storeData';

//import CIcon from '@coreui/icons-react'

const Users = ({match}) => {
  //const history = useHistory()
  const [modalDelConf, setModalDelConf] = useState(false);
  const [modalData, setModalData] = useState(false);
  const [loading, setLoading] = useState(true)
  const [FormData, setFormData] = useState({});
//  const [loading, setLoading] = useState(true)
  const [userlist, setuserlist] = useState(usersData.usersData)
  
  const SavePage = (data)=>{
	//dataRedux = 555;  
	//articles.dispatch({ type: 'ADD_POST', payload: { id: 1, title: 'How to Use Redux' } })
	
	store.dispatch({ type: 'CHANGE_STATE', payload: { modulState:"Save Data",HeadModal:"Save Data Form Dynamic",ShowHideAl:"d-none"} })
	//setmodalHeader("Save Form Contact")  
	//setSubmitBtn("Save Data")
    setFormData({
	});
	toggleData()
	//setShowHideAl('d-none')
	//history.push(`/contactmanagement/listcontact?page=2`)
  }	
    
  const toggleData = ()=>{
	store.dispatch({ type: 'CHANGE_STATE', payload: { Spinner: " " } })  
    setModalData(!modalData);
	//console.log(store.getState())
  }	
	
  async function SaveDataJSON(formData) {
	  await fetch("http://localhost:9333/forms", {
		  method: "post",
			headers: {
			  'Accept': 'application/json',
			  'Content-Type': 'application/json'
			},
			body: JSON.stringify(formData)
				}).then(res => res.json())
			  .then(
				async (result) => {
					//setShowHideAl('d-block')
					await store.dispatch({ type: 'CHANGE_STATE', payload: { ShowHideAl:"d-block",Spinner:" ",AlertMsg:"Succeed Save Data"} })
					await MyfetchData();
          toggleData()
					
				
			});	
	}

 const SubmitForm = (e)=>{
	store.dispatch({ type: 'CHANGE_STATE', payload: { Spinner:<CSpinner size="sm"/> } })
		
  SaveDataJSON(FormData)
	
	e.preventDefault();		
 }
  
 const onFieldChange = (fieldName)=>{
	  //console.log(fieldName);
        return function (event) {
            setFormData({
              Id:FormData.Id,
				FormId:FormData.FormId,
			    FieldName:FormData.FieldName,
				Field_Html:FormData.Field_Html,
				[fieldName]: event.target.value
		  });
        }
    }
	
async function MyfetchData() {

  await fetch("http://localhost:9333/forms/all/data").then(res => res.json())
      .then(
        (result) => {
          if(result){
            console.log(result)
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
            <small className="text-muted"> List Data</small> <CButton size="sm" color="success" onClick={SavePage} ><svg width="14" height="22" fill="currentColor" className="bi bi-person-plus-fill" viewBox="0 0 16 16">
  <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
  <path fillRule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
</svg> Add New</CButton>
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
         <CForm 
				 onSubmit={(e) => {
                      SubmitForm(e);
				}}
			  className="was-validated">
                <CFormGroup>
                  <CLabel htmlFor="FormId">Form Id</CLabel>
				   <CInput type="hidden" id="id" name="id" value={FormData.id || ""} />
                  <CInput type="text" id="FormId" value={FormData.FormId || ""} onChange={onFieldChange('FormId').bind(this)} name="FormId" minLength="3" placeholder="Enter Form Id..." required />
                  <CValidFeedback>Good!!</CValidFeedback>
				   <CInvalidFeedback className="help-block">
                    Please Provide At least 3 characters
                  </CInvalidFeedback>
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="FieldName">Field Name</CLabel>
				          <CInput type="text" id="FieldName" value={FormData.FieldName || ""} onChange={onFieldChange('FieldName').bind(this)} name="FieldName" minLength="3" placeholder="Enter Field Name..." required />
                  <CValidFeedback>Good!!</CValidFeedback>
				   <CInvalidFeedback className="help-block">
                    Please Provide At least 3 characters
                  </CInvalidFeedback>
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="FieldHtml">Field Html</CLabel>
                  <CSelect id="FieldHtml" value={FormData.FieldHtml || ""} onChange={onFieldChange('FieldHtml').bind(this)} name="FieldHtml" required>
                       <option value="">== Select ==</option>
                      <option value="input">Input Text</option>
                      <option value="radio">Radio Button</option>
                      <option value="date">Date Picker</option>
                      <option value="number">Input Number</option>
                    </CSelect>
                  <CValidFeedback>Good!!</CValidFeedback>
				  <CInvalidFeedback className="help-block">
                    Please Provide Data
                  </CInvalidFeedback>
                </CFormGroup>

				<CFormGroup>
				
                  <CButton 
			 
			  type="submit" size="sm" color="primary">
			  <CIcon name="cil-check" /> {store.getState().modulState}</CButton> {store.getState().Spinner}
			 
			  
                </CFormGroup>
              </CForm>
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
    </CRow>
  )
}

const mapStateToProps = (state, action) => {
  console.log(state)
  return { state: action.history.location.pathname };
};

export default connect(mapStateToProps,{ store: store })(Users)
