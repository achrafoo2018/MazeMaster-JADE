package agents;

import jade.core.AID;
import jade.core.Agent;
import jade.core.behaviours.OneShotBehaviour;
import jade.lang.acl.ACLMessage;

public class CoordinatorAgent extends Agent {
    protected void setup() {
        // Add a OneShotBehaviour to send the start signal
        addBehaviour(new OneShotBehaviour(this) {
            public void action() {
                // Send a start signal to all agents
                ACLMessage startSignal = new ACLMessage(ACLMessage.INFORM);
                startSignal.setContent("Start");
                startSignal.addReceiver(new AID("BFSAgent", AID.ISLOCALNAME));
                startSignal.addReceiver(new AID("DFSAgent", AID.ISLOCALNAME));
                // startSignal.addReceiver(new AID("AStarAgent", AID.ISLOCALNAME));
                myAgent.send(startSignal);
            }

            @Override
            public int onEnd() {
                myAgent.doDelete(); // Terminate the agent after sending the message
                return super.onEnd();
            }
        });
    }
}
