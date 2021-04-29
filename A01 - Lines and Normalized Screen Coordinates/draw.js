/*

The bullet head is a semi-circonference with center (0.3, 0) and
radius 0.3 and is simple to calculate using cilindric coordinates
with appropriate offset.

With 64 lines we can create a polygon with 2 * PI / 64 degree per point,
but we need only half circle so, PI / 64. (that's the frequency of sin and cos)

Finally, we have to draw a line from a point and the one before.

*/

function draw() {
	
    // Horizontal
	line(-0.5, 0.3, 0.3, 0.3);
	line(-0.5, -0.3, 0.3, -0.3);

    // Vertical left
	line(-0.5, 0.3, -0.5, -0.3);

    // Bullet head
    center = [ 0.3, 0 ];
    radius = 0.3;  
    lines_count = 64; 
	for(i = 1; i <= lines_count; i++) {
        var p0 = calculate_coords(center, radius, lines_count, i - 1);
        var p1 = calculate_coords(center, radius, lines_count, i);
        line(p0[0], p0[1], p1[0], p1[1]);
	}
}

function calculate_coords(center, radius, lines_count, i) {
    var f = Math.PI / lines_count;
    var offset = - Math.PI / 2;
    var x = center[0] + radius * Math.cos(f * i + offset);
    var y = center[1] + radius * Math.sin(f * i + offset);
    return [x, y];
}