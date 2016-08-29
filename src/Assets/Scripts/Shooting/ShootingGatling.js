#pragma strict


var projectile : Rigidbody;
var speed = 20;


function Update () {
	if (Input.GetButtonDown("Fire1")) {
		// Play Animation
		gameObject.GetComponent(Animation).Play("GatlingRotation");
		// 
		//projectile.rotation = Quaternion.identity;
		// Clone Projectile Object
		var instantiatedprojectile 	: Rigidbody = Instantiate(projectile);
		// Shot Projectile
		instantiatedprojectile.velocity = transform.TransformDirection(Vector3(speed, 0, 0));
	}
}