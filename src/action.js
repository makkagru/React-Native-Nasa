export const getAllItems = (itemName) => dispatch => {
  let solNumber;
  if (itemName === 'curiosity') {
    solNumber = 1000;
  } else {
    solNumber = 4;
  }
  fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${itemName}/photos?sol=${solNumber}&api_key=fN7Yn69Brhpm8RqF2KJiMEudcvosOasCfoiXXW41`, {
    method: 'GET',
  }).then(res => { 
    return res.json()
  }).then(json => {
    dispatch({
      type: 'GET_ALL_ITEMS',
      payload: json.photos,
    })
  }).catch(e => console.error(e));
};

export const setImage = (number, name) => dispatch => {
  dispatch({
    type: 'SET_BACKGROUND_IMAGE',
    payload: number,
  })
}

export const setLikesItems = array => dispatch => {
  dispatch({
    type: 'SET_LIKES_ITEMS',
    payload: array,
  })
}

export const changeLikeImageNumber = (number, imageNumber) => dispatch => { 
  let newNumber = Number(imageNumber + number);
  dispatch({
    type: 'CHANGE_LIKE_IMAGE_NUMBER',
    payload: newNumber,
  })
}

export const changeLoadingValidation = () => dispatch => {
  dispatch({
    type: 'CHANGE_LOADING_VALIDATION',
  })
}

export const changeSwitchValue = () => dispatch => {
  dispatch({
    type: 'CHANGE_SWITCH_VALUE',
  })
}

export const changeItemName = (itemName) => dispatch => {
  dispatch({
    type: 'CHANGE_ITEM_NAME',
    payload: 'opportunity',
  })
}