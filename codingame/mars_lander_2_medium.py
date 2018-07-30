import sys
import math

# Auto-generated code below aims at helping you parse
# the standard input according to the problem statement.

surface_n = int(raw_input())  # the number of points used to draw the surface of Mars.

surfaceXList = []
surfaceYList = []
for i in xrange(surface_n):
    # land_x: X coordinate of a surface point. (0 to 6999)
    # land_y: Y coordinate of a surface point. By linking all the points together in a sequential fashion, you form the surface of Mars.
    land_x, land_y = [int(j) for j in raw_input().split()]

    surfaceXList.append(land_x)
    surfaceYList.append(land_y)

    print >> sys.stderr,"%s %s" % (land_x,land_y)

flatY = None
prevY = None
for eachY in surfaceYList:
    if eachY == prevY:
        flatY = eachY
    prevY = eachY

print >> sys.stderr,flatY

#for idx,eachX in enumerate(surfaceXList):
flatSurfaceList = [curX for idx,curX in enumerate(surfaceXList) if surfaceYList[idx] == flatY]

desiredX = (flatSurfaceList[-1]-flatSurfaceList[0])/2+flatSurfaceList[0]
print >> sys.stderr,flatSurfaceList
print >> sys.stderr,desiredX

class Lander:
    def __init__(self):
        self.xPos = None
        self.yPos = None
        self.xSpeed = None
        self.ySpeed = None
        self.fuel = None
        self.rotate = None
        self.power = None
        # Future use?
        self.xAccel = None
        self.yAccel = None
        self.correcting = 0
        
    def updateInfo(self,x,y,h_speed,v_speed,fuel,rotate,power):
        self.xPos = x
        self.yPos = y
        self.xSpeed = h_speed
        self.ySpeed = v_speed
        self.fuel = fuel
        self.rotate = rotate
        self.power = power      
        self.landingDirection = 0
        # Future use?
        self.xAccel = power * math.sin(rotate*math.pi/180.0*-1)
        self.yAccel = power * math.cos(rotate*math.pi/180.0) - 3.711

        print >> sys.stderr,"%s %s" % (self.xAccel,self.yAccel)

    # Future use? - Does not really work here because our acceleration is changing constantly - though it does have use during landing
    def timeToLand(self):
        # Quadratic equation to figure out our time to land
        # We're determining the time before we hit the height of our desired landing spot
        # The assumption here is that we are right over flat land (which clearly isn't the case)
        # What we want to find out is whether or not we are accelerating in the right direction fast enough
        deltaT = None
        squareRoot = 4.0 * self.ySpeed * -1 * self.ySpeed * -1 + 8 * self.yAccel * -1 * (self.yPos - flatY)
        # We treat "down" as positive - we return an invalid value if we're calculated to not even land
        if squareRoot > 0:
            deltaT = ((-2.0 * self.ySpeed * -1) + math.sqrt(squareRoot)) / (2 * self.yAccel * -1)
        else:
            deltaT = 999999999
        print >> sys.stderr,"Time to land: %s" % deltaT
        return deltaT

    # Future use? - Similar to above, does not really work because of the acceleration always changing
    def predictedXLanding(self):
        # This is dependent on our calculated time to land - returns invalid if we are not landing
        deltaT = self.timeToLand()
        finalXCalc = 999999999
        if deltaT < 999999999:
            finalXCalc = self.xPos + self.xSpeed * deltaT + 1.0/2.0 * self.xAccel * deltaT * deltaT
 
        print >> sys.stderr,"Predicted X: %s %s %s" % (finalXCalc,self.xSpeed,self.xAccel)

        return finalXCalc

    # Future use? - Again, simlar to the previous functions
    def willLandInRange(self):
        finalXCalc = self.predictedXLanding()
        if finalXCalc in flatSurfaceList or finalXCalc == 999999999:
            return True
        else:
            return False
  
    def inLandingRange(self):
        return self.xPos in xrange(flatSurfaceList[0]+50,flatSurfaceList[-1]-50)

    def getLandingRangeDist(self):
        if self.xPos < flatSurfaceList[0]:
            self.landingDirection = 1
            return flatSurfaceList[0] - self.xPos
        elif self.xPos > flatSurfaceList[-1]:
            self.landingDirection = -1
            return self.xPos - flatSurfaceList[-1]

    def getDesiredTilt(self):
        
        # Things that will determine which way we tilt:
        # Max horizontal speed (we have to be UNDER this) - otherwise tilt in opposite direction of speed
        # If we are IN landing area we should NOT be tilted, unless we are trying to slow down our horizonatal speed
        # We are not accounting for things like objects being near us, it is straight path calculation no object avoidance

        self.getLandingRangeDist()
        #self.timeToLand()
        #self.willLandInRange()
        
        newAngle = 0

        # 50 seems to be the fastest we can go while keeping the ship manageable for landing
        if self.xSpeed > 45:
            if self.rotate < 0:
                newAngle = 0
            else:
                newAngle = self.rotate+7

        elif self.xSpeed < -45:
            if self.rotate > 0:
                newAngle = 0
            else:
                newAngle = self.rotate-7

        # At this point if we have the desired horizontal speed we should just try to hover
        elif not self.inLandingRange():
            # Tilt us in the direction we want to go
            if self.landingDirection == 1 and self.xSpeed < 45:
                newAngle = self.rotate-7
            elif self.landingDirection == -1 and self.xSpeed > -45:
                newAngle = self.rotate+7

        # If we are over the landing range, try to get us to a slow horizontal speed
        elif self.inLandingRange():
            if self.xSpeed > 5:
                newAngle = self.rotate+7
            elif self.xSpeed < -5:
                newAngle = self.rotate-7

        print >> sys.stderr,newAngle

        # We don't want to tilt too far as we're trying to counteract gravity as much as possible
        if self.inLandingRange():
            if self.ySpeed > 0 and abs(self.xSpeed) > 5:
                if newAngle > 21:
                    newAngle = 21
                elif newAngle < -21:
                    newAngle = -21   
            elif self.yPos < flatY + 250:
                newAngle = 0
            else:
                if newAngle > 21:
                    newAngle = 21
                elif newAngle < -21:
                    newAngle = -21   
        else:
            if newAngle > 21:
                newAngle = 21
            elif newAngle < -21:
                newAngle = -21             
                
        return newAngle

    def getDesiredPower(self):
        # Thrust usage is determined by whether or not we're falling too fast and if we've reached the desired horizontal speed
        # I kept it simple at using either 4 or 0
        if not self.inLandingRange():
            if abs(self.xSpeed) < 45:
                return 4
            elif self.ySpeed < -10:
                return 4
            elif self.yPos < flatY+100:
                return 4
            else:
                return 0
        elif self.inLandingRange():
            if self.ySpeed < -30:
                return 4
            elif abs(self.xSpeed) > 5:
                return 4
            else:
                return 0

# game loop
curLander = None
while True:
    # h_speed: the horizontal speed (in m/s), can be negative.
    # v_speed: the vertical speed (in m/s), can be negative.
    # fuel: the quantity of remaining fuel in liters.
    # rotate: the rotation angle in degrees (-90 to 90).
    # power: the thrust power (0 to 4).
    x, y, h_speed, v_speed, fuel, rotate, power = [int(i) for i in raw_input().split()]

    if curLander == None:
        curLander = Lander()
        
    curLander.updateInfo(x, y, h_speed, v_speed, fuel, rotate, power)

    # Write an action using print
    # To debug: print >> sys.stderr, "Debug messages..."

    # rotate power. rotate is the desired rotation angle. power is the desired thrust power.
    print "%s %s" % (curLander.getDesiredTilt(),curLander.getDesiredPower())
    #curLander.getDesiredTilt()
    #curLander.getDesiredPower()
    #print "-21 4"