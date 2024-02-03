function travelingSalesman(distances) {
    let cities = Array.from({ length: distances.length }, (_, i) => i);
    let unvisitedCities = cities.slice();
    let startingCity = unvisitedCities.shift();
    let result = [startingCity];
    let totalDistance = 0;
    while (unvisitedCities.length) {
      let nearestCity = findNearestCity(result[result.length - 1], unvisitedCities, distances);
      result.push(nearestCity);
      totalDistance += distances[result[result.length - 2]][nearestCity];
      unvisitedCities = unvisitedCities.filter(city => city !== nearestCity);
    }
    totalDistance += distances[result[result.length - 1]][result[0]];
    return { route: result, distance: totalDistance };
  }
  
  function findNearestCity(city, cities, distances) {
    let nearestCity = cities[0];
    let nearestDistance = distances[city][nearestCity];
    for (let i = 1; i < cities.length; i++) {
      let currentCity = cities[i];
      let currentDistance = distances[city][currentCity];
      if (currentDistance < nearestDistance) {
        nearestCity = currentCity;
        nearestDistance = currentDistance;
      }
    }
    return nearestCity;
  }
  


  let distances = [  [-1, 30, 25, 10, -1, 30, 25, 10, 3, 2], 
  [15, -1, 20, 40, 15, -1, 20, 40, 33, 12],
  [-1, 30, 25, 10, -1, 30, 25, 10, -1, 30], 
  [15, -1, 20, 40, 15, -1, 20, 40, 15, -1], 
  [10, 20, -1, 25, 10, 20, -1, 25, 10, 20], 
  [30, 10, 20, -1, 30, 10, 20, -1, 30, 10],
  [-1, 30, 25, 10, -1, 30, 25, 10, -1, 22], 
  [15, -1, 20, 40, 15, -1, 20, 40, 15, 12], 
  [10, 20, -1, 25, 10, 20, -1, 25, 10, 20],
  [30, 10, 20, -1, 30, 10, 20, -1, 30, 10]
];

let result = travelingSalesman(distances);
console.log("Route: ", result.route);
console.log("Distance: ", result.distance);
