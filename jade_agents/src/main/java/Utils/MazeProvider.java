package Utils;

import java.util.Arrays;
import java.util.Random;
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class MazeProvider {
    private static MazeProvider instance = null;

    private int[][] maze;
    private int dimension;

    private MazeProvider(String filepath) {
        try {
            this.maze = readMazeFromFile(filepath);
            this.dimension = maze.length;
        } catch (IOException e) {
            e.printStackTrace();
            // Handle the exception or throw it further
        }
    }


    private int[][] readMazeFromFile(String filePath) throws IOException {
        List<int[]> rows = new ArrayList<>();
        try (BufferedReader br = new BufferedReader(new FileReader(filePath))) {
            String line;
            while ((line = br.readLine()) != null) {
                String[] values = line.split(",");
                int[] row = new int[values.length];
                for (int i = 0; i < values.length; i++) {
                    row[i] = Integer.parseInt(values[i].trim());
                }
                rows.add(row);
            }
        }

        return rows.toArray(new int[0][]);
    }


    public static MazeProvider getInstance(String filepath) {
        if (instance == null) {
            instance = new MazeProvider(filepath);
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
