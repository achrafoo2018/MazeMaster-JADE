from fastapi import FastAPI
import subprocess
import os

app = FastAPI()

# Construct the absolute file path
file_path = os.path.abspath("maze.csv")

@app.post("/run-bfs-agent/")
async def run_bfs_agent():
    try:
        # Format the command to run the JADE agent
        command = [
            'java', 
            '-cp', 
            '../jade_agents/out/artifacts/Project_IAD_jar/Project_IAD.jar',
            'jade.Boot',
            '-agents',
            f'BFSAgent:agents.BFSAgent({file_path})',
            '-container'
        ]

        # Start the JADE agent with the provided file path
        process = subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.DEVNULL)
        stdout, stderr = process.communicate()

        # Check for errors
        if stderr:
            return {"error": stderr.decode()}

        # Return the output of the agent
        out = stdout.decode()
        out = out.split(";")
        if out[0] == '0': # path not found
            pass # regenerate maze and try again

        out = out[1:]
        return {"output": stdout.decode()}

    except Exception as e:
        return {"error": str(e)}

@app.post("/run-dfs-agent/")
async def run_dfs_agent():
    try:
        # Format the command to run the JADE agent
        command = [
            'java', 
            '-cp', 
            '../jade_agents/out/artifacts/Project_IAD_jar/Project_IAD.jar',
            'jade.Boot',
            '-agents',
            f'DFSAgent:agents.DFSAgent({file_path})',
            '-container'
        ]

        # Start the JADE agent with the provided file path
        process = subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.DEVNULL)
        stdout, stderr = process.communicate()

        # Check for errors
        if stderr:
            return {"error": stderr.decode()}

        # Return the output of the agent
        out = stdout.decode()
        out = out.split(";")
        if out[0] == '0': # path not found
            pass # regenerate maze and try again

        out = out[1:]
        return {"output": stdout.decode()}

    except Exception as e:
        return {"error": str(e)}

@app.post("/run-astar-agent/")
async def run_astar_agent():
    try:
        # Format the command to run the JADE agent
        command = [
            'java', 
            '-cp', 
            '../jade_agents/out/artifacts/Project_IAD_jar/Project_IAD.jar',
            'jade.Boot',
            '-agents',
            f'AStarAgent:agents.AStarAgent({file_path})',
            '-container'
        ]

        # Start the JADE agent with the provided file path
        process = subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.DEVNULL)
        stdout, stderr = process.communicate()

        # Check for errors
        if stderr:
            return {"error": stderr.decode()}

        # Return the output of the agent
        out = stdout.decode()
        out = out.split(";")
        if out[0] == '0': # path not found
            pass # regenerate maze and try again

        out = out[1:]
        return {"output": stdout.decode()}

    except Exception as e:
        return {"error": str(e)}
    
@app.post('/run-all-agents')
async def run_all_agents():
    try:
        bfs = run_bfs_agent()
        dfs = run_dfs_agent()
        astar = run_astar_agent()

        return {
            "bfs": await bfs,
            "dfs": await dfs,
            "astar": await astar,
        }
    
    except Exception as e:
        return {"error": str(e)}

    

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
