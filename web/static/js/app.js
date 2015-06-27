'use strict';

import React from 'react';
import Application from './lib/components/Application.react';
import TaskSocket from './lib/services/TaskSocket';

React.render (
  <Application />,
  document.getElementById('app-container')
)

TaskSocket.join()
