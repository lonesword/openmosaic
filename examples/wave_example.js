var startAngle = 0;
var angleVel = 0.23;
function setup() {
	createCanvas(440, 280);
	mosaicInit();
}

function draw() {
	background(51);
	startAngle += 0.015;
	var angle = startAngle;
	for (var x = 0; x <= width*2; x += 24) {
		var y = map(sin(angle), -1, 1, 0, height * 2);
		stroke(164);
		fill(255, 50);
		strokeWeight(2);
		ellipse(x, y, 48, 48);
		angle += angleVel;
	}
}