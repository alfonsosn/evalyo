'use strict';

import React from 'react';
import { Link } from 'react-router';
import $ from "jquery";
import PropTypes from 'prop-types';
const categories = ['clarity', 'experience', 'organization', 'personality'];
import { Accordion, AccordionItem } from 'react-sanfona';
import { Flex, Box } from 'reflexbox'
require('normalize.css');
require('../styles.scss')
require('./style.scss')

class Review extends React.Component {
  
  normalizeYesNo(rating){
    return Math.round((Number(rating.yes) / 
          (Number(rating.yes) + Number(rating.no))).toFixed(2) * 100)
  }
  render() {
    const ratings = this.props.reviews
    
    return (
        ratings.length === 0 ? null
        :
        <Accordion>
        {
         Object.keys(ratings).map((category) =>
          <AccordionItem title={category} key={category} openNextAccordionItem={true}>
                {
                  ratings[category].map((rating)=>
                    <p key={rating.id}>
                      <span>
                       {rating.question}
                      </span>
                      <span style={{float:'right'}}>
                      {
                        rating.average? rating.average
                        : this.normalizeYesNo(rating)
                      }
                      </span>
                    </p>
                  )
                }
            </AccordionItem>
         )
      }
      </Accordion>
    );

  }
}

Review.propTypes = {
  reviews: PropTypes.object.isRequired
}

export default Review


/*

*/
