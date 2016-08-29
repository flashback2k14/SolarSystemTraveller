#pragma strict


// Speed in units per sec.
var speed	: float = 5.0;

function Update () {
	// Move our position a step closer to the targetPosition.
	transform.Translate(Vector3.back * Time.deltaTime * speed);
}
