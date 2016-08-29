#pragma strict


var speed = 10.0;
var rotationSpeed = 100;


function Start () {}


function Update () {
	var translation = Input.GetAxis("Vertical") * speed;
	var rotation = Input.GetAxis("Horizontal") * rotationSpeed;
	
	translation *= Time.deltaTime;
	rotation *= Time.deltaTime;

	transform.Translate(0, 0, translation);
	transform.Rotate(Vector3.up, rotation);
}