package Utils;

import java.util.Arrays;
import java.util.Random;

public class MazeProvider {
    private static MazeProvider instance = null;

    private int[][] maze;
    private int dimension;

    private MazeProvider() {
        Random random = new Random();
        this.dimension = 8;
        Point start = new Point(0, 1);
        Point end = new Point(dimension-1, dimension-2);
        this.maze = MazeGenerator.generateMaze(8, 8, start, end);
    }

    public static MazeProvider getInstance() {
        if (instance == null) {
            instance = new MazeProvider();
        }
        return instance;
    }

    public String getRawMaze() {
        StringBuilder sb = new StringBuilder();
        for (int[] row : this.maze) {
            sb.append(Arrays.toString(row)).append("\n");
        }
        return sb.toString();
    }

    public String getSymbolicMaze() {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < this.dimension; i++) {
            for (int j = 0; j < this.dimension; j++) {
                sb.append(this.maze[i][j] == 1 ? "*" : " ");
                sb.append("  ");
            }
            sb.append("\n");
        }
        return sb.toString();
    }

    public int[][] getMaze() {
        return maze;
    }

    public int getDimension() { return this.dimension; };
}
