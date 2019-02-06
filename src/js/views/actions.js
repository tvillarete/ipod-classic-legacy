export const pushView = view => ({ type: 'PUSH_VIEW', view });
export const popView = () => ({ type: 'POP_VIEW' });
export const scrollRight = () => ({ type: 'SCROLL_RIGHT' });
export const scrollLeft = () => ({ type: 'SCROLL_LEFT' });
export const select = index => ({ type: 'SELECT', index });
