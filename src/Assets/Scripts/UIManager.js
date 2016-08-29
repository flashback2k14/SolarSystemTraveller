#pragma strict

import UnityEngine.SceneManagement;

var MainScene : String = "system-final";
/**
 * Start Game Scene on Button Click
 */
function StartGame () {
    SceneManager.LoadScene(MainScene);
}

/**
 * Close Game Scene on Button Click
 */
function CloseGame () {
    SceneManager.LoadScene("Startscreen");
}

/**
 * Close the Program
 */
function ExitGame () {
	Application.Quit();
}