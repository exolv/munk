import { createRoot } from 'react-dom/client';

import Options from '../components/options/Options';

const optionsRoot = document.getElementById('options-root');
const optionsElement = createRoot(optionsRoot);
optionsElement.render(<Options />);