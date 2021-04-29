// these global variables are used to contain the current angles of the world
// HERE YOU WILL HAVE TO ADD ONE OR MORE GLOBAL VARIABLES TO CONTAIN THE ORIENTATION
// OF THE OBJECT

// this function returns the world matrix with the updated rotations.
// parameters rvx, rvy and rvz contains a value in the degree that how much the object rotates 
// in the given direction.

var q = new Quaternion(1, 1, 1);

function updateWorld(rvx, rvy, rvz) {
	let rads = [ utils.degToRad(rvz), utils.degToRad(rvx), utils.degToRad(rvy) ];
	let deltaQ = Quaternion.fromEuler(rads[0], rads[1], rads[2], order = "ZXY");
	q = deltaQ.mul(q);
	return q.toMatrix4();
}