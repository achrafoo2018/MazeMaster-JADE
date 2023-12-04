package agents;

import Utils.Point;
import jade.core.Agent;
import jade.core.behaviours.OneShotBehaviour;
import java.util.*;

public class DFSAgent extends Agent {

    private int[][] maze;
    private Point startPoint;
    private Point endPoint;
    private boolean pathFound = false;
    private List<Point> path = new ArrayList<>();
    private Set<Point> visited = new HashSet<>();

    protected void setup() {
        System.out.println("Hello from DFSAgent !");
        // Initialize the maze, start, and end points
        maze = new int[][]{
                {0, 1, 0, 0},
                {0, 0, 0, 0},
                {1, 0, 1, 0},
                {0, 0, 1, 0}
        };
        startPoint = new Point(0, 0);
        endPoint = new Point(3, 3);

        addBehaviour(new DFSBehaviour());
    }

    private class DFSBehaviour extends OneShotBehaviour {

        public void action() {
            dfs(startPoint);
            if (pathFound) {
                System.out.println("Path found!");
                for (Point p : path) {
                    System.out.println(p);
                }
            } else {
                System.out.println("No path found.");
            }
        }

        private void dfs(Point current) {
            if (pathFound || visited.contains(current)) {
                return;
            }

            visited.add(current);
            path.add(current);

            if (current.equals(endPoint)) {
                pathFound = true;
                return;
            }

            for (Point neighbor : getNeighbors(current)) {
                dfs(neighbor);
            }

            if (!pathFound) {
                path.remove(path.size() - 1); // Backtrack if not found
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
    }
}
