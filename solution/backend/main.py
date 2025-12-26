# main.py - Enhanced FastAPI backend with DAG detection

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any
from collections import defaultdict, deque

app = FastAPI()

# Enable CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify exact origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Node(BaseModel):
    id: str
    type: str
    position: Dict[str, float]
    data: Dict[str, Any]

class Edge(BaseModel):
    id: str
    source: str
    target: str
    sourceHandle: str = None
    targetHandle: str = None

class Pipeline(BaseModel):
    nodes: List[Node]
    edges: List[Edge]

@app.get('/')
def read_root():
    return {'Ping': 'Pong', 'status': 'VectorShift Backend Running'}

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: Pipeline):
    """
    Parse pipeline and return:
    - num_nodes: Number of nodes in the pipeline
    - num_edges: Number of edges in the pipeline
    - is_dag: Whether the pipeline forms a Directed Acyclic Graph
    """
    try:
        num_nodes = len(pipeline.nodes)
        num_edges = len(pipeline.edges)
        
        # Check if the graph is a DAG
        is_dag = is_directed_acyclic_graph(pipeline.nodes, pipeline.edges)
        
        return {
            'num_nodes': num_nodes,
            'num_edges': num_edges,
            'is_dag': is_dag
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

def is_directed_acyclic_graph(nodes: List[Node], edges: List[Edge]) -> bool:
    """
    Determines if the given nodes and edges form a Directed Acyclic Graph (DAG)
    using Kahn's algorithm (topological sorting with BFS)
    
    Returns:
        bool: True if the graph is a DAG, False if it contains cycles
    """
    if not nodes:
        return True
    
    # Build adjacency list and in-degree map
    graph = defaultdict(list)
    in_degree = {node.id: 0 for node in nodes}
    
    # Populate graph structure
    for edge in edges:
        graph[edge.source].append(edge.target)
        in_degree[edge.target] += 1
    
    # Kahn's algorithm for cycle detection
    queue = deque([node_id for node_id, degree in in_degree.items() if degree == 0])
    processed_count = 0
    
    while queue:
        current = queue.popleft()
        processed_count += 1
        
        # Process all neighbors
        for neighbor in graph[current]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)
    
    # If we processed all nodes, it's a DAG
    # If some nodes remain unprocessed, there's a cycle
    return processed_count == len(nodes)

@app.get('/pipelines/validate/{pipeline_id}')
def validate_pipeline(pipeline_id: str):
    """
    Additional endpoint for future pipeline validation
    """
    return {
        'pipeline_id': pipeline_id,
        'status': 'validated',
        'message': 'Pipeline structure is valid'
    }

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host='0.0.0.0', port=8000)