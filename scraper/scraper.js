/*
 *   Scraper for hunter teacher evaluation
 *   This scraper uses CasperJS
 *   Saves data as json in a file in the current directory
 */
var fs = require('fs');

var casper = require('casper').create({
    pageSettings: {
        loadImages: false,
        loadPlugins: false,
        userAgent: 'Chrome/56.0.2924.76'
    }
});

// -------- Global Variables -------
var prof = {
  firstName: 'Eric',
  lastName: 'Schweitzer',
  courses: []
}

var questionsArr = []
var courseObj = {}
var courseRows = []
var courseLinks = []
var flag = false;

var index = 0;
var should_continue = true;

var saveURL;
var selectedIndex = 0;
// ---------- Functions ----------

casper.saveJSON = function(what) {
    fs.write('prof.json', JSON.stringify(what, null, '  '), 'w');
    console.log('saved')
};

/*
 *   Get current course data recursively
 */
function getCourseData(){

  console.log('smaller? ', index < courseLinks.length - 2)
  if (index < courseLinks.length - 1){//2){

     this.start(courseLinks[index])

     this.then(function(){
        courseObj = courseRows[index]
        courseObj.questions = this.evaluate(function(){
           var title = document.querySelector('.t2RegionHeader').innerText;
           __utils__.echo(title)
           var questionArr = document.getElementsByClassName('highlight-row')
           questionArr = Array.prototype.slice.call(questionArr, 0, 9)
           //__utils__.echo(questionArr)
           return Array.prototype.map.call(questionArr, function(q){
                  return {
                        question: q.children[0].innerText,
                        average:  q.children[9].innerText
                  }
          })
       })
     })

     this.then(function(){
       this.echo("index: " + index)
       prof.courses.push(courseObj)
       index++
       getCourseData.call(this)
     })
  } else {
    // Finished collecting current course data
    next.call(this)
  }
}

/*
 *   After getting course data
 *   Continue to next page or end crawl
 */
 function next(){
   this.start(saveURL);

   this.then(function(){
       should_continue = this.evaluate(function(){
         __utils__.echo("url: " + document.URL)
         // Get back and next linkes, if exist
         var hrefs = document.querySelectorAll('.t2pagination');
         // If there are two links, check if second is "next"
         if (hrefs.length === 2){
            __utils__.echo("href: " + hrefs[1].innerText)
            return hrefs[1].innerText === "Next"
         } else {
             // If there is only one, check if it is "next"
            return hrefs[0].innerText === "Next"
         }
       })
   })

   this.then(function(){
     this.echo("should continue: " + should_continue)
     if (should_continue){
        this.evaluate(function(){
           var hrefs = document.querySelectorAll('.t2pagination');
           if (hrefs.length === 2){
              hrefs[1].click()
           } else {
               // If there is only one, check if it is "next"
              hrefs[0].click()
           }
        })
     }
   })
   // Wait for next page to load, then start again
   this.then(function(){
      if (should_continue){
        this.waitFor(function check() {
            return this.evaluate(function(currIndex) {
		var dropDown = document.getElementsByClassName('u-TF-item u-TF-item--select')[0]
              return dropDown.selectedIndex > currIndex
            },  selectedIndex);
        }, function then() {
             selectedIndex++;
             doContinue.call(this)
        }, function onTimeout(){
             this.saveJSON(prof);
             this.exit();
        },  10000);
      }
  })
}

/*
 *  Continue getting rows from next page
 */
function doContinue(){
  this.then(function(){
    index = 0;
    getCourseRows.call(this)
  })
  this.then(function(){
     console.log("first course row semester:", courseRows[0].semester )
     console.log("first course row subject:", courseRows[0].subject )
     getCourseLinks.call(this)
  })
  this.then(function(){
    console.log("got links")
    console.log(courseLinks.length)

    getCourseData.call(this)
  })
}
/*
 * Get All course rows from current page
 */
function getCourseRows(){
  courseRows = this.evaluate(function(){
      __utils__.echo('get Course rows')
      var courseRows = document.getElementsByClassName('highlight-row')
      // map over rows to get semester and course subject
      return Array.prototype.map.call(courseRows, function(row){
        return {
          semester: row.children[1].innerText,
          subject:row.children[2].innerText
        }
      })
  })
}

/*
 *  Get All links to courses from current page
 */
function getCourseLinks(){
  courseLinks = this.evaluate(function(){
      __utils__.echo('get Course links')
      var courseLinks = document.querySelectorAll('a:not(.t2navbar):not(.t2pagination)')
      return Array.prototype.map.call(courseLinks, function(a){
               return a.href;
      })
  })
}
// ------- The crawl begins here -----------

// Open hunter teval
casper.start().thenOpen("https://www.hunter.cuny.edu/myprof", function() {
     console.log("teval website opened");
});

// Populate username and password, and submit the form
casper.then(function(){
  console.log("Log in using username and password");
  this.evaluate(function(){
    // remember to forgot
        document.getElementById("P101_USERNAME").value='ae538';
        document.getElementById("P101_PASSWORD").value='#8Burkini';
        document.getElementById("P101_LOGIN").click();
  });
})

 //Wait to be redirected , then search for a professor
 casper.then(function(){
  console.log("logged in");
   this.evaluate(function(){
     document.getElementById("P3_LAST_NAME").value = 'SCHWEITZER'
     document.getElementById("P3_GO").click();
   });
 });

 // get class rows
casper.then(function(){
  console.log("got prof classes")
  getCourseRows.call(this)
})

// get links
casper.then(function(){
  console.log("first course row semester:", courseRows[0].semester )
  console.log("first course row subject:", courseRows[0].subject )
  getCourseLinks.call(this)
})


// save current URL
casper.then(function(){
  saveURL = this.evaluate(function(){
    return document.URL
  })
})

// Begin saving links
casper.then(function(){
  console.log("got links")
  console.log(courseLinks.length)

  getCourseData.call(this)
})





// ---- Begin Casper Run, then save to file as JSON -----
casper.run(function(){
   this.saveJSON(prof);
   this.exit();
});
