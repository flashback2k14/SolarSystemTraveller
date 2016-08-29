#pragma strict


import UnityEngine.UI;


var healthText 	: Text;
var health		: int = 10;



function SetHealthText (hText : Text) {
	if (healthText == null) {
		healthText = hText;
	}
}


function OnCollisionEnter (collInfo : Collision) { 
	if (collInfo.collider.tag == "PROJECTILE") {	
		destroyEnemy(collInfo.collider.transform);
		var spawnScript : SpawnEnemies = FindObjectOfType(SpawnEnemies);
		spawnScript.IncreasePoints();
	} else if (collInfo.collider.tag == "WALL") {
		destroyEnemy(collInfo.collider.transform);
	}
}

private function destroyEnemy(enemy : Transform) {
	var spawnEnemies : SpawnEnemies = GameObject.Find("EnemySpawner").GetComponent.<SpawnEnemies>();
	spawnEnemies.Remove(gameObject.transform);

	Destroy(gameObject);
}
