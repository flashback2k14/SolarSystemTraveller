#pragma strict

import UnityEngine.SceneManagement;

function OnCollisionEnter() {
	print("portal jump");
	SceneManager.LoadScene("Startscreen");
}
