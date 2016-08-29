#pragma strict

// Infoboard Canvas
var infoBoard 		: Canvas;
// Hilfsvariable
var isBoardShown 	: boolean;

/**
 * Beim Start der Anwendung infoBoard ausblenden
 */
function Start () {
	infoBoard.enabled = false;
	isBoardShown 			= false;
}

/**
 * Öffnen des Infoboards bei ESC Keyboard Eingabe
 */
function Update () {
	if (Input.GetKeyDown(KeyCode.Escape)) {
		if (isBoardShown) {
			infoBoard.enabled = false;
			isBoardShown 			= false;
		} else {
			infoBoard.enabled = true;
			isBoardShown 			= true;
		}
	} 
}