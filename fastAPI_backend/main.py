from fastapi import FastAPI
import subprocess
import os
import asyncio
from multiprocessing import Process, Queue
import time
from maze_generator import MazeGenerator
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Construct the absolute file path
file_path = os.path.abspath("maze.csv")

# Configuring CORSMiddleware
origins = ["http://localhost:3000", "localhost:3000" "*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/run-bfs-agent/")
async def run_bfs_agent():
    try:
        # Format the command to run the JADE agent
        command = [
            "java",
            "-cp",
            "../jade_agents/out/artifacts/Project_IAD_jar/Project_IAD.jar",
            "jade.Boot",
            "-agents",
            f"BFSAgent:agents.BFSAgent({file_path})",
            "-container",
        ]

        # Start the JADE agent with the provided file path
        process = subprocess.Popen(
            command, stdout=subprocess.PIPE, stderr=subprocess.DEVNULL
        )
        stdout, stderr = process.communicate()

        # Check for errors
        if stderr:
            return {"error": stderr.decode()}

        # Return the output of the agent
        out = stdout.decode()
        out = out.split(";")
        if out[0] == "0":  # path not found
            pass  # regenerate maze and try again

        out = out[1:]
        return {"output": stdout.decode()}

    except Exception as e:
        return {"error": str(e)}


@app.post("/run-dfs-agent/")
async def run_dfs_agent():
    try:
        # Format the command to run the JADE agent
        command = [
            "java",
            "-cp",
            "../jade_agents/out/artifacts/Project_IAD_jar/Project_IAD.jar",
            "jade.Boot",
            "-agents",
            f"DFSAgent:agents.DFSAgent({file_path})",
            "-container",
        ]

        # Start the JADE agent with the provided file path
        process = subprocess.Popen(
            command, stdout=subprocess.PIPE, stderr=subprocess.DEVNULL
        )
        stdout, stderr = process.communicate()

        # Check for errors
        if stderr:
            return {"error": stderr.decode()}

        # Return the output of the agent
        out = stdout.decode()
        out = out.split(";")
        if out[0] == "0":  # path not found
            pass  # regenerate maze and try again

        out = out[1:]
        return {"output": stdout.decode()}

    except Exception as e:
        return {"error": str(e)}


@app.post("/run-coordinator-agent/")
async def run_coordinator_agent():
    try:
        # Format the command to run the JADE agent
        command = [
            "java",
            "-cp",
            "../jade_agents/out/artifacts/Project_IAD_jar/Project_IAD.jar",
            "jade.Boot",
            "-agents",
            f"CoordinatorAgent:agents.CoordinatorAgent({file_path})",
            "-container",
        ]

        # Start the JADE agent with the provided file path
        process = subprocess.Popen(
            command, stdout=subprocess.PIPE, stderr=subprocess.DEVNULL
        )
        stdout, stderr = process.communicate()

        # Check for errors
        if stderr:
            return {"error": stderr.decode()}

        # Return the output of the agent
        out = stdout.decode()
        out = out.split(";")
        if out[0] == "0":  # path not found
            pass  # regenerate maze and try again

        out = out[1:]
        return {"output": stdout.decode()}

    except Exception as e:
        return {"error": str(e)}


@app.post("/run-astar-agent/")
async def run_astar_agent():
    try:
        # Format the command to run the JADE agent
        command = [
            "java",
            "-cp",
            "../jade_agents/out/artifacts/Project_IAD_jar/Project_IAD.jar",
            "jade.Boot",
            "-agents",
            f"AStarAgent:agents.AStarAgent({file_path})",
            "-container",
        ]

        # Start the JADE agent with the provided file path
        process = subprocess.Popen(
            command, stdout=subprocess.PIPE, stderr=subprocess.DEVNULL
        )
        stdout, stderr = process.communicate()

        # Check for errors
        if stderr:
            return {"error": stderr.decode()}

        # Return the output of the agent
        out = stdout.decode()
        out = out.split(";")
        if out[0] == "0":  # path not found
            pass  # regenerate maze and try again

        out = out[1:]
        return {"output": stdout.decode()}

    except Exception as e:
        return {"error": str(e)}


@app.get("/get-maze")
async def get_maze():
    gen = MazeGenerator()
    # gen.generate_and_save_maze(N, M, P0, P1, 'maze.csv')
    return gen.get_maze("maze.csv")


@app.get("/generate-maze")
async def generate_maze():
    N = 20
    M = 20
    P0 = (0, 0)
    P1 = (N - 1, M - 1)
    gen = MazeGenerator()
    gen.generate_and_save_maze(N, M, P0, P1, "maze.csv")
    return gen.get_maze("maze.csv")


def agent_runner(agent_function, queue):
    # Run the agent function and put the result in the queue
    result = asyncio.run(agent_function())
    queue.put(result)


def format_output(output, coordinator_output, agent_name):
    output = output["output"].split("\n")[:-1]
    messages = output[0].split(";")[1:-1]
    messages = list(map(lambda x: f"Can I go to {x} ?" if x[0] == "(" else x, messages))
    path = output[1].split(";")[1:-1]
    path = list(
        map(lambda x: [int(y) for y in x[1:-1].split(", ")], path)
    )  # wear a helmet, this is ugly
    answers = coordinator_output["output"].split(";")[1:-1]
    answers = list(filter(lambda x: x.split(",")[0] == agent_name, answers))
    answers = list(map(lambda x: x.split(",")[1], answers))

    return {"messages": messages, "answers": answers, "path": path}


@app.get("/run-all-agents")
async def run_all_agents():
    try:
        # # Create queues for each agent
        # bfs_queue = Queue()
        # dfs_queue = Queue()
        # astar_queue = Queue()

        # # Create and start processes for BFS, DFS, and A* agents
        # bfs_process = Process(target=agent_runner, args=(run_bfs_agent, bfs_queue))
        # dfs_process = Process(target=agent_runner, args=(run_dfs_agent, dfs_queue))
        # astar_process = Process(target=agent_runner, args=(run_astar_agent, astar_queue))

        # bfs_process.start()
        # dfs_process.start()
        # astar_process.start()

        # # Wait a moment to ensure the other agents are operational
        # time.sleep(1)  # Adjust this delay as needed

        # # Start the coordinator agent
        # coordinator_process = await run_coordinator_agent()

        # # Wait for all processes to complete
        # bfs_process.join()
        # dfs_process.join()
        # astar_process.join()

        # dfs_output = dfs_queue.get()
        # bfs_output = bfs_queue.get()
        # astar_output = astar_queue.get()
        # coordinator_output = coordinator_process

        # # Collect results from queues
        # results = {
        #     "bfs": format_output(bfs_output, coordinator_output, "BFSAgent"),
        #     "dfs": format_output(dfs_output, coordinator_output, "DFSAgent"),
        #     "astar": format_output(astar_output, coordinator_output, "AStarAgent"),
        # }

        # return results
        return {
            "bfs": {
                "messages": [
                    "Can I go to (1, 0) ?",
                    "Can I go to (0, 1) ?",
                    "Can I go to (2, 0) ?",
                ],
                "path": [
                    [0, 0],
                    [1, 0],
                    [2, 0],
                ],
                "answers": [
                    "True",
                    "True",
                    "True",
                ],
            },
            "dfs": {
                "messages": [
                    "Can I go to (1, 0) ?",
                    "Can I go to (2, 0) ?",
                    "Can I go to (3, 0) ?",
                ],
                "path": [
                    [0, 0],
                    [1, 0],
                    [2, 0],
                ],
                "answers": [
                    "True",
                    "True",
                    "True",
                ],
            },
            "astar": {
                "messages": [
                    "Can I go to (1, 0) ?",
                    "Can I go to (0, 1) ?",
                    "Can I go to (2, 0) ?",
                ],
                "path": [
                    [0, 0],
                    [1, 0],
                    [2, 0],
                ],
                "answers": [
                    "True",
                    "True",
                    "True",
                ],
            },
            "coordinator": {
                "output": "Messages;Start !;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Don't go;Go;Go;Go;Go;Go;Go;Don't go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Don't go;Go;Go;Don't go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Don't go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Don't go;Go;Go;Go;Don't go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Don't go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Don't go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Don't go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Don't go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Don't go;Don't go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;Go;"
            },
        }

    except Exception as e:
        return {"error": str(e)}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
