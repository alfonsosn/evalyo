'use strict';

import React from 'react';
import { Link } from 'react-router';
import $ from "jquery";

export default class Review extends React.Component {
  render() {
    const reviews = this.props.reviews
     
    return (
      <div>
        {Object.keys(reviews).map((key) =>        
          reviews[key] instanceof Array ?
             reviews[key].map((topic) => (
                <ul style={{listStyleType: 'none'}}>
                  { Object.keys(topic).map((key) => 
                      key === 'id' ? null
                      : <li> <b>{key}</b>: {topic[key]} </li>
                    )
                  }
                </ul>
              )
            )
          : null      
        )}
      </div>
    );
  }
}
