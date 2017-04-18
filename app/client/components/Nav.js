'use strict';

import React from 'react';
import AppBar from 'react-toolbox/lib/app_bar';
import Navigation from 'react-toolbox/lib/navigation';
import Link from 'react-toolbox/lib/Link';

export default class Nav extends React.Component {
  render() {
    return (
      <div>
        <AppBar title='Evalyo'>

        </AppBar>
        <div className="app-content">{this.props.children}</div>
       </div>
    );
  }
}
