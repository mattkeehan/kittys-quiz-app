const wordState = (state = [], action) => {
  console.log('words reducer');
  switch (action.type) {
    case 'UPDATE_WORDS':
      console.log('update words');
      console.log(action.words);
      return { words: action.words };
    default:
      return state;
  }
};

export default wordState;
