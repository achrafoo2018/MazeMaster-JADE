import hamma from "./assets/hamma.jpg";
import chroufa from "./assets/chroufa.jpg";
import slouma from "./assets/slouma.jpg";

// The matrix contains 0 and ones as chars convert them to number
const castMatrix = (matrix) => {
    return matrix.map((row) => {
        return row.map((cell) => {
            return parseInt(cell);
        });
    });
}

const formatAgentsData = (data) => {
    return {
        bfs: {
          path: [...data.bfs.path], // el path bta3 el bfs fel response bte3ek
          image: hamma,
          color: "blue",
          msgs: [...data.bfs.messages], // el mesgs bta3 el bfs fel response bte3ek
          res: [...data.bfs.answers], // el messages bta3 el agent master coodinater lel aget bfs
        },
        dfs: {
          path: [...data.dfs.path], // same
          image: chroufa,
          color: "green",
          msgs: [...data.dfs.messages], // same,
          res: [...data.dfs.answers], // same
        },
        astar: {
          path: [...data.astar.path], // same
          image: slouma,
          color: "red",
          msgs: [...data.astar.messages], // same,
          res: [...data.astar.answers], // same
        },
      }
}

export { castMatrix, formatAgentsData}