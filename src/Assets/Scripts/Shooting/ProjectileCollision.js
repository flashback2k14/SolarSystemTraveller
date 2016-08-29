#pragma strict


var explosion : GameObject;


function OnCollisionEnter (collInfo : Collision) {
	if (collInfo.collider.tag == "ENEMY") {
		var contact  : ContactPoint = collInfo.contacts[0];
		var rotation : Quaternion		= Quaternion.FromToRotation(Vector3.up, contact.normal);
		var instantiatedExplosion : GameObject	= Instantiate(explosion, contact.point, rotation);
		Destroy(gameObject);
	} else if (collInfo.collider.tag == "WALL") {
		Destroy(gameObject);
	}
}