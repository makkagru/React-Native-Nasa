initialState = {
  allItems: [],
  imageNumber: 0,
  likesItems: [],
  likeImageNumber: 0,
  loading: false,
  itemName: 'curiosity',
  switchValue: false,
  firstModalValidation: true,
  secondModalValidation: false,
}

export default function reducer (state = initialState, action) {
  switch(action.type) {
    case 'GET_ALL_ITEMS':
      return {
        ...state,
        allItems: action.payload,
      }
    case 'SET_BACKGROUND_IMAGE':
      return {
        ...state,
        imageNumber: action.payload
      }
    case 'SET_LIKES_ITEMS':
      return {
        ...state,
        likesItems: action.payload,
      }
    case 'CHANGE_LIKE_IMAGE_NUMBER':
      return {
        ...state,
        likeImageNumber: action.payload,
      }
    case 'CHANGE_LOADING_VALIDATION':
      return {
        ...state,
        loading: !state.loading,
      }
    case 'DELTE_LIKE_ITEM':
      return {
        ...state,
        likesItems: action.payload,
      }
    case 'CHANGE_SWITCH_VALUE':
      return {
        ...state,
        switchValue: !state.switchValue,
      }
    case 'CHANGE_ITEM_NAME':
    if (state.itemName === 'curiosity') {
      return {
        ...state,
        itemName: 'opportunity',
      }
    } else {
      return {
        ...state,
        itemName: 'curiosity',
      }
    }
    case 'CHANGE_FIRST_MODAL_VALIDATION':
      return {
        ...state,
        firstModalValidation: !state.firstModalValidation,
      }
    case 'CHANGE_SECOND_MODAL_VALIDATION':
      return {
        ...state,
        secondModalValidation: !state.secondModalValidation
      }

    default:
      return {
        ...state,
      }
  }
}