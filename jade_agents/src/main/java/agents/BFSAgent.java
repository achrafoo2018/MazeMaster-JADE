package agents;

import Utils.MazeProvider;
import Utils.Point;
import jade.core.AID;
import jade.core.Agent;
import jade.core.behaviours.CyclicBehaviour;
import jade.core.behaviours.OneShotBehaviour;
import jade.lang.acl.ACLMessage;
import jade.lang.acl.MessageTemplate;

import java.util.*;

import static java.lang.System.console;
import static java.lang.System.exit;

public class BFSAgent extends Agent {

    private int[][] maze;
    private Point startPoint;
    private Point endPoint;
    private static final MessageTemplate mt = MessageTemplate.MatchPerformative(
            ACLMessage.INFORM
    );

    protected void setup() {
        Object[] args = getArguments();
        if (args != null && args.length == 0){
            System.out.println("No file path provided.");
            return;
        }
        String filePath = (String) args[0];
        // Use the filePath to initialize the MazeProvider
        MazeProvider provider = MazeProvider.getInstance(filePath);
        maze = provider.getMaze();
        startPoint = new Point(0, 0);
        endPoint = new Point(provider.getDimension()-1, provider.getDimension()-1);
        addBehaviour(new CyclicBehaviour(this) {
            public void action() {
                ACLMessage msg = blockingReceive(mt);
                if (msg != null && "Start".equals(msg.getContent())) {
                    removeBehaviour(this); // Remove this waiting behavior
                    addBehaviour(new BFSBehaviour()); // Add main behavior
                }
            }
        });
    }

    @Override
    protected void takeDown() {
        exit(0);
    }

    private class BFSBehaviour extends OneShotBehaviour {

        public void action() {
            Queue<Point> queue = new LinkedList<>();
            Map<Point, Point> cameFrom = new HashMap<>();
            List<Point> fullPath = new ArrayList<>();  // List to store the full path
            boolean pathFound = false;
            System.out.print("Messages;");

            queue.add(startPoint);
            cameFrom.put(startPoint, null);
            while (!queue.isEmpty()) {
                Point current = queue.poll();
                fullPath.add(current);  // Add the current point to the full path

                // Check if the end point is reached
                if (current.equals(endPoint)) {
                    pathFound = true;
                    break;
                }

                // Explore neighbors
                for (Point neighbor : getNeighbors(current)) {
                    ACLMessage msg = new ACLMessage(ACLMessage.INFORM);
                    msg.setContent(neighbor.x + "," + neighbor.y);
                    System.out.print(neighbor);
                    System.out.print(";");
                    msg.addReceiver(new AID("CoordinatorAgent", AID.ISLOCALNAME));
                    send(msg);
                    msg = blockingReceive();
                    if(msg.getContent().equals("1")){
                        if (!cameFrom.containsKey(neighbor)) {
                            queue.add(neighbor);
                            cameFrom.put(neighbor, current);
                        }
                    }
                }
            }
            System.out.println();

            if (pathFound) {
                System.out.print("1;"); // path found
                for (Point p : fullPath) {
                    System.out.print(p);
                    System.out.print(";");
                }
            } else {
                System.out.print("0;"); // path not found
            }
            System.out.println();
            ACLMessage msg = new ACLMessage(ACLMessage.INFORM);
            msg.addReceiver(new AID("CoordinatorAgent", AID.ISLOCALNAME));
            msg.setContent("Done");
            send(msg);
            myAgent.doDelete();
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