package agents;

import Utils.MazeProvider;
import Utils.Point;
import jade.core.AID;
import jade.core.Agent;
import jade.core.behaviours.CyclicBehaviour;
import jade.core.behaviours.OneShotBehaviour;
import jade.lang.acl.ACLMessage;

import java.util.*;

import static java.lang.System.console;
import static java.lang.System.exit;

public class DFSAgent extends Agent {

    private int[][] maze;
    private Point startPoint;
    private Point endPoint;
    private boolean pathFound = false;
    private List<Point> path = new ArrayList<>();
    private Set<Point> visited = new HashSet<>();

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
        startPoint = new Point(0, 1);
        endPoint = new Point(provider.getDimension()-1, provider.getDimension()-2);
        String myName = getLocalName();
        System.out.println("My name is: " + myName);
        addBehaviour(new CyclicBehaviour(this) {
            public void action() {
                ACLMessage msg = receive();
                if (msg != null && "Start".equals(msg.getContent())) {
                    removeBehaviour(this); // Remove this waiting behavior
                    addBehaviour(new DFSBehaviour()); // Add main behavior
                } else {
                    block();
                }
            }
        });
        addBehaviour(new CyclicBehaviour(this) {
            public void action() {
                receiveMessagesAndUpdateMaze();
            }
        });
    }

    @Override
    protected void takeDown() {
        exit(0);
    }

    // Method to send dead-end point information
    private void sendDeadEndPoint(Point deadEndPoint) {
        System.out.println("Sending end point !! ");
        ACLMessage msg = new ACLMessage(ACLMessage.INFORM);
        msg.addReceiver(new AID("BFSAgent", AID.ISLOCALNAME));
        msg.addReceiver(new AID("AStarAgent", AID.ISLOCALNAME));
        msg.setContent("DeadEndPoint: " + deadEndPoint.x + "," + deadEndPoint.y);

        send(msg);
    }

    private void receiveMessagesAndUpdateMaze() {
        ACLMessage msg = receive();
        if (msg != null && msg.getContent().startsWith("DeadEndPoint:")) {
            String[] parts = msg.getContent().split(":")[1].split(",");
            int x = Integer.parseInt(parts[0].trim());
            int y = Integer.parseInt(parts[1].trim());
            maze[x][y] = 'X'; // Marking the dead end point
        }
    }

    private class DFSBehaviour extends OneShotBehaviour {

        public void action() {
            dfs(startPoint);
            if (pathFound) {
                System.out.print("1;"); // path found
                for (Point p : path) {
                    System.out.print(p);
                    System.out.print(";");
                }
            } else {
                System.out.println("0;"); // path not found
            }
            myAgent.doDelete();
        }

        private void dfs(Point current) {
            if (visited.contains(current)) {
                return;
            }

            visited.add(current);
            path.add(current);

            if (current.equals(endPoint)) {
                pathFound = true;
            } else {
                boolean deadEnd = true;
                for (Point neighbor : getNeighbors(current)) {
                    if (!visited.contains(neighbor)) {
                        dfs(neighbor);
                        if (pathFound) {
                            deadEnd = false;
                            break;
                        }
                    }
                }

                if (deadEnd) {
                    sendDeadEndPoint(current); // Send message when backtracking from a dead end
                }
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
