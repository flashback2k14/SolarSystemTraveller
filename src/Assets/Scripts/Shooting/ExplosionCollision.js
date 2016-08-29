#pragma strict


function OnCollisionStay (collInfo : Collision) {
	if (collInfo.collider.tag == "PROJECTILE") {
		yield WaitForSeconds(1);
		Destroy(gameObject);
	}
}