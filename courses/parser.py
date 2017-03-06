parsed = open("courses.txt")
target = open("courses_parsed.txt", 'w')

def getWeeklySched(line):
	sentence  = ""
	index = 0
	for curr in line:
		print curr

def printLine(line):
	target.write('<li>'" %s \n"'</li>\n'%line)

def parseLine(line):
	# weeklySched, index = getWeeklySched(line)
	printLine(line)

def parseFile(fileToParse, numOfLines):
	for i in range(0, numOfLines):
		line = parsed.readline()
		parseLine(line)

parseFile(parsed, 2473)





