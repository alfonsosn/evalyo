"use strict";

import React from "react";
import { Link } from "react-router";
import { Flex, Box } from "reflexbox";
import { Sparklines, SparklinesLine, SparklinesReferenceLine } from "react-sparklines";
import _ from "lodash";

export default class ReviewCharts extends React.Component {
  getLetterGrade(score) {
    if (score > 90) return "A";
    else if (score > 80) return "B";
    else if (score > 70) return "C";
    else if (score > 60) return "D";
    else return "F";
  }

  getArrayOfAverages(totalAverages, category) {
    return (_.keysIn(_.mapValues(_.groupBy(this.props.totalAverages, category))))
  }

  render(props) {
    console.log(this.props.totalAverages)

    return (
      <div>
        {
        this.props.totalAverages.length ?
          (
            <div>
              <h3> Clarity </h3>
              <Sparklines data={this.getArrayOfAverages(this.props.totalAverages, "clarity")}>
                <SparklinesLine />
              </Sparklines>
              <h3> Experience </h3>
              <Sparklines data={this.getArrayOfAverages(this.props.totalAverages, "experience")}>
                <SparklinesLine />
              </Sparklines>
              <h3> Personality </h3>
              <Sparklines data={this.getArrayOfAverages(this.props.totalAverages, "personality")}>
                <SparklinesLine />
              </Sparklines>
              <h3> Organization </h3>
              <Sparklines data={this.getArrayOfAverages(this.props.totalAverages, "organization")}>
                <SparklinesLine />
              </Sparklines>
            </div>
          ): ("")
      }
      </div>
    );
  }
}
