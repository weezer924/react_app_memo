import { createStore } from 'redux';

const initDate = {
  data: [],
  message: 'please type message:',
  mode: 'default',
  fdata: []
};

export function memoReducer(state = initDate, action) {
  switch(action.type) {
    case 'ADD':
      return addReduce(state, action);
    case 'DELETE':
      return deleteReduce(state, action);
    case 'FIND':
      return findReduce(state, action);

    default:
      return state;
  }
}

function findReduce(state, action) {
  let f = action.find;
  let fdata = [];
  state.data.forEach(value => {
    if (value.message.indexOf(f) >= 0) {
      fdata.push(value)
    }
  });

  return {
    data: state.data,
    message: 'find "' + f + '":',
    mode: 'find',
    fdata: fdata
  };
}

function addReduce(state, action) {
  let d = new Date()
  let f = d.getHours() + ':' + d.getMinutes() + ':' + d.getMinutes()
  let data = {
    message: action.message,
    created:  f
  };

  let newdata = state.data.slice();
  newdata.unshift(data);
  return {
    data: newdata,
    message: 'Added!',
    mode:'default',
    fdata:[]
  };
}

function deleteReduce(state, action) {
  let newdata = state.data.slice();
  newdata.splice(action.index, 1);
  return {
    data: newdata,
    message: 'delete "' + action.index + '":',
    model:'delete',
    fadata:[]
  }
}

export function addMemo(text) {
  return {
    type: 'ADD',
    message: text
  }
}

export function deleteMemo(num) {
  return {
    type: 'DELETE',
    index: num
  }
}

export function findMemo(text) {
  return {
    type: 'FIND',
    find: text
  }
}

export default createStore(memoReducer);
