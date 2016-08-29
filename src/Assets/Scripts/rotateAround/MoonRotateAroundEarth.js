#pragma strict


var speed = 100.0;
var target : Transform;


function Start () {}


function Update () {
	var delay = Time.deltaTime * speed;
	transform.RotateAround(target.position, Vector3.up, delay);
}