export const initialState = null;

export const reducer = (state, action) => {
  if (action.type === 'USER') {
    return action.payload;
  }
  if (action.type === 'CLEAR') {
    return null;
  }
  if (action.type === 'UPDATE') {
    return {
      ...state,
      followers: action.payload.followers,
      following: action.payload.following,
    };
  }
  // TODO: Let user update profile picture
  // if (action.type == 'UPDATE PIC') {
  //   return {
  //     ...state,
  //     pic: action.payload,
  //   };
  // }
  return state;
};
