#pragma strict


import UnityEngine.UI;


var MAX_ENEMY_SPAWN : int = 20;

var enemy: Transform;
var enemy2: Transform;
var enemyTargetPosition: Transform;
var enemies = new Array();

var Points : int = 0;

private var enemyTargetPositions = new Array();

private var pointsText : Text;

function Start () {
	// Health Text Komponente holen
	pointsText = GameObject.Find("PointsText").GetComponent.<Text>();
	// Enemy Target Postionen erzeugen
	for (var i : int = 0; i < MAX_ENEMY_SPAWN; i++) {
		// Objekt klonen
		spawn();
	}
}

function Update() {
	pointsText.text = "Points: " + Points;

	if (enemies.length < MAX_ENEMY_SPAWN) {
		spawn();
	}
}

function IncreasePoints() {
	Points++;
}

function Remove (item : Transform) {
	for (var i : int = 0; i < enemies.length; i++) {
		if (enemies[i] == item) {
			enemies.RemoveAt(i);
		}
	}
}

/*
	Spanws a single asteroid. Chooses one of two Prefabs to instantiate. 
*/
private function spawn() {
	var i = Random.Range(1,30);

	// Enemy erzeugen
	var position : Vector3 = Vector3(enemyTargetPosition.position.x, enemyTargetPosition.position.y + (i * 4), enemyTargetPosition.position.z + (i * 6));
	var enemyClone : Transform 
			= Instantiate(Random.value < 0.8 ? enemy : enemy2, 
						  position, 
						  enemy.rotation);
		// EnemyCollision Script aus Objekt holen und Health Text Komponente setzen
		var enemyCloneCollision : EnemyCollision = enemyClone.gameObject.GetComponent.<EnemyCollision>();
		enemyCloneCollision.SetHealthText(pointsText);
		// MoveEnemy Script aus Objekt holen und Target Position Komponente setzen
		var enemyCloneMove : MoveEnemy = enemyClone.gameObject.GetComponent.<MoveEnemy>();
		enemyCloneMove.speed = Random.Range(10, 20);
		// Objekt zum Array hinzufügen
		enemies.Push(enemyClone);
}

