const initialState = {
   viewStack: [{ name: 'Home', props: { scrollIndex: 0 } }],
};

const viewReducer = (state = initialState, action) => {
   let stackLength = state.viewStack.length - 1;
   let curView = state.viewStack[stackLength];
   let viewProps = curView.props;
   let scrollIndex = viewProps.scrollIndex;

   switch (action.type) {
      case 'PUSH_VIEW':
         return {
            ...state,
            viewStack: [...state.viewStack, action.view],
         };
      case 'POP_VIEW':
         return {
            ...state,
            viewStack: state.viewStack.slice(0, -1),
         };
      case 'SCROLL_RIGHT':
         return {
            ...state,
            viewStack: [
               ...state.viewStack.slice(0, -1),
               {
                  ...curView,
                  props: {
                     ...viewProps,
                     scrollIndex: scrollIndex + 1,
                  },
               },
            ],
         };
      case 'SCROLL_LEFT':
         return {
            ...state,
            viewStack: [
               ...state.viewStack.slice(0, -1),
               {
                  ...curView,
                  props: {
                     ...viewProps,
                     scrollIndex:
                        scrollIndex - 1 > -1 ? scrollIndex - 1 : scrollIndex,
                  },
               },
            ],
         };

      case 'SELECT':
         return {
            ...state,
            viewStack: [
               ...state.viewStack.slice(0, -1),
               {
                  ...curView,
                  props: {
                     ...viewProps,
                     selectedIndex: action.index
                  }
               }
            ],
         };
      default:
         return state;
   }
};

export default viewReducer;
