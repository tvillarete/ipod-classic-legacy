import HomeView from "./split/home";

const initialState = {
   viewStack: [
      {
         component: HomeView,
         full_width: false,
         props: {
            scrollIndex: 0
         }
      }
   ],
   selected: false
};

const viewReducer = (state = initialState, action) => {
   let stackLength = state.viewStack.length - 1;
   let curView = state.viewStack[stackLength];
   let curScrollIndex = state.viewStack[stackLength].props.scrollIndex;
   let curViewSections = curView.component.metadata.sections;
   let newCurView = null;

   switch (action.type) {
      case "PUSH_VIEW":
         return {
            ...state,
            viewStack: [
               ...state.viewStack,
               {
                  ...action.view,
                  props: {
                     ...action.view.props,
                     scrollIndex: 0
                  }
               }
            ],
            selected: false
         };
      case "POP_VIEW":
         return state.viewStack.length > 1
            ? {
                 ...state,
                 viewStack: state.viewStack.slice(0, -1),
                 selected: false
              }
            : state;
      case "SCROLL_RIGHT":
         newCurView = curView;

         if (curScrollIndex <= curViewSections.length - 2) {
            newCurView.props.scrollIndex++;
         }
         return {
            ...state,
            viewStack: [...state.viewStack.slice(0, -1), newCurView]
         };
      case "SCROLL_LEFT":
         newCurView = curView;

         if (curScrollIndex > 0) {
            newCurView.props.scrollIndex--;
         }

         return {
            ...state,
            viewStack: [...state.viewStack.slice(0, -1), newCurView]
         };
      case "SELECT":
         return {
            ...state,
            selected: true
         };
      default:
         return state;
   }
};

export default viewReducer;
