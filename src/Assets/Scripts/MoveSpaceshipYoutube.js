#pragma strict

/**
 * source:
 * 	https://www.youtube.com/watch?v=4Fq6Om4U6f4
 * 	ab: 4:55
 */
/**
 * 
 */
@script RequireComponent(Rigidbody)

/**
 * 
 */
var MaxEnginePower:float = 40;
var RollEffect:float = 50;
var PitchEffect:float = 50;
var YawEffect:float = 0.2;
var BankedTurnEffect:float = 0.5;
var AutoTurnPitch:float = 0.5;
var AutoRollLevel:float = 0.1;
var AutoPitchLevel:float = 0.1;
var AirBreaksEffect:float = 3;
var ThrottleChangeSpeed:float = 0.3;
var DragIncreaseFactor:float = 0.001;
/**
 * 
 */
var Throttle:float;
var AirBrakes:boolean;
var ForwardSpeed:float;
var EnginePower:float;
var cur_MaxEnginePower:float;
/**
 * 
 */
var RollAngle:float;
var PitchAngle:float;
/**
 * 
 */
var RollInput:float;
var PitchInput:float;
var YawInput:float;
var ThrottleInput:float;
/**
 * 
 */
var OriginalDrag:float;
var OriginalAngularDrag:float;
var AeroFactor:float = 1;
var Immobilized:boolean = false;
var BankedTurnAmount:float;
/**
 * 
 */
var rigidBody:Rigidbody;
var cols:WheelCollider[];

/**
 * 
 */
function Start () {
	
	rigidBody = GetComponent.<Rigidbody>();

	OriginalDrag = rigidBody.drag;
	OriginalAngularDrag = rigidBody.angularDrag;

	for (var i = 0; i < transform.childCount; i++) {
			for(var componentsInChild in transform.GetChild(i).GetComponentsInChildren.<WheelCollider>()) {
				componentsInChild.motorTorque = 0.18;
			}
	}
}

/**
 * 
 */
function ClampInput () {
	RollInput = Mathf.Clamp(RollInput, -1, 1);
	PitchInput = Mathf.Clamp(PitchInput, -1, 1);
	YawInput = Mathf.Clamp(YawInput, -1, 1);
	ThrottleInput = Mathf.Clamp(ThrottleInput, -1, 1);
}

/**
 * 
 */
function CalculateRollAndPitchAngles () {
	var flatForward:Vector3 = transform.forward;
	flatForward.y = 0;

	if (flatForward.sqrMagnitude > 0) {
		flatForward.Normalize();
		var localFlatForward = transform.InverseTransformDirection(flatForward);
		PitchAngle = Mathf.Atan2(localFlatForward.y, localFlatForward.z);

		var flatRight:Vector3 = Vector3.Cross(Vector3.up, flatForward);
		var localFlatRight:Vector3 = transform.InverseTransformDirection(flatRight);
		RollAngle = Mathf.Atan2(localFlatRight.y, localFlatRight.x);
	}
}

/**
 * 
 */
function AutoLevel () {
	BankedTurnAmount = Mathf.Sin(RollAngle);

	if (RollInput == 0.0) {
		RollInput = -RollAngle * AutoRollLevel;
	}

	if (PitchInput == 0.0) {
		PitchInput = -PitchAngle * AutoPitchLevel;
		PitchInput -= Mathf.Abs(BankedTurnAmount * BankedTurnAmount * AutoTurnPitch);
	}
}

/**
 * 
 */
function CalculateForwardSpeed () {
	var localVelocity = transform.InverseTransformDirection(rigidBody.velocity);
	ForwardSpeed = Mathf.Max(0, localVelocity.z);
}

/**
 * 
 */
function ControlThrottle () {
	if (Immobilized) {
		ThrottleInput = -0.5;
	}
	Throttle = Mathf.Clamp01(Throttle + ThrottleInput * Time.deltaTime * ThrottleChangeSpeed);
	EnginePower = Throttle * MaxEnginePower;
}

/**
 * 
 */
function CalculateDrag () {
	var extraDrag = rigidBody.velocity.magnitude * DragIncreaseFactor;
	rigidBody.drag = AirBrakes ? (OriginalDrag + extraDrag) * AirBreaksEffect : OriginalDrag + extraDrag;
	rigidBody.angularDrag = OriginalAngularDrag * ForwardSpeed / 1000 + OriginalAngularDrag;
}

/**
 * 
 */
function CalculateLinearForces () {
	var forces:Vector3 = Vector3.zero;
	forces += EnginePower * transform.forward;
	rigidBody.AddForce(forces);
}

/**
 * 
 */
function CalculateTorque () {
	var torque = Vector3.zero;
	torque += PitchInput * PitchEffect * transform.right;
	torque += YawInput * YawEffect * transform.up;
	torque += -RollInput * RollEffect * transform.forward;
	torque += BankedTurnAmount * BankedTurnEffect * transform.up;
	rigidBody.AddTorque(torque * AeroFactor);
}

/**
 * Public
 */
function Move (rollInput:float, pitchInput:float, yawInput:float, throttleInput:float, airBrakes:boolean) {
	RollInput = rollInput;
	PitchInput = pitchInput;
	YawInput = yawInput;
	ThrottleInput = throttleInput;
	AirBrakes = airBrakes;

	ClampInput();
	CalculateRollAndPitchAngles();
	AutoLevel();
	CalculateForwardSpeed();
	ControlThrottle();
	CalculateDrag();
	CalculateLinearForces();
	CalculateTorque();

	if (Throttle < 0.1) {
		var currentVelocity:Vector3 = rigidBody.velocity;
		var newVelocity:Vector3 = currentVelocity * Time.deltaTime;
		rigidBody.velocity = currentVelocity - newVelocity;
	}
}

/**
 * Public
 */
function Immobilize () {
	Immobilized = true;
}

/**
 * Public
 */
function Reset () {
	Immobilized = false;
}

/**
 * 
 */
function Update () {
	var roll:float = Input.GetAxis("Horizontal");
	var pitch:float = Input.GetAxis("Vertical");
	var yaw:float = 0.0;
	var throttle:float = Input.GetAxis("Throttle");
	var airBrakes:boolean = Input.GetButton("Fire1");

	Move(roll, pitch, yaw, throttle, airBrakes);
}