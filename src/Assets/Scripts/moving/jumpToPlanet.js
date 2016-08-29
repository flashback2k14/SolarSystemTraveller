#pragma strict

var MAX_FOV : int = 160;
var MIN_FOV : int = 60;
var MAX_DROPS : float = 1.0f;
var WARP_TIME : float = 1.0f;

// CONSTANTS
private var SUN = "SUN";
private var MERCURY = "MERCURY";
private var VENUS = "VENUS";
private var EARTH = "EARTH";
private var MOON = "MOON";
private var MARS = "MARS";
private var JUPITER = "JUPITER";
private var BELT = "BELT";

private var dockStations =  [BELT, EARTH, MARS];
private var upperDockStations = {BELT: "UPPER_BELT", EARTH: "UPPER_EARTH", MARS: "UPPER_MARS"};
private var lowerDockStations = {"UPPER_BELT": BELT, "UPPER_EARTH": EARTH, "UPPER_MARS": MARS };

private var warpTime = WARP_TIME;

private var currentDropIteration = MAX_DROPS;

private var following : boolean = false;

private var followTarget : String = "";

private var dropping : boolean = false;

private var warping : boolean = false;
private var unwarping : boolean = false;

function Start() {
	followTarget = EARTH;
	following = true;

}

function Update () {
	
	// snap off smooth follow
	if (Input.GetKey(KeyCode.F3)) {
	    following = false;
	}
	
	// Check for key codes
	if (Input.GetKeyDown(KeyCode.Alpha1)) {
		getFollowTarget(SUN);
	} else if (Input.GetKeyDown(KeyCode.Alpha2)) {
		getFollowTarget(MERCURY);
	} else if (Input.GetKeyDown(KeyCode.Alpha3)) {
		getFollowTarget(VENUS);
	} else if (Input.GetKeyDown(KeyCode.Alpha4)) {
	    getFollowTarget(EARTH);
	} else if (Input.GetKeyDown(KeyCode.Alpha5)) {
	    getFollowTarget(MARS);
	} else if (Input.GetKeyDown(KeyCode.Alpha6)) {
		getFollowTarget(JUPITER);
	} else if (Input.GetKeyDown(KeyCode.Alpha7)) {
	    getFollowTarget(BELT);
	} else if (Input.GetKey(KeyCode.Alpha9) && followTarget == JUPITER) {
		SceneManager.LoadScene("ShootingRange54-final");
	} else if (Input.GetMouseButtonDown(2)) {
		SceneManager.LoadScene("system-mini-final");
	}

    
	if(dropping && !warping && !unwarping) {
	    if (currentDropIteration < 0.0f) {
	        endDrop();
	    } else {
	        currentDropIteration -= Time.deltaTime;
	    }
	}
    
    if(warping) {
        if(warpTime <= 0.0f) {
            warping = false;
            unwarping = true;
            warpTime = WARP_TIME;
            jumpAndFollow(followTarget);
        } else {
            distortView(Time.deltaTime * 150);
            warpTime -= Time.deltaTime;
        }
    }
    if(unwarping) {
    	if(warpTime <= 0.0) {
            unwarping = false;
            warpTime = WARP_TIME;
            restoreView(MIN_FOV);
        } else {
            restoreView(Time.deltaTime * 200);
            warpTime -= Time.deltaTime;
        }
    }
}

function LateUpdate() {
    // pointing the camera at the target in every frame
    if (following && !warping) {
        jumpAndFollow(followTarget);
    }
}
private function endDrop() {
    followTarget = lowerDockStations[followTarget] as String;
    dropping = false;
    currentDropIteration = MAX_DROPS;
    
    var thirdPersonFollow : UnityStandardAssets.Utility.SmoothFollow = gameObject.Find("Spaceship")
    																			 .Find("SpaceshipCamera3rdPerson")
    																			 .FindObjectOfType(UnityStandardAssets.Utility.SmoothFollow);
    
    //restore defaults for SmoothFollow
    thirdPersonFollow.distance = 5;
    thirdPersonFollow.height = 2;
    switchEngine(false);
}

private function distortView(angle : int) {
    var cameraThird : Camera = gameObject.Find("Spaceship").Find("SpaceshipCamera3rdPerson").GetComponent.<Camera>();
    var cameraFirst : Camera = gameObject.Find("Spaceship").Find("SpaceshipCamera1stPerson").GetComponent.<Camera>();
   	var newAngle = cameraThird.fieldOfView + angle;
    
    cameraThird.fieldOfView = newAngle < MAX_FOV ? newAngle : MAX_FOV;
    cameraFirst.fieldOfView = newAngle < MAX_FOV ? newAngle : MAX_FOV;
}

private function restoreView(angle : int) {
	var camera : Camera = gameObject.Find("Spaceship").Find("SpaceshipCamera3rdPerson").GetComponent.<Camera>();
   	var cameraFirst : Camera = gameObject.Find("Spaceship").Find("SpaceshipCamera1stPerson").GetComponent.<Camera>();
   	
   	var newAngle = camera.fieldOfView - angle;
    camera.fieldOfView = newAngle > MIN_FOV ? newAngle : MIN_FOV;
    cameraFirst.fieldOfView = newAngle > MIN_FOV ? newAngle : MIN_FOV;
}

private function getFollowTarget(target : String) {
    switch(target) {
        case EARTH:
            followTarget = upperDockStations[EARTH] as String;
            break;
        case MARS:
            followTarget = upperDockStations[MARS] as String;
            break;
	    case BELT:
            print("following: " + followTarget);
            if (followTarget != BELT) toggleAsteroidField();
            followTarget = upperDockStations[BELT] as String;
            break;
        default:
    		followTarget = target;
        }
    // setting flags
    switchEngine(true);
    dropping = false;
    warping = true;
    gameObject.Find("Spaceship").FindObjectOfType(CameraSwitcher).switchCameras(1);
    
    if (System.Array.IndexOf(dockStations, target) != -1) {
        gameObject.Find("Spaceship").Find("SpaceshipCamera3rdPerson").FindObjectOfType(UnityStandardAssets.Utility.SmoothFollow).distance = 25;
        gameObject.Find("Spaceship").Find("SpaceshipCamera3rdPerson").FindObjectOfType(UnityStandardAssets.Utility.SmoothFollow).height = 25;
        print("set dropping to true");
        dropping = true;
    } 
}

private function toggleAsteroidField() {
    var asteroidScript : AsteroidCreator = FindObjectOfType(AsteroidCreator);
        asteroidScript.spawnAsteroids(); 
}

private function switchEngine(on : boolean) {
    var moveScript : MoveSpaceship = FindObjectOfType(MoveSpaceship);
    if(on) {
        moveScript.StartEngine();
    } else {
        moveScript.StopEngine();
    }
}

private function jumpAndFollow(target : String) {	
	following = true;
	// get the target game object
	var object = GameObject.FindGameObjectWithTag(target);

	// place camera on the target coordinates and rotate to the same direction
	transform.position = object.transform.position;
	transform.rotation = object.transform.rotation;
}
