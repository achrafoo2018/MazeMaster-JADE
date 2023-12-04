package agents;

import Utils.MazeGenerator;
import Utils.MazeProvider;
import Utils.Point;
import jade.core.Agent;
import jade.core.behaviours.OneShotBehaviour;
import jade.domain.introspection.SuspendedAgent;

import java.util.*;

public class BFSAgent extends Agent {

    private int[][] maze;
    private Point startPoint;
    private Point endPoint;

    protected void setup() {
        System.out.println("Hello from BFSAgent !");
        // Initialize the maze, start, and end points
        // For demonstration purposes, let's create a simple maze
        MazeProvider provider = MazeProvider.getInstance();
        maze = provider.getMaze();
        for(int i=0; i < 100000; i++);
        for(int i=0; i < provider.getWidth(); i++){
            for(int j=0; j < provider.getHeight(); j++){
                System.out.print(maze[i][j]);
                System.out.print(' ');
            }
            System.out.println();
        }
        startPoint = new Point(0, 0);
        endPoint = new Point(provider.getWidth()-1, provider.getHeight()-1);
        addBehaviour(new BFSBehaviour());
    }

    private class BFSBehaviour extends OneShotBehaviour {

        public void action() {
            Queue<Point> queue = new LinkedList<>();
            Map<Point, Point> cameFrom = new HashMap<>();
            boolean pathFound = false;

            queue.add(startPoint);
            cameFrom.put(startPoint, null);

            while (!queue.isEmpty()) {
                Point current = queue.poll();

                // Check if the end point is reached
                if (current.equals(endPoint)) {
                    pathFound = true;
                    break;
                }

                // Explore neighbors
                for (Point neighbor : getNeighbors(current)) {
                    if (!cameFrom.containsKey(neighbor)) {
                        queue.add(neighbor);
                        cameFrom.put(neighbor, current);
                    }
                }
            }

            if (pathFound) {
                System.out.println("Path found!");
                List<Point> path = reconstructPath(cameFrom);
                for (Point p : path) {
                    System.out.println(p);
                }
            } else {
                System.out.println("No path found.");
            }
        }
        private List<Point> getNeighbors(Point p) {
            List<Point> neighbors = new ArrayList<>();
            int[] dx = {1, -1, 0, 0};
            int[] dy = {0, 0, 1, -1};

            for (int i = 0; i < 4; i++) {
                int newX = p.x + dx[i];
                int newY = p.y + dy[i];

                if (newX >= 0 && newX < maze.length && newY >= 0 && newY < maze[0].length && maze[newX][newY] == 0) {
                    neighbors.add(new Point(newX, newY));
                }
            }
            return neighbors;
        }

        private List<Point> reconstructPath(Map<Point, Point> cameFrom) {
            List<Point> path = new ArrayList<>();
            Point current = endPoint;

            while (current != null) {
                path.add(current);
                current = cameFrom.get(current);
            }

            Collections.reverse(path);
            return path;
        }
    }
}