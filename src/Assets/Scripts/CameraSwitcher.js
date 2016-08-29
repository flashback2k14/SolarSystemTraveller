#pragma strict


// Variable für Kameras
var cameras	:	GameObject[];
// Hilfsvariable für Lognachrichten
var showLog	:	boolean = false;

/**
 * Ausschalten einer Kamera
 */
function turnOffCameraAndAudio (cam	:	int) {
	var camOff = cameras[cam].GetComponent.<Camera>();
	camOff.enabled = false;
	var audioOff = cameras[cam].GetComponent.<AudioListener>();
	audioOff.enabled = false;
	if (showLog) {
		print(camOff.name + ": " + camOff.enabled + " - turnOffCameraAndAudio");
		print(audioOff.name + ": " + audioOff.enabled + " - turnOffCameraAndAudio");
	}
}

/**
 * Einschalten einer Kamera
 */
function turnOnCameraAndAudio(cam	:	int) {
	var camOn = cameras[cam].GetComponent.<Camera>();
	camOn.enabled = true;
	var audioOn = cameras[cam].GetComponent.<AudioListener>();
	audioOn.enabled = true;
	if (showLog) {
		print(camOn.name + ": " + camOn.enabled + " - turnOnCameraAndAudio");
		print(audioOn.name + ": " + audioOn.enabled + " - turnOnCameraAndAudio");
	}
}

/**
 * Wechsel der Kameras
 */
function switchCameras(selectedCamera) {

	if (showLog) {
		print("Selected Camera:" + selectedCamera + " - switchCameras");
	}

	switch(selectedCamera) {
		case 0:
			turnOffCameraAndAudio(1);
			turnOnCameraAndAudio(0);
			break;

		case 1:
			turnOffCameraAndAudio(0);
			turnOnCameraAndAudio(1);
			break;

		default:
			print("Invalid Input! - switchCameras");
	}
}

/**
 * Steuerung:
 * 	1st Person Camera: F1
 * 	3rd Person Camera: F2
 */
function Update () {
	if (Input.GetKeyDown(KeyCode.F1)) {
		switchCameras(0);
		return;	
	}  
		
	if (Input.GetKeyDown(KeyCode.F2)) {
		switchCameras(1);
		return;	
	}
}