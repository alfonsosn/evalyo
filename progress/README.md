[Main](../../master/README.md) | [Our Team](../../master/our_team/README.md) | [Weekly Reports](../../master/weekly_reports/) | [Progress Journal](#)
------- | ------- | ------- | -------
---

# Bitácoras del Capitán

by Alfonso Enriquez, (Group Leader of Evalyo)

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


## Week Three: February 28th - March 6th

This week was the first time that we created a high fidelity model of what the app aims to do. We presented our railway model to our classmates who gave us positive feedback in our work. Moreover, Lev is also getting closer at tackling the models on our database. I'm passionate about front-end, not because of its ease, but because it allows me to coneptualize the utility of the product. I'm by no means a front-end expert, nor a user-interface designer, but I'm becoming better at product. Prioritizing content for the user to obtain its goals within a pair of clicks.

## Week Four: March 7th - March 13th

I've worked so hard on the app and I'm very happy about the progress. I'm glad to have worked on the node server because I have a better understanding of express, which I sort of neglected when I was learning angular and node. I'm happy for this accomplishment because it means that I can modularize several components of our code and add functionality to our app with ease. I'm still learning though.

In terms of Evalyo, Lev has worked on the scrapper and added more functionality to it. I'm happy with his work and I'm glad that he will begin to work on the database models, giving us a fuller application. 

I've guided Marshall in his interest in learning about front-end design, advising him to learn HTML, CSS, and Twitter Bootstrap. With that, he build a pretty nice team website for the team. His next assignment is to learn Jquery and JS to build more interactive sites. In meantime, I assigned Ahmed an assignment to convert and XLS to JSON, which seemed to provide a certain degree of difficulty for him, but it seems that it was a good experience. He learn some python syntax which is good. Now I want to him to focus on Javascript. This might be timely since both him and Marshall will be learning how to use it at the same time. Hopefully, Marshall and Ahmed can collaborate to create a small front-end app that uses the information that Ahmed helped create into a JSON file.

## Week Eight: Spring Break Notes

Users of the App (students) Frontend Service
	1. Why would they want to use it?
	2. Useful to find out about their future professor
	3. Ease of Access / Easy categorization
	4. How does it compare to MyProf / RMP
	5. Aggregation: the most amount of information in the least amount of time. Unlike MyProf
	6. More Data == More Accuracy from RMP
	7. Sleek User Interface 
	9. RMP doesn’t have course query

What about the School? Backend Service
	1. Data-tracking / administration

Departments we’re going to Scrape 
(use this http://catalog.hunter.cuny.edu/content.php?catoid=28&navoid=5538)
	1. Computer Science 
	2. Biological Sciences (Ahmed)
	3. Chemistry (alfonso)
	4. Economics (lev)
	5. Math (Marshall)
	6. Philosophy (Marshall / Ahmed)


How will we present lists (use icons) (https://wireframe.cc/LUiS9C)
	1. all departments (header is icon)
	2. professors (header is initials)
	3. classes (header is course num)

How will we presents tables (https://wireframe.cc/gjHLQg)
	1. aggregate review for every classes each semester


