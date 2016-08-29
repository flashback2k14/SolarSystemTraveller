#pragma strict

var MAIN_SCENE = "system-reduce-distance";
var RANGE_SCENE = "ShootingRange54";

function Update () {
	if (Input.GetKey(KeyCode.Alpha9)) {
		SceneManager.LoadScene(RANGE_SCENE);
	} else if (Input.GetMouseButtonDown(2)) {
		SceneManager.LoadScene(MAIN_SCENE);
	} 
}