package Utils;

import java.util.*;

public class MazeGenerator {

    private MazeGenerator() {
        // Private constructor to prevent instantiation
    }

    public static int[][] generateMaze(int width, int height) {
        int[][] maze = new int[width][height];
        Random random = new Random();

        // Initialize all cells as walls
        for (int x = 0; x < width; x++) {
            for (int y = 0; y < height; y++) {
                maze[x][y] = 1;
            }
        }

        // Start from the top left cell (0, 0)
        Stack<Point> stack = new Stack<>();
        stack.push(new Point(0, 0));

        while (!stack.isEmpty()) {
            Point current = stack.pop();
            if (isValidNextCell(current.x, current.y, maze, width, height)) {
                maze[current.x][current.y] = 0; // Set current cell to free space
                List<Point> neighbors = getNeighbors(current.x, current.y, width, height);

                // Shuffle neighbors to maintain randomness
                Collections.shuffle(neighbors, random);

                for (Point neighbor : neighbors) {
                    stack.push(neighbor);
                }
            }
        }

        // Ensure the bottom right cell is accessible
        maze[width - 1][height - 1] = 0;

        return maze;
    }

    private static boolean isValidNextCell(int x, int y, int[][] maze, int width, int height) {
        if (x < 0 || y < 0 || x >= width || y >= height || maze[x][y] == 0) {
            return false;
        }

        int count = 0;
        if (x > 0 && maze[x - 1][y] == 0) count++;
        if (y > 0 && maze[x][y - 1] == 0) count++;
        if (x < width - 1 && maze[x + 1][y] == 0) count++;
        if (y < height - 1 && maze[x][y + 1] == 0) count++;

        return count <= 1;
    }

    private static List<Point> getNeighbors(int x, int y, int width, int height) {
        List<Point> neighbors = new ArrayList<>();
        if (x > 1) neighbors.add(new Point(x - 2, y));
        if (y > 1) neighbors.add(new Point(x, y - 2));
        if (x < width - 2) neighbors.add(new Point(x + 2, y));
        if (y < height - 2) neighbors.add(new Point(x, y + 2));

        return neighbors;
    }

    static class Point {
        int x, y;

        Point(int x, int y) {
            this.x = x;
            this.y = y;
        }
    }
}
