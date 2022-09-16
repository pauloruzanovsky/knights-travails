class Position {
	constructor(position, previous) {
		this.position = position;
		this.previous = previous;
		this.id = JSON.stringify(position);
	}
}

function knightTravail(start, end) {
    let allMoves = [[1,2],[2,1],[-1,-2],[-2,-1],[1,-2],[-2,1],[-1,2],[2,-1]];

	// make a queue array
	let queue = [];
    let visited = [];
	let origin = new Position(start);
	let path = [];
	// populate it with the node that will be the root
	queue.push(origin);

	// search the queue until it is empty
	while (queue.length > 0) {
		// assign the top of the queue to variable currentNode
		let currentNode = queue.shift();
		visited.push(currentNode);
		// if currentNode is the node we're searching for, break
		if (currentNode.position[0] === end[0] && currentNode.position[1] === end[1]) {
			function shortestPath(root) {
				path.push(root.id);
					if(root.id === origin.id) {
						return
					} else {					
					shortestPath(root.previous)
				}
				}
			
			shortestPath(currentNode)
			return console.log(`Shortest path is ${path.length-1} movements. Path taken:`, path.reverse())

		}

		// if current position has an available position to go, queue it up.
        let availablePositions = allMoves
                                .map(position => [position[0] + currentNode.position[0], position[1] + currentNode.position[1]])
                                .filter(position => position[0] > 0 && position[1] > 0 && position[0] <= 8 && position[1] <= 8)
								.map(position => JSON.stringify(position))
								.filter(position => !visited.map(a => a.id).includes(position))
								.filter(position => !queue.map(a => a.id).includes(position))

		if (availablePositions) {
			availablePositions.forEach(position => {
				let parsedPosition = JSON.parse(position);
				let nextMove = new Position(parsedPosition, currentNode)
                queue.push(nextMove);
            })
		}
	
}
};

knightTravail([0,0],[7,8]) // Shortest path is 5 movements. Path taken: (6) ['[0,0]', '[1,2]', '[2,4]', '[3,6]', '[5,7]', '[7,8]']