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
  Node startNode;
  Node endNode;

  public void generateGrid(int rows, int cols)
  {
    for (int x = 0; x < rows; x++)
    {
      for (int y = 0; y < cols; y++)
      {
        Node newNode = new Node(x, y);
        /* Simulate walls */
        if ((x == 1 && y == 1) || (x == 2 && y == 1)) newNode.setObstacle(true);
        allNodes.Add(newNode);
      }
    }

    // JJV DEBUG - pick a couple of spots
    startNode = allNodes[0];
    endNode = allNodes[allNodes.Count-1];
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

  public void traversePath(Node currentNode, int pathLength)
  {
    if ((currentNode.m_origin.m_x == endNode.m_origin.m_x) && (currentNode.m_origin.m_y == endNode.m_origin.m_y))
    {
      return pathLength;
    }
    else
    {
      for (int eachNodeIdx = 0; eachNodeIdx < currentNode.possiblePaths.Count; eachNodeIdx++)
      {
        Node curNode = currentNode.possiblePaths[eachNodeIdx];
        if ((curNode.m_origin.m_x == endNode.m_origin.m_x) && (curNode.m_origin.m_y == endNode.m_origin.m_y))
        {
          Console.WriteLine("FOUND END");
          break;
        }
      }
    }
  }
}

public class Program
{ 
  public static void Main()
  {
    PathFinder pathFinder = new PathFinder();
    pathFinder.generateGrid(4,4);
    pathFinder.connectNodes();
    pathFinder.traversePath(pathFinder.allNodes[pathFinder.allNodes.Count-5]);

    Console.WriteLine("Hello World");
  }
}