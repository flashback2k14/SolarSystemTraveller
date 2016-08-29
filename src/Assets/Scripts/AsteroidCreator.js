#pragma strict

var roid1 : Component;
var roid2 : Component;

var target : Component;
var distance = 10;
var maxNumber = 300;
var stepping = 20;
var percentTail = 0.33;
var speed = 5;

private var asteroids = new Array();

function spawnAsteroids() {
    if (asteroids.length >= (maxNumber - stepping)) {
        
        for(var j = 0; j < (asteroids.length < stepping ? asteroids.length : stepping); j++) {
            Destroy((asteroids.pop() as Transform ).gameObject, Random.value * 5);
        }
        
        return;
    }

    var count = asteroids.length;
    for(var i = count; i < count + stepping; i++) {
        var positionZ = Random.Range(target.transform.position.z + 15, target.transform.position.z + distance);
		
        var position = new Vector3(target.transform.position.x, target.transform.position.y, positionZ);
        var roid = Instantiate(Random.value < percentTail ? roid2 : roid1, position, transform.rotation);
				
        var script = FindObjectOfType(EarthRotateAroundSun);
        (roid as Transform).gameObject.name = "roid_" + i;
        script.speed = Random.value * speed;

        asteroids.push(roid);
    }
}

function destroyAsteroids() {
    if (asteroids.length == 0){
        return;
    }

    for(var i = 0; i < asteroids.length; i++) {
        Destroy((asteroids[i] as Transform ).gameObject);
    }
    asteroids = new Array();
}
