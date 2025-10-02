import React from 'react';
import { createRoot } from 'react-dom/client';
import WebApp from './WebApp';

const container = document.getElementById('root');
if (!container) {
  throw new Error('Root element not found');
}
const root = createRoot(container);

root.render(React.createElement(WebApp));
