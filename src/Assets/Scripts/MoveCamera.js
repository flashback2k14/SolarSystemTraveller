#pragma strict

// Variablen für Umsehen
var mouseLeftRight 	: float;
var mouseUpDown 		: float;
// Konstante für Geschwindigkeit
var HORIZONTALSPEED	: float = 1.0;
var VERTICALSPEED		:	float = 1.0;
// Debug Variable
var showLog : boolean = false;

/**
 *
 */
function GetMouseInputs () {
	// Get Mouse Inputs for Looking
	mouseLeftRight 	= Input.GetAxis("Mouse X")	*	HORIZONTALSPEED;
	mouseUpDown 		= Input.GetAxis("Mouse Y")	*	VERTICALSPEED;
	// Center Camera if Angles get crazy!
	if (Input.GetKeyDown(KeyCode.M)) {
		if (showLog) { 
			print("Inside M");
		}
		gameObject.transform.rotation = Quaternion(0.0, 0.7, 0.0, 0.7);
	}
}

/**
 * 
 */
function LookingLeftRight () {
	if (showLog) {
		print(mouseLeftRight);
		print(gameObject.transform.rotation);
	}
	transform.Rotate(Vector3(0.0, mouseLeftRight, 0.0));
}

/**
 *
 */
function LookingUpDown () {
	if (showLog) {
		print(mouseUpDown);
		print(gameObject.transform.rotation);
	}
	transform.Rotate(Vector3(mouseUpDown, 0.0, 0.0));
}

/**
 * Steuerung:
 *	
 *	Bewegung:
 *		nach Links / Rechts sehen:	Mause Links / Rechts
 *		nach Oben / Unten sehen:	Mause Unten / Oben
 *
 *	Zuürcksetzen Kamera:	M
 */
function Update () {
	GetMouseInputs();
	LookingLeftRight();
	LookingUpDown();
}