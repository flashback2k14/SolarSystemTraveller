#pragma strict


// Variablen für Bewegungen
private var upDown : float;
private var leftRight : float;
// Konstante für Geschwindigkeit
var SPEED : float = 50.0;

function Start() {
	GameObject.Find('SpaceshipControlPanel').GetComponent.<HandleControlPanelStates>().toggle(true);
}

/**
 * Abgreifen der Keyboard Eingaben und Variablen zuweisen
 */
function GetKeyboardInputs () {
	// Get Keyboard Inputs for Moving
	upDown = Input.GetAxis("Vertical")		*	SPEED;
	leftRight = Input.GetAxis("Horizontal")	*	SPEED;
	
	// Multiply DeltaTime to Directions
	// Make it move 10 meters per second instead of 10 meters per frame
	upDown 		*=	Time.deltaTime;
	leftRight 	*=	Time.deltaTime;
}

/**
 * Gatling noch oben / unten sehen lassen
 */
function MoveUpDown () {
	transform.Rotate(Vector3(0.0, -upDown, 0.0));
}

/**
 * Gatling noch links / rechts sehen lassen
 */
function MoveLeftRight () {
	transform.Rotate(Vector3(0.0, 0.0, leftRight));
}

function Update () {
	GetKeyboardInputs();
	MoveUpDown();
	MoveLeftRight();
}