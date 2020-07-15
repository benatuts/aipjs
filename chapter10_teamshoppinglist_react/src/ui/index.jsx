import * as ReactDOM from 'react-dom';
import * as React from 'react';

import { ShoppingList } from './ShoppingList.jsx';

// Launch React in a new div
const root = document.createElement('div');
document.body.appendChild(root);
ReactDOM.render(<ShoppingList/>,root);
