import { createStore } from 'redux';

const ls = require('local-storage');

if (!ls.get('formData')) {
  let arry = {};
  arry['form_id'] = '';
  ls.set('formData', arry);
}

const TheformData = ls.get('formData');

const initialState = {
  form_id: TheformData['form_id']
};

const reducer = (state = initialState, action) => {
  if (action.type === 'CHANGE_STATE') {
    let formData = TheformData;
    if (action.payload.form_id) {
      formData['form_id'] = action.payload.form_id;
    }
    else if (action.payload.form_id === '') {
      formData['form_id'] = '';
    }

    ls.set('formData', formData);
   
  }

  return state;
};

const storeData = createStore(reducer);

export { storeData };
