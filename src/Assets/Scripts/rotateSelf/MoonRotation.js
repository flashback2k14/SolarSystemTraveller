#pragma strict


var speed = 5.0;


function Start () {}


function Update () {
	var delay = Time.deltaTime * speed;
	transform.Rotate(Vector3.down, delay);
}