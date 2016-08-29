#pragma strict


var SELFDESTROYAFTER : int = 1;


function WaitAndDestroy () {
	yield WaitForSeconds(SELFDESTROYAFTER);
	if (gameObject != null) {
		Destroy(gameObject);
	}
}

function Update () {
	WaitAndDestroy();
}