import React, { useState } from 'react'

import { storeData } from '../../redux/storeData';

import {
  CButton,
  CCard,
  CCardBody,
  CInputRadio,
  
  //CCardFooter,
  CCardHeader,
  CCol,
  //CCollapse,
  //CDropdownItem,
  //CDropdownMenu,
  //CDropdownToggle,
  //CFade,
  CForm,
  CFormGroup,
  //CFormText,
  // CValidFeedback,
  // CInvalidFeedback,
  // //CTextarea,
  CInput,
  //CInputFile,
  //CInputCheckbox,
  //CInputRadio,
  //CInputGroup,
  //CInputGroupAppend,
  //CInputGroupPrepend,
  //CDropdown,
  //CInputGroupText,
  CLabel,
  //CSelect,
  CRow,
  //CSwitch
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
//import { DocsLink } from 'src/reusable'

const CreateUser = () => {
	
  //const [collapsed, setCollapsed] = React.useState(true)
  //const [showElements, setShowElements] = React.useState(true)
const [Field, setField] = useState([]);

React.useEffect(() => {
  async function fetchDataForm() {
    await fetch("http://localhost:9333/forms/all/field", {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"form_id":storeData.getState().form_id})
        }).then(res => res.json())
        .then(
        async (result) => {
          if(result){
            console.log(122112,result)
          setField([])
          let data = []
          await result.forEach(res => {
            switch (res.FieldHtml) {
              case 'number':
            return data.push(<CFormGroup key={res.Id}><CLabel htmlFor={res.FieldName}>{res.FieldName}</CLabel>
             <CInput type="number" id={res.FieldName} name={res.FieldName} minLength="3" required />
            </CFormGroup>);
            case 'date':
              return data.push(<CFormGroup key={res.Id}><CLabel htmlFor={res.FieldName}>{res.FieldName}</CLabel>
              <CInput type="date" id={res.FieldName} name={res.FieldName} minLength="3" required />
              </CFormGroup>);
             case 'radio':
              return data.push(<CFormGroup key={res.Id}><CLabel htmlFor={res.FieldName}>{res.FieldName}</CLabel>
             <CFormGroup variant="custom-radio" inline>
                      <CInputRadio custom id="inline-radio1" name="inline-radios" value="option1" />
                      <CLabel variant="custom-checkbox" htmlFor="inline-radio1">One</CLabel>
                    </CFormGroup>
              </CFormGroup>);  
            default:
              return data.push(<CFormGroup key={res.Id}><CLabel htmlFor={res.FieldName}>{res.FieldName}</CLabel>
                <CInput type="text" id={res.FieldName} name={res.FieldName} minLength="3" required />
                </CFormGroup>);
            }
          })
          setField(data)
          console.log(111,result)     
        }
          
      });	
  }

  fetchDataForm()
  

}, []);	


  return (
    <>
      <CRow>
        <CCol xs="5" sm="5">
          <CCard>
            <CCardHeader>
             Form {storeData.getState().form_id || ""}
            </CCardHeader>
            <CCardBody>
              <CForm>
                {Field}
                <CFormGroup>
                  <CButton 
			 
			  type="submit" size="sm" color="primary"><CIcon name="cil-check" /> Submit</CButton> <CButton type="reset" size="sm" color="danger"><CIcon name="cil-ban" /> Reset</CButton>
                </CFormGroup>
              </CForm>

              </CCardBody>
          </CCard>
        </CCol>
     
      </CRow>
	</>
  )
}

export default CreateUser