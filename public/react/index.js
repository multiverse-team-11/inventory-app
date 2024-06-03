import React from "react";
import { createRoot } from 'react-dom/client';
import 'regenerator-runtime/runtime'

import {Root} from './Root';

const root = createRoot(document.getElementById("root"));
root.render(<Root />);