#pragma strict

// Variablen für Bewegungen
var vorwX : float;
var seitY : float;
var hochZ : float;
// Variablen für Rotationen
var roll	:	float;
var pitch :	float;
var yaw 	:	float;
// Konstante für Geschwindigkeit
var SPEED : float = 50.0;

// Hilfsvariablen
var isEngineStarted						: boolean = false;
var isMessageShownforMoveASDW : boolean = false;
var isMessageShownforMoveQE		: boolean	= false;
var isMessageShownforRotateUO	:	boolean = false;
var isMessageShownforRotateIK	:	boolean	= false;
var isMessageShownforRotateJL	: boolean = false;

// Partikelsystem
var psEngineFlames :	ParticleSystem;

/**
 * Änderung der Control Panel anzeigen, anhand des Engine states
 */
private function ChangeControlPanelState () {
	var controlPanel : HandleControlPanelStates 
													= GameObject.Find("SpaceshipControlPanel")
																			.GetComponent.<HandleControlPanelStates>();
	controlPanel.toggle(isEngineStarted);
}


/**
 * Starten des Partikelsystem, wenn gestoppt oder pausiert
 */
public function StartEngine () {
	if (psEngineFlames.isPaused || psEngineFlames.isStopped) {
		// setzen der Hilfsvariable
		isEngineStarted = true;
		// Änderung Control Panel Status
		ChangeControlPanelState();
		// Abspielen des Partikelsystems
		psEngineFlames.Play();
	}
}

/**
 * Stoppen des Partikelsystem, wenn gestartet
 */
public function StopEngine () {
	if (psEngineFlames.isPlaying) {
		// Zurücksetzen der Hilfsvariablen
		isEngineStarted = false;
		// Änderung Control Panel Status
		ChangeControlPanelState();
		psEngineFlames.Stop();
		isMessageShownforMoveASDW = false;
		isMessageShownforMoveQE 	= false;
		isMessageShownforRotateUO = false;
		isMessageShownforRotateIK = false;
		isMessageShownforRotateJL = false;
	}
}

/**
 * Abgreifen der Keyboard Eingaben und Variablen zuweisen
 */
private function GetKeyboardInputs () {
	// Get Keyboard Inputs for Moving
	vorwX = Input.GetAxis("Vertical")		*	SPEED;
	seitY = Input.GetAxis("Horizontal")	*	SPEED;
	hochZ = Input.GetAxis("Zaxis")			*	SPEED;
	// Get Keyboard Inputs for Rotation
	roll	= Input.GetAxis("Roll")		*	SPEED;
	pitch = Input.GetAxis("Pitch")	*	SPEED;
	yaw 	= Input.GetAxis("Yaw")		*	SPEED;
	
	// Multiply DeltaTime to Directions
	// Make it move 10 meters per second instead of 10 meters per frame
	vorwX 	*=	Time.deltaTime;
	seitY 	*=	Time.deltaTime;
	hochZ 	*=	Time.deltaTime;
	roll		*=	Time.deltaTime;
	pitch		*=	Time.deltaTime;
	yaw 		*=	Time.deltaTime;

	// Get Keyboard Input to Start / Stop the Engine
	if (Input.GetKeyDown(KeyCode.P)) {
		if (isEngineStarted) { 
			StopEngine(); 
		} else {
			StartEngine();
		}
	}
}

/**
 * Bewegung nach vorn, links, rechts und zurück
 */
private function MoveForwardBackwardLeftRight() {
	if (isEngineStarted) {
		transform.Translate(Vector3(vorwX, seitY, 0.0));
	} else {
		// ToDo: Show Message on HUD
		if (!isMessageShownforMoveASDW) {
			print("Engine is not started - MoveForwardBackwardLeftRight!");
			isMessageShownforMoveASDW = true;
		}
	}
}

/**
 * Bewegung nach oben und unten
 */
private function MoveUpDown () {
	if (isEngineStarted) {
		transform.Translate(Vector3(0.0, 0.0, hochZ));
	}	else {
		// ToDo: Show Message on HUD
		if (!isMessageShownforMoveQE) {
			print("Engine is not started - MoveUpDown!");
			isMessageShownforMoveQE = true;
		}
	}
}

/**
 * Rollen nach links und rechts
 */
private function RollLeftRight () {
	if (isEngineStarted) {
		transform.Rotate(Vector3(roll, 0.0, 0.0));
	} else {
		// ToDo: Show Message on HUD
		if (!isMessageShownforRotateUO) {
			print("Engine is not started - RollLeftRight!");
			isMessageShownforRotateUO = true;
		}
	}
}

/**
 * Neigung nach hoch und unten
 */
private function PitchUpDown () {
	if (isEngineStarted) {
		transform.Rotate(Vector3(0.0, pitch, 0.0));
	} else {
		// ToDo: Show Message on HUD
		if (!isMessageShownforRotateIK) {
			print("Engine is not started - PitchUpDown!");
			isMessageShownforRotateIK = true;
		}
	}
}

/**
 * Kursabweichung nach links und rechts
 */
private function YawLeftRight () {
	if (isEngineStarted) {
		transform.Rotate(Vector3(0.0, 0.0, yaw));
	} else {
		// ToDo: Show Message on HUD
		if (!isMessageShownforRotateJL) {
			print("Engine is not started - YawLeftRight!");
			isMessageShownforRotateJL = true;
		}
	}
}

/**
 * Steuerung:
 * 
 * 	Engine:
 * 		Start / Stop:	P
 * 
 * 	Bewegungen:
 * 		Vorwärts:		W
 * 		Rückwärts:	S
 * 		Links:			A
 * 		Rechts:			D
 * 		Hoch:				Q
 * 		Runter:			E
 * 
 * 	Rotationen:
 * 		Roll Links:		U
 * 		Roll Rechts:	O
 * 		Pitch Hoch:		I
 * 		Pitch Runter:	K		
 * 		Yaw Links:		J
 * 		Yaw Rechts:		L
 */
function Update () {
	// Get Keyboard Inputs 
	// to Control the Spaceship
	GetKeyboardInputs();
	// Move the Spaceship
	MoveForwardBackwardLeftRight();
	MoveUpDown();
	// Rotate the Spaceship
	RollLeftRight();
	PitchUpDown();
	YawLeftRight();
}