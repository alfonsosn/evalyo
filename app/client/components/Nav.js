'use strict';

import React from 'react';

export default class Nav extends React.Component {
  render() {
    return (
      <div>
        <div className="app-content">{this.props.children}</div>
       </div>
    );
  }
}
