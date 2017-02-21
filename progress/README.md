[Main](../../master/README.md) | [Team](../master/blurbs/team.md) | [Weekly Reports](../master/weekly_reports/) | [Progress Journal](#)
------- | ------- | ------- | -------
---

# Bitácoras del Capitán

## Week One: February 13 - February 22

This was our first week as team. In our first meeting we made some housekeeping tasks. We set up our Github repository and our team Slack for communication. We directed the rest of our conversation to the tools that we're thinking of using for the project.

Early on it was decided that we would work with MERN stack (MongoDB | Express | React | NodeJS). Our team has different skill levels and knowledge of the stack. In someways, our differences might be an asset to our team since it will force us to document our work clearly.

We assigned for this team to get acquainted with MongoDB since its syntax is similar to JavaScript. The benefit of working with MongoDB is that it's a commonly used database across the industry. It's also easier to conceptualize for our work with its document based features.

This is an early model of our conceptual schemas:

```javascript

var professorSchema = new mongoose.Schema({
	name:{
		type: String,
    lowercase: true
	},
	courses: [courseSchema],
});

var courseSchema = {
  courseName:{
		type: String,
    lowercase: true
	},
	semesters: [semesterSchema]
}

var semester = {
  semesterName:{
    type: String,
    lowercase: true
  },
  year:{
    type: Number
  },
  ratingOne:{
    type: Number
  },
  ratingTwo:{
    type: Number
  },
  ratingThree:{
    type: Number
  }
}

```
