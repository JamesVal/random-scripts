using System;
using System.Collections.Generic;

public class Vector2
{
  public float m_x;
  public float m_y;

  public Vector2(float x, float y)
  {
    m_x = x;
    m_y = y;
  }
}

public class Node
{
  public List<Node> possiblePaths = new List<Node>();
  public Vector2 m_origin;
  public int levelFromStart = -99;

  float boxCollisionSize = 1f;
  bool isObstacle = false;

  public Node(float x, float y)
  {
    m_origin = new Vector2(x, y);
  }

  public Vector2 getOrigin()
  {
    return m_origin;
  }

  public void addPath(Node nodeToAdd)
  {
    if (!possiblePaths.Contains(nodeToAdd))
      possiblePaths.Add(nodeToAdd);
  }

  public void setObstacle(bool state)
  {
    isObstacle = state;
  }

  public bool getObstacle()
  {
    return isObstacle;
  }

  public void printPaths()
  {
    Console.WriteLine("Origin: " + m_origin.m_x + "," + m_origin.m_y);
    Console.Write("Connected to: ");
    for (int i = 0; i < possiblePaths.Count; i++)
    {
      Vector2 connectedOrigin = possiblePaths[i].getOrigin();
      Console.Write("(" + connectedOrigin.m_x + "," + connectedOrigin.m_y + ")");
    } 
    Console.WriteLine("");
  }
}

public class PathFinder
{
  public List<Node> allNodes = new List<Node>();
  public List<Node> traversedNodes = new List<Node>();
  public int pathLength = 0;
  public Node startNode;
  public Node endNode;

  public void generateGrid(int rows, int cols)
  {
    for (int x = 0; x < rows; x++)
    {
      for (int y = 0; y < cols; y++)
      {
        Node newNode = new Node(x, y);
        /* Simulate walls */
        if ((x == 1 && y == 1) || (x == 2 && y == 1)) newNode.setObstacle(true);
        if ((x == 0 && y == 1)) newNode.setObstacle(true);
        allNodes.Add(newNode);
      }
    }
  }

  public void connectNodes()
  {
    for (int eachNodeIdx = 0; eachNodeIdx < allNodes.Count; eachNodeIdx++)
    {
      Node curNode = allNodes[eachNodeIdx];
      Vector2 curOrigin = allNodes[eachNodeIdx].getOrigin();
      for (int eachInnerNodeIdx = (eachNodeIdx+1); eachInnerNodeIdx < allNodes.Count; eachInnerNodeIdx++) 
      {
        if (eachNodeIdx != eachInnerNodeIdx)
        {
          Node innerNode = allNodes[eachInnerNodeIdx];
          Vector2 innerOrigin = allNodes[eachInnerNodeIdx].getOrigin();
          if (((Math.Abs(curOrigin.m_x-innerOrigin.m_x) == 1f) && (Math.Abs(curOrigin.m_y-innerOrigin.m_y) <= 1f)) ||
            ((Math.Abs(curOrigin.m_y-innerOrigin.m_y) == 1f) && (Math.Abs(curOrigin.m_x-innerOrigin.m_x) <= 1f)))
          {
            curNode.addPath(innerNode);
            innerNode.addPath(curNode);
          }
        }
      }
    }

    for (int eachNodeIdx = 0; eachNodeIdx < allNodes.Count; eachNodeIdx++)
    {
      Node curNode = allNodes[eachNodeIdx];
      curNode.printPaths();
    }
  }

  public void setStartEnd(Vector2 startPosition, Vector2 endPosition)
  {
    for (int eachNodeIdx = 0; eachNodeIdx < allNodes.Count; eachNodeIdx++)
    {
      Node curNode = allNodes[eachNodeIdx];

      if ((curNode.m_origin.m_x == startPosition.m_x) && (curNode.m_origin.m_y == startPosition.m_y))
      {
        startNode = curNode;
      }
      if ((curNode.m_origin.m_x == endPosition.m_x) && (curNode.m_origin.m_y == endPosition.m_y))
      {
        endNode = curNode;
      }
    }
  }

  public bool traversePath(List<Node> currentNodes, int curDistance)
  {
    List<Node> nextNodes = new List<Node>();

    for (int eachNodeIdx = 0; eachNodeIdx < currentNodes.Count; eachNodeIdx++)
    {
      Node curNode = currentNodes[eachNodeIdx];

      if (curNode.levelFromStart != -99) continue;

      curNode.levelFromStart = curDistance;

      Console.WriteLine("Set_Level " + curNode.levelFromStart + " (" + curNode.m_origin.m_x + "," + curNode.m_origin.m_y + ")");

      if ((curNode.m_origin.m_x == endNode.m_origin.m_x) && (curNode.m_origin.m_y == endNode.m_origin.m_y))
      {
        Console.WriteLine("FOUND END " + curNode.levelFromStart.ToString());
        //Console.WriteLine("FOUND END");
        return true;
      }

      for (int eachInnerNodeIdx = 0; eachInnerNodeIdx < curNode.possiblePaths.Count; eachInnerNodeIdx++)
      {
        Node innerNode = curNode.possiblePaths[eachInnerNodeIdx];
        
        //if (!(previousNodes.Contains(innerNode) || currentNodes.Contains(innerNode)) && !innerNode.getObstacle())
        if (!nextNodes.Contains(innerNode) && (innerNode.levelFromStart < 0) && !innerNode.getObstacle())
          nextNodes.Add(innerNode);
      }
    }

    if (nextNodes.Count > 0) return traversePath(nextNodes, curDistance+1);

    Console.WriteLine("NO PATH");

    return false;
  }

  double calcDistance(Node startNode, Node endNode)
  {
    return Math.Sqrt(Math.Pow(Math.Abs(startNode.m_origin.m_x-endNode.m_origin.m_x), 2) + Math.Pow(Math.Abs(startNode.m_origin.m_y-endNode.m_origin.m_y), 2));
  }

  public void buildPath(List<Node> pathToBuild, Node currentNode)
  {
    pathToBuild.Insert(0, currentNode);
    List<Node> nextNodes = new List<Node>();
    Node nodeToAdd;
    double curDistance;

    for (int eachNodeIdx = 0; eachNodeIdx < currentNode.possiblePaths.Count; eachNodeIdx++)
    {
      Node nextNode = currentNode.possiblePaths[eachNodeIdx];
      if ((nextNode.levelFromStart == (currentNode.levelFromStart-1)) && !pathToBuild.Contains(nextNode))
        nextNodes.Add(nextNode);
    }

    if (nextNodes.Count > 0)
    {
      curDistance = calcDistance(currentNode, nextNodes[0]);
      nodeToAdd = nextNodes[0];

      for (int eachNodeIdx = 1; eachNodeIdx < nextNodes.Count; eachNodeIdx++)
      {
        Node nextNode = nextNodes[eachNodeIdx];
        double nextDistance = calcDistance(currentNode, nextNode);
        if (nextDistance < curDistance)
        {
          curDistance = nextDistance;
          nodeToAdd = nextNode;
        }
      }

      buildPath(pathToBuild, nodeToAdd);
    }
  }

  public void printPath(List<Node> pathToPrint)
  {
    Console.WriteLine("Current Path:");
    for (int eachNodeIdx = 0; eachNodeIdx < pathToPrint.Count; eachNodeIdx++)
    {
      Node curNode = pathToPrint[eachNodeIdx];
      Console.Write("("+curNode.m_origin.m_x+","+curNode.m_origin.m_y+")");
    }
  }
}

public class Program
{ 
  public static void Main()
  {
    PathFinder pathFinder = new PathFinder();
    List<Node> myPath = new List<Node>();
    pathFinder.generateGrid(4,4);
    pathFinder.connectNodes();
    pathFinder.setStartEnd(new Vector2(0,0), new Vector2(3,3));
    pathFinder.traversePath(new List<Node>{ pathFinder.startNode }, 0);
    pathFinder.buildPath(myPath, pathFinder.endNode);
    Console.WriteLine("(" + pathFinder.endNode.m_origin.m_x + "," + pathFinder.endNode.m_origin.m_y + ") - " + pathFinder.endNode.levelFromStart);
    Console.WriteLine(myPath.Count);
    pathFinder.printPath(myPath);
  }
}