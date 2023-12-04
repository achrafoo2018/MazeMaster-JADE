package Utils;

import java.util.Random;

public class MazeProvider {
    private static MazeProvider instance = null;

    private int[][] maze;
    private int width;
    private int height;

    private MazeProvider() {
        Random random = new Random();
        this.width = random.nextInt(10, 12);
        this.height = random.nextInt(10, 12);
        this.maze = MazeGenerator.generateMaze(width, height);
    }

    public static MazeProvider getInstance() {
        if (instance == null) {
            instance = new MazeProvider();
        }
        return instance;
    }

    public int[][] getMaze() {
        return maze;
    }

    public int getWidth() {
        return width;
    }

    public int getHeight() {
        return height;
    }
}
