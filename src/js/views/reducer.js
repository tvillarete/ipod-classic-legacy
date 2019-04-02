import HomeView from './home';

const initialState = {
   viewStack: [{ component: HomeView, props: {} }],
   // Each view has a scrollIndex attached to it.
   scrollIndexStack: [0],
   selected: false,
};

const viewReducer = (state = initialState, action) => {
   let stackLength = state.viewStack.length - 1;
   let curView = state.viewStack[stackLength];
   let curScrollIndex =
      state.scrollIndexStack[state.scrollIndexStack.length - 1];
   let curViewSections = curView.component.metadata.sections;
   let newScrollIndexStack = null;

   switch (action.type) {
      case 'PUSH_VIEW':
         return {
            ...state,
            viewStack: [...state.viewStack, action.view],
            scrollIndexStack: [...state.scrollIndexStack, 0],
            selected: false,
         };
      case 'POP_VIEW':
         return state.viewStack.length > 1
            ? {
                 ...state,
                 viewStack: state.viewStack.slice(0, -1),
                 scrollIndexStack: state.scrollIndexStack.slice(0, -1),
                 selected: false,
              }
            : state;
      case 'SCROLL_RIGHT':
         newScrollIndexStack = state.scrollIndexStack;
         if (curScrollIndex <= curViewSections.length - 2) {
            newScrollIndexStack[newScrollIndexStack.length - 1]++;
         }
         return {
            ...state,
            scrollIndexStack: newScrollIndexStack,
         };
      case 'SCROLL_LEFT':
         newScrollIndexStack = state.scrollIndexStack;
         if (curScrollIndex > 0) {
            newScrollIndexStack[newScrollIndexStack.length - 1]--;
         }
         return {
            ...state,
            scrollIndexStack: newScrollIndexStack,
         };
      case 'SELECT':
         return {
            ...state,
            selected: true,
         };
      default:
         return state;
   }
};

export default viewReducer;
