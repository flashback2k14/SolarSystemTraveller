#pragma strict


var SELFDESTROYAFTER : int = 5;


function WaitAndDestroy () {
	yield WaitForSeconds(SELFDESTROYAFTER);
	if (gameObject != null) {
		Destroy(gameObject);
	}
}

function Update () {
	WaitAndDestroy();
}