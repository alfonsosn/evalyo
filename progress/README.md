[Main](../../master/README.md) | [Our Team](../master/blurbs/team.md) | [Weekly Reports](../../master/weekly_reports/) | [Progress Journal](#)
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

var courseSchema = new mongoose.Schema({
  courseName:{
		type: String,
    lowercase: true
	},
	semesters: [semesterSchema]
}

var semester = new mongoose.Schema({
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

## Week Two: February 22 - February 27

another things that

We've been discussing some of the broad themes about how we're going to rate the professors. We've narrowed down to four categories. In an early thought knowledge, we've narrowed it to a couple of things.

So in a small brainstorm Ahmed, Marshall, and me (Alfonso), created a couple things that we think are important. So a list of our ideas were:

Ahmed:
	- Clarity
	- Organization (dates, grading, time)
	- Method of Teaching
	- Interaction
	- Helpfulness

Alfonso:
	- Different subject they teach
	- Class size
	- Is he a tough grader
	- How long have they taught
	- Class size

Marshall
	- Returning grade material
	- Visuals
	- Clarity
	- Knowledge
	- Interest

So out of these lists, we created a couple of broad themes that we believe might be important.

Broad THEMES

1) Organization
2) Clarity
3) Experience
4) Personality
5) Grading
