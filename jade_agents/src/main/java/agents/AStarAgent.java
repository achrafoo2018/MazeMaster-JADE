package agents;

import Utils.MazeProvider;
import Utils.Point;
import jade.core.Agent;
import jade.core.behaviours.OneShotBehaviour;
import java.util.*;

public class AStarAgent extends Agent {

    private int[][] maze;
    private Point startPoint;
    private Point endPoint;

    protected void setup() {
        System.out.println("Hello from AStarAgent !");
        MazeProvider provider = MazeProvider.getInstance();
        maze = provider.getMaze();
        for(int i=0; i < 100000; i++);
        System.out.println(provider.getSymbolicMaze());
        startPoint = new Point(0, 1);
        endPoint = new Point(provider.getDimension()-1, provider.getDimension()-2);

        addBehaviour(new AStarBehaviour());
    }

    private class AStarBehaviour extends OneShotBehaviour {
        private Map<Point, Integer> gScore = new HashMap<>();

        public void action() {
            PriorityQueue<Point> openSet = new PriorityQueue<>(Comparator.comparingInt(p -> fScore(p)));
            Map<Point, Point> cameFrom = new HashMap<>();
            Map<Point, Integer> gScore = new HashMap<>();
            boolean pathFound = false;

            openSet.add(startPoint);
            gScore.put(startPoint, 0);
            cameFrom.put(startPoint, null);

            while (!openSet.isEmpty()) {
                Point current = openSet.poll();

                if (current.equals(endPoint)) {
                    pathFound = true;
                    break;
                }

                for (Point neighbor : getNeighbors(current)) {
                    int tentativeGScore = gScore.getOrDefault(current, Integer.MAX_VALUE) + 1;
                    if (tentativeGScore < gScore.getOrDefault(neighbor, Integer.MAX_VALUE)) {
                        cameFrom.put(neighbor, current);
                        gScore.put(neighbor, tentativeGScore);
                        if (!openSet.contains(neighbor)) {
                            openSet.add(neighbor);
                        }
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

        private int fScore(Point p) {
            return gScore.getOrDefault(p, Integer.MAX_VALUE) + h(p);
        }

        private int h(Point p) {
            // Manhattan distance
            return Math.abs(p.x - endPoint.x) + Math.abs(p.y - endPoint.y);
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
