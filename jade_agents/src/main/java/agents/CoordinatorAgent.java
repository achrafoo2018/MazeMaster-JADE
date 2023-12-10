package agents;

import Utils.MazeProvider;
import jade.core.AID;
import jade.core.Agent;
import jade.core.behaviours.OneShotBehaviour;
import jade.lang.acl.ACLMessage;
import jade.core.behaviours.CyclicBehaviour;
import jade.lang.acl.MessageTemplate;

import static java.lang.System.exit;
import static java.lang.Thread.sleep;

public class CoordinatorAgent extends Agent {
    private int[][] maze;
    private static final MessageTemplate mt = MessageTemplate.MatchPerformative(
            ACLMessage.INFORM
    );
    protected void setup() {
        Object[] args = getArguments();
        if (args != null && args.length == 0){
            System.out.println("No file path provided.");
            return;
        }
        // Add a OneShotBehaviour to send the start signal
        String filePath = (String) args[0];
        // Use the filePath to initialize the MazeProvider
        MazeProvider provider = MazeProvider.getInstance(filePath);
        String myName = getLocalName();
        maze = provider.getMaze();

        ACLMessage startSignal = new ACLMessage(ACLMessage.INFORM);
        startSignal.addReceiver(new AID("BFSAgent", AID.ISLOCALNAME));
        startSignal.addReceiver(new AID("DFSAgent", AID.ISLOCALNAME));
        startSignal.addReceiver(new AID("AStarAgent", AID.ISLOCALNAME));
        startSignal.setContent("Start");
        System.out.print("Messages;");

        send(startSignal);


        addBehaviour(new CyclicBehaviour(this) {
            private int doneCounter = 0;

            public void action() {
                // Define the message template to listen for specific message types
                ACLMessage msg = myAgent.blockingReceive(mt);
                if (msg != null) {
                    AID senderAid = msg.getSender();

                    // Get the sender's name
                    String senderName = senderAid.getLocalName();
                    if (msg.getContent().startsWith("DeadEndPoint:")) {
                        String[] parts = msg.getContent().split(":")[1].split(",");
                        int x = Integer.parseInt(parts[0].trim());
                        int y = Integer.parseInt(parts[1].trim());
                        maze[x][y] = 2; // Marking the dead end point
                        System.out.print(senderName + ",Noted !;");
                    }else if(msg.getContent().startsWith("Done")){
                        this.doneCounter++;
                    }else {
                        // Message received. Process it
                        String content = msg.getContent();
                        String[] coordinates = content.split(",");
                        int x = Integer.parseInt(coordinates[0]);
                        int y = Integer.parseInt(coordinates[1]);

                        // Prepare the response
                        ACLMessage reply = msg.createReply();
                        if (isValidCoordinate(x, y) && maze[x][y] == 0) {
                            reply.setPerformative(ACLMessage.INFORM);
                            reply.setContent("1"); // Dot found
                            System.out.print(senderName + ",Go;");
                        } else {
                            reply.setPerformative(ACLMessage.INFORM);
                            reply.setContent("0"); // Dot not found
                            System.out.print(senderName + ",Don't go;");
                        }
                        send(reply);
                    }
                }
                if(this.doneCounter == 3){ // all 3 agents done
                    myAgent.doDelete();
                }
            }

            private boolean isValidCoordinate(int x, int y) {
                return x >= 0 && x < maze.length && y >= 0 && y < maze[x].length;
            }
        });
    }

    @Override
    protected void takeDown() {
        exit(0);
    }
}
