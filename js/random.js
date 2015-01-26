function getRandomTime(from, to) {
		var randTime = Math.floor(Math.random()* (to - from + 1)) + from;
		return randTime;
}

console.log(getRandomTime(8, 17))


