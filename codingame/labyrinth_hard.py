import sys
import math

# Auto-generated code below aims at helping you parse
# the standard input according to the problem statement.

# r: number of rows.
# c: number of columns.
# a: number of rounds between the time the alarm countdown is activated and the time the alarm goes off.
r, c, a = [int(i) for i in raw_input().split()]

print >> sys.stderr,"R:%s C:%s A:%s" % (r,c,a)

class nodeHelper:

	def findClosestUnexplored(self,startList,prevList,level):
		curPaths = []
		excludeList = []
		for eachNode in startList:
			eachNode.setFindClosestLevel(level)
			
			if eachNode.type == "?":
				print >> sys.stderr,"FOUND UNEXPLORED AT LEVEL %s" % eachNode.findClosestLevel
				return eachNode

			newPaths = eachNode.getPossiblePaths()
			for eachPath in newPaths:
				if (eachPath not in startList) and (eachPath not in prevList) and (eachPath not in curPaths) and (eachPath.findClosestLevel == None):
					curPaths.append(eachPath)

		if len(curPaths) == 0:
			print >> sys.stderr,"3 - NO PATH EXISTS?"
			self.findClosestLevel = None
			return None

		level = level + 1
		closestUnexplored = self.findClosestUnexplored(curPaths,startList,level)
		return closestUnexplored
	
	def findEndPointPossibleLevel(self,startList,prevList,endNode,level):
		curPaths = []
		excludeList = []
		for eachNode in startList:
			#print >> sys.stderr,"P(%s,%s)" % (eachNode.position[0],eachNode.position[1])
			eachNode.setLevel(level)
			if eachNode == endNode:
				print >> sys.stderr,"FOUND END POINT AT LEVEL %s" % eachNode.level
				return 1

			newPaths = eachNode.getPossiblePaths()
			for eachPath in newPaths:
				if (eachPath not in startList) and (eachPath not in prevList) and (eachPath not in curPaths) and (eachPath.level == None):
					curPaths.append(eachPath)

		if len(curPaths) == 0:
			print >> sys.stderr,"1 - NO PATH EXISTS?"
			self.level = None
			return 0

		level = level + 1
		return self.findEndPointPossibleLevel(curPaths,startList,endNode,level)

	def findEndPointActualLevel(self,startList,prevList,endNode,level):
		curPaths = []
		excludeList = []
		for eachNode in startList:
			eachNode.setActualLevel(level)
			if eachNode == endNode:
				print >> sys.stderr,"FOUND END POINT AT LEVEL %s" % eachNode.actualLevel
				return 1

			newPaths = eachNode.getDefinitePaths()
			for eachPath in newPaths:
				if (eachPath not in startList) and (eachPath not in prevList) and (eachPath not in curPaths) and (eachPath.actualLevel == None):
					curPaths.append(eachPath)

		if len(curPaths) == 0:
			print >> sys.stderr,"2 - NO PATH EXISTS?"
			self.actualLevel = None
			return 0

		level = level + 1
		return self.findEndPointActualLevel(curPaths,startList,endNode,level)
		
	def getEndPointPossiblePath(self,endNode):
		endPath = []
		endPath = endNode.getLowerPossibleNodes()
		endPath.insert(0,endNode)
		return endPath[::-1]

	def getEndPointActualPath(self,endNode):
		endPath = []
		endPath = endNode.getLowerActualNodes()
		endPath.insert(0,endNode)
		return endPath[::-1]
		
class Node:

	def __init__(self,position,type):
		self.position = position
		self.type = type
		self.level = None
		self.actualLevel = None
		self.findClosestLevel = None
		self.leftNode = None
		self.rightNode = None
		self.upNode = None
		self.downNode = None

	def addNode(self,nodeToAdd,direction):
		if direction == "L":
			self.leftNode = nodeToAdd
		elif direction == "R":
			self.rightNode = nodeToAdd
		elif direction == "U":
			self.upNode = nodeToAdd
		elif direction == "D":
			self.downNode = nodeToAdd

	def getDirection(self,destinationNode):
		if destinationNode not in [self.leftNode,self.rightNode,self.upNode,self.downNode]:
			print >> sys.stderr,"ERR 5"
			return 0
		
		if destinationNode == self.leftNode:
			return "LEFT"
		elif destinationNode == self.rightNode:
			return "RIGHT"
		elif destinationNode == self.upNode:
			return "UP"
		elif destinationNode == self.downNode:
			return "DOWN"
			
	def setType(self,type):
		self.type = type
		
	def clearLevels(self):
		self.level = None
		self.actualLevel = None
		self.findClosestLevel = None
		
	def setLevel(self,level):
		self.level = level
		
	def setActualLevel(self,level):
		self.actualLevel = level

	def setFindClosestLevel(self,level):
		self.findClosestLevel = level
		
	# Note that this function looks for "potential" paths - it INCLUDES areas we have not yet explored
	def getPossiblePaths(self):
		#print >> sys.stderr,"c: (%s,%s)" % (self.position[0],self.position[1])
		possiblePaths = []
		for eachNode in [self.leftNode,self.rightNode,self.upNode,self.downNode]:
			if eachNode and (eachNode.type not in ['#']):
				#print >> sys.stderr,"a: (%s,%s)" % (eachNode.position[0],eachNode.position[1])
				possiblePaths.append(eachNode)

		return possiblePaths

	# This tracks the paths we CAN go down (EXCLUDES unexplored areas)
	def getDefinitePaths(self):
		#print >> sys.stderr,"c: (%s,%s)" % (self.position[0],self.position[1])
		possiblePaths = []
		for eachNode in [self.leftNode,self.rightNode,self.upNode,self.downNode]:
			if eachNode and (eachNode.type not in ['#','?']):
				#print >> sys.stderr,"a: (%s,%s)" % (eachNode.position[0],eachNode.position[1])
				possiblePaths.append(eachNode)

		return possiblePaths
		
	def getLowerPossibleNodes(self):
		#print >> sys.stderr,"(%s,%s)" % (self.position[0],self.position[1])
		lowerNodes = []
		for eachNode in [self.leftNode,self.rightNode,self.upNode,self.downNode]:
			if eachNode and (eachNode.level == (self.level-1)):
				lowerNodes.append(eachNode)
				lowerNodes = lowerNodes + eachNode.getLowerPossibleNodes()
				break
		return lowerNodes

	def getLowerActualNodes(self):
		#print >> sys.stderr,"(%s,%s)" % (self.position[0],self.position[1])
		lowerNodes = []
		for eachNode in [self.leftNode,self.rightNode,self.upNode,self.downNode]:
			if eachNode and (eachNode.actualLevel == (self.actualLevel-1)):
				lowerNodes.append(eachNode)
				lowerNodes = lowerNodes + eachNode.getLowerActualNodes()
				break
		return lowerNodes
		
nodeList = []
nodeFunc = nodeHelper()

# Build a default "grid" of all of the node matrices (we don't know yet what their type is, so they're ALL assumed to be ?
for y in range(0,r):
	for x in range(0,c):
		curNode = Node((x,y),"?")
		nodeList.append(curNode)

for y in range(0,r):
	for x in range(1,c):
		rightNode = nodeList[c*y+x]
		leftNode = nodeList[c*y+(x-1)]

		rightNode.addNode(leftNode,"L")
		leftNode.addNode(rightNode,"R")

for y in range(1,r):
	for x in range(0,c):
		#print >> sys.stderr,(x,y)
		bottomNode = nodeList[c*y+x]
		topNode = nodeList[c*(y-1)+x]

		topNode.addNode(bottomNode,"D")
		bottomNode.addNode(topNode,"U")

# Simulate a "wall" to build a path around
#for y in range(0,r-1):
#	nodeList[c*y+3].setType("#")

# Find the closest path between starting node and ending nodes that is possible (but not CERTAIN)
#nodeFunc.findEndPointPossibleLevel([nodeList[0]],[],nodeList[10],0)

# Generate a list of the node path
#endingNodes = nodeFunc.getEndPointPossiblePath(nodeList[10])

# Find the closest path between starting node and ending nodes that is CERTAIN
#nodeFunc.findEndPointActualLevel([nodeList[0]],[],nodeList[10],0)

# During game loop, we must update the node status continuously (what is an explored node vs what is an unexplored node)
count = 0
searchState = 0
while (count < 300) and (searchState != 99):
	count = count + 1
	# kr: row where Kirk is located.
	# kc: column where Kirk is located.
	kr, kc = [int(i) for i in raw_input().split()]

	curMap = ""
	for i in xrange(r):
		row = raw_input()  # C of the characters in '#.TC?' (i.e. one line of the ASCII maze).
		print >> sys.stderr,row
		curMap = curMap + row
	
	startNode = None
	controlNode = None
	direction = None
	
	# Map "reset" - after every move we have to update the cell states and make sure their levels are cleared
	for eachIdx,cellType in enumerate(curMap):
		nodeList[eachIdx].setType(cellType)
		if cellType == "T":
			startNode = nodeList[eachIdx]
		elif cellType == "C":
			controlNode = nodeList[eachIdx]
		nodeList[eachIdx].clearLevels()
	
	# Searching for the room still
	if searchState == 0:
	
		if controlNode:
			searchState = 1
		else:
			# Assume the closest "?" has the spot
			closestUnexplored = nodeFunc.findClosestUnexplored([nodeList[c*kr+kc]],[],0)
			#print >> sys.stderr,"Unexplored: (%s,%s)" % (closestUnexplored.position[0],closestUnexplored.position[1])
	
			# Find the closest path to the desired position - since we're looking for the CLOSEST "?", every node is assumed to be a "."
			nodeFunc.findEndPointPossibleLevel([nodeList[c*kr+kc]],[],closestUnexplored,0)
			nodePath = nodeFunc.getEndPointPossiblePath(closestUnexplored)
		
			# The second node of the node path is the one we want to jump to next
			direction = nodeList[c*kr+kc].getDirection(nodePath[1])
	
	# Found the room, determine if we have to find the shortest path
	if searchState == 1:
	
		print >> sys.stderr,"FOUND - GET PATHS BETWEEN START NODE AND END NODE"
		
		# Find path that includes both unexplored and explored tiles
		pathExists = nodeFunc.findEndPointPossibleLevel([startNode],[],controlNode,0)
		nodePathPossible = []
		if pathExists:
			print >> sys.stderr,"HERE2"
			nodePathPossible = nodeFunc.getEndPointPossiblePath(controlNode)
		
		# Find path that ONLY includes explored tiles
		pathExists = nodeFunc.findEndPointActualLevel([startNode],[],controlNode,0)
		nodePathActual = []
		if pathExists:
			print >> sys.stderr,"HERE1"
			nodePathActual = nodeFunc.getEndPointActualPath(controlNode)
		
		if len(nodePathActual) == 0:
			print >> sys.stderr,"FOUND CONTROL ROOM BUT ACTUAL PATH NOT DISCOVERED"

			# Clear all the levels
			for eachIdx,cellType in enumerate(curMap):
				nodeList[eachIdx].clearLevels()

			searchState = 5
		elif len(nodePathPossible) < len(nodePathActual):
			print >> sys.stderr,"EXPLORE SHORTER ROUTE"

			# Clear all the levels
			for eachIdx,cellType in enumerate(curMap):
				nodeList[eachIdx].clearLevels()

			searchState = 2
		else:
			print >> sys.stderr,"SHORTEST ROUTE FOUND - GET TO CONTROL ROOM"
			
			# Clear all the levels
			for eachIdx,cellType in enumerate(curMap):
				nodeList[eachIdx].clearLevels()

			searchState = 3
	
	# Find the shortest path between start and end from our current position
	if searchState == 2:

		# Find path that includes both unexplored and explored tiles
		pathExists = nodeFunc.findEndPointPossibleLevel([startNode],[],controlNode,0)
		nodePathPossible = []
		if pathExists:
			nodePathPossible = nodeFunc.getEndPointPossiblePath(controlNode)
		
		# Find path that ONLY includes explored tiles
		pathExists = nodeFunc.findEndPointActualLevel([startNode],[],controlNode,0)
		nodePathActual = []
		if pathExists:
			nodePathActual = nodeFunc.getEndPointActualPath(controlNode)

		if len(nodePathPossible) < len(nodePathActual):

			# Clear all the levels
			for eachIdx,cellType in enumerate(curMap):
				nodeList[eachIdx].clearLevels()

			# Go through unexplored areas
			closestUnexplored = nodeFunc.findClosestUnexplored([nodeList[c*kr+kc]],[],0)
			#print >> sys.stderr,"Unexplored: (%s,%s)" % (closestUnexplored.position[0],closestUnexplored.position[1])
	
			# Find the closest path to the desired position - since we're looking for the CLOSEST "?", every node is assumed to be a "."
			nodeFunc.findEndPointPossibleLevel([nodeList[c*kr+kc]],[],closestUnexplored,0)
			nodePath = nodeFunc.getEndPointPossiblePath(closestUnexplored)

			# The second node of the node path is the one we want to jump to next
			direction = nodeList[c*kr+kc].getDirection(nodePath[1])

		else:
			print >> sys.stderr,"FOUND SHORTEST"

			# Clear all the levels
			for eachIdx,cellType in enumerate(curMap):
				nodeList[eachIdx].clearLevels()

			searchState = 3

	# Found the shortest path, walk to the control room
	if searchState == 3:
	
		if (kc,kr) == controlNode.position:
			print >> sys.stderr,"ON CONTROL ROOM"
			searchState = 4
		else:
			# Find path that ONLY includes explored tiles
			nodeFunc.findEndPointActualLevel([nodeList[c*kr+kc]],[],controlNode,0)
			nodePathActual = nodeFunc.getEndPointActualPath(controlNode)

			# The second node of the node path is the one we want to jump to next
			direction = nodeList[c*kr+kc].getDirection(nodePathActual[1])

	# Found control room, traverse back to starting position
	if searchState == 4:
	
		if (kc,kr) == startNode.position:
			print >> sys.stderr,"DONE"
			searchState = 99
		else:
			# Find path that ONLY includes explored tiles
			nodeFunc.findEndPointActualLevel([nodeList[c*kr+kc]],[],startNode,0)
			nodePathActual = nodeFunc.getEndPointActualPath(startNode)

			# The second node of the node path is the one we want to jump to 
			direction = nodeList[c*kr+kc].getDirection(nodePathActual[1])
	
	# Found control room but we don't have a path to it
	if searchState == 5:

		# Find path that ONLY includes explored tiles
		pathExists = nodeFunc.findEndPointActualLevel([nodeList[c*kr+kc]],[],controlNode,0)
		nodePathActual = []
		if pathExists:
			print >> sys.stderr,"FOUND A PATH"
			nodePathActual = nodeFunc.getEndPointActualPath(controlNode)

			# The second node of the node path is the one we want to jump to next
			direction = nodeList[c*kr+kc].getDirection(nodePathActual[1])

			searchState = 1

		else:

			# Go through unexplored areas
			closestUnexplored = nodeFunc.findClosestUnexplored([nodeList[c*kr+kc]],[],0)
			#print >> sys.stderr,"Unexplored: (%s,%s)" % (closestUnexplored.position[0],closestUnexplored.position[1])
	
			# Find the closest path to the desired position - since we're looking for the CLOSEST "?", every node is assumed to be a "."
			nodeFunc.findEndPointPossibleLevel([nodeList[c*kr+kc]],[],closestUnexplored,0)
			nodePath = nodeFunc.getEndPointPossiblePath(closestUnexplored)
		
			# The second node of the node path is the one we want to jump to next
			direction = nodeList[c*kr+kc].getDirection(nodePath[1])


	print >> sys.stderr,"NEWDIR:%s" % direction
	print direction
	
	#nodeFunc.findEndPointActualLevel([nodeList[c*kr+kc]],[],nodeList[c*kr],0)
	#print >> sys.stderr,curMap
	#print >> sys.stderr,len(curMap)