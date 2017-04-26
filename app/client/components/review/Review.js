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
  
  render() {
    const ratings = this.props.reviews
    
    // const tp = (<h2> title </h2>)
    // console.log("sorted_reviews: ", sorted_reviews)
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
                        : Math.round((rating.yes * 100) /
                           (rating.yes + rating.no))
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
