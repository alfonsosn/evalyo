'use strict';

import React from 'react';
import { Link } from 'react-router';
import $ from "jquery";
import PropTypes from 'prop-types';
const categories = ['clarity', 'experience', 'organization', 'personality'];
import { Accordion, AccordionItem } from 'react-sanfona';
import { Flex, Box } from 'reflexbox'

require('normalize.css');
require('./style.scss')

class Review extends React.Component {

  render() {
  const reviews = this.props.reviews
    const tp = (<h2> title </h2>)
    console.log(reviews)
    return (
        <Accordion>
        {
         Object.keys(reviews).map((topic) =>
          categories.indexOf(topic) === -1 ? null
          : <AccordionItem title={topic} key={topic} openNextAccordionItem={true}>
                {
                  reviews[topic].map((rating)=>
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
