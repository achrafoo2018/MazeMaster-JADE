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
                for(int i=0; i < 10; i++) { // bch yousel el msg ;')
                    ACLMessage startSignal = new ACLMessage(ACLMessage.INFORM);
                    startSignal.addReceiver(new AID("BFSAgent", AID.ISLOCALNAME));
                    startSignal.addReceiver(new AID("DFSAgent", AID.ISLOCALNAME));
                    startSignal.addReceiver(new AID("AStarAgent", AID.ISLOCALNAME));
                    startSignal.setContent("Start");

                    send(startSignal);
                }
            }

            @Override
            public int onEnd() {
                myAgent.doDelete(); // Terminate the agent after sending the message
                return super.onEnd();
            }
        });
    }
}
