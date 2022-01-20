function addSpeakers () {

	speakers.push(new Speaker({
		name: "Left Main",
		type: "main",
		x: -18,
		y: 3,
		width: 16,
		depth: 15,
		rotation: -17,
		SWL: 70,
		delay: 0
	}));

	speakers.push(new Speaker({
		name: "Left Wing",
		type: "main",
		x: -20,
		y: 3,
		width: 16,
		depth: 15,
		rotation: 26,
		SWL: 70,
		delay: 0
	}));
	speakers.push(new Speaker({
		name: "Right Main",
		type: "main",
		x: 18,
		y: 3,
		width: 16,
		depth: 15,
		rotation: 17,
		SWL: 70,
		delay: 0
	}));
	speakers.push(new Speaker({
		name: "Right Wing",
		type: "main",
		x: 20,
		y: 3,
		width: 16,
		depth: 15,
		rotation: -26,
		SWL: 70,
		delay: 0
	}));

	speakers.push(new Speaker({
		name: "Sub",
		type: "sub",
		x: 0,
		y: 2,
		width: 20.2,
		depth: 25.3,
		rotation: 0,
		SWL: 70,
		frequencyResponse: {"20": -30, "80": 0, "100": 0, "300": -30},  // Variable: High
		delay: 0
	}));
	speakers.push(new Speaker({
		name: "Delay Sub",
		type: "sub",
		x: 0,
		y: 5,
		width: 28,
		depth: 30,
		rotation: 0,
		SWL: 70,
		frequencyResponse: {"20": -40, "34": -10, "70": 0, "80": 0, "100": -1, "300": -40},
		delay: 2.9
	}));

}

window.addEventListener("DOMContentLoaded", function (e) {
	addSpeakers();

	window.addEventListener("resize", change);
	document.getElementById("analyse").addEventListener("click", drawSoundField);
	
	document.getElementById("highLevel").addEventListener("change", change);
	document.getElementById("lowLevel").addEventListener("change", change);	
	
	document.getElementById("buildingWidth").addEventListener("change", change);
	document.getElementById("buildingDepth").addEventListener("change", change);
	document.getElementById("stageWidth").addEventListener("change", change);
	document.getElementById("stageDepth").addEventListener("change", change);
	document.getElementById("stageOffset").addEventListener("change", change);

	document.getElementById("sound").addEventListener("mousedown", soundFieldClick);
	document.getElementById("sound").addEventListener("mouseup", soundFieldClick);
	document.getElementById("sound").addEventListener("mousemove", soundFieldClick);
	document.getElementById("frequency").addEventListener("change", change);

	document.getElementById("addSpeaker").addEventListener("click", addSpeaker);
	document.getElementById("removeSpeaker").addEventListener("click", removeSpeaker);

	document.getElementById("speakerName").addEventListener("change", change);
	document.getElementById("speakerType").addEventListener("change", change);
	document.getElementById("speakerX").addEventListener("change", change);
	document.getElementById("speakerY").addEventListener("change", change);
	document.getElementById("speakerWidth").addEventListener("change", change);
	document.getElementById("speakerDepth").addEventListener("change", change);
	document.getElementById("speakerRotation").addEventListener("change", change);
	document.getElementById("speakerDelay").addEventListener("change", change);
	document.getElementById("speakerSWL").addEventListener("change", change);

	
	initSoundField();
	fillMeter();
	change();
});

var speakers = [];
var soundField = [];
var building = {
	stage: {
		width: 20,
		depth: 20,
		depthOffset: 0
	},
	room: {
		width: 100,
		depth: 50
	}
};

function initSoundField () {
	var sound = document.getElementById("sound");
	sound.width = 1;
	sound.width = sound.clientWidth;
	sound.height = 1;
	sound.height = sound.clientHeight;
	var ctx = sound.getContext('2d');
	var ratioX = (sound.width - 20) / building.room.width;
	var ratioY = (sound.height - 20) / (building.room.depth + building.stage.depth - building.stage.depthOffset);
	sound.roomRatio = Math.min(ratioX, ratioY);
	ctx.translate(sound.width/2, Math.ceil(sound.roomRatio * (building.stage.depth - building.stage.depthOffset)) + 15);
	document.getElementById("buildingWidth").value = building.room.width;
	document.getElementById("buildingDepth").value = building.room.depth;
	document.getElementById("stageWidth").value = building.stage.width;
	document.getElementById("stageDepth").value = building.stage.depth;
	document.getElementById("stageOffset").value = building.stage.depthOffset;

}

function zeroSoundField (width, depth) {
	var field = [];
	for (var d = 0; d <= depth; d++) {
		field[d] = [];
		for (var w = 0; w <= width; w++) {
			field[d][w] = 0;
		}
	}
	return field;
}

function change (e) {
	var autoAnalyse = document.getElementById("autoAnalyse").checked;
	
	switch (this.id) {
		case "highLevel":
		case "lowLevel":
			fillMeter();
			break;
		case "buildingWidth":
			building.room.width = +this.value;
			initSoundField();
			break;
		case "buildingDepth":
			building.room.depth = +this.value;
			initSoundField();
			break;
		case "stageWidth":
			building.stage.width = +this.value;
			initSoundField();
			break;
		case "stageDepth":
			building.stage.depth = +this.value;
			initSoundField();
			break;
		case "stageOffset":
			building.stage.depthOffset = +this.value;
			initSoundField();
			break;
		case "speakerName":
			if (this.parentNode.hasOwnProperty("speaker") && this.parentNode.speaker != null)
				this.parentNode.speaker.name = this.value;
			else
				this.value = "";
			break;
		case "speakerType":
			if (this.parentNode.hasOwnProperty("speaker") && this.parentNode.speaker != null)
				this.parentNode.speaker.type = this.value;
			else
				this.value = "";
			break;
		case "speakerX":
			if (this.parentNode.hasOwnProperty("speaker") && this.parentNode.speaker != null)
				this.parentNode.speaker.x = +this.value;
			else
				this.value = "";
			break;
		case "speakerY":
			if (this.parentNode.hasOwnProperty("speaker") && this.parentNode.speaker != null)
				this.parentNode.speaker.y = +this.value;
			else
				this.value = "";
			break;
		case "speakerWidth":
			if (this.parentNode.hasOwnProperty("speaker") && this.parentNode.speaker != null)
				this.parentNode.speaker.width = +this.value;
			else
				this.value = "";
			break;
		case "speakerDepth":
			if (this.parentNode.hasOwnProperty("speaker") && this.parentNode.speaker != null)
				this.parentNode.speaker.depth = +this.value;
			else
				this.value = "";
			break;
		case "speakerRotation":
			if (this.parentNode.hasOwnProperty("speaker") && this.parentNode.speaker != null)
				this.parentNode.speaker.rotation = +this.value;
			else
				this.value = "";
			break;
		case "speakerDelay":
			if (this.parentNode.hasOwnProperty("speaker") && this.parentNode.speaker != null)
				this.parentNode.speaker.delay = +this.value;
			else
				this.value = "";
			break;
		case "speakerSWL":
			if (this.parentNode.hasOwnProperty("speaker") && this.parentNode.speaker != null)
				this.parentNode.speaker.SWL = +this.value;
			else
				this.value = "";
			break;
		default:
			if (this === window) initSoundField();
			break;
	}
	
	if (autoAnalyse) {
		drawSpeakers(true);
		drawSoundField();
		drawRoom();
	} else {
		drawSpeakers(true);
		drawRoom();
	}
}

function addSpeaker() {
	var autoAnalyse = document.getElementById("autoAnalyse").checked;

	var speaker = new Speaker({
		name: "New Speaker",
		type: "main",
		x: 0,
		y: Math.floor(building.room.depth/2),
		width: 24,
		depth: 24,
		rotation: 0,
		SWL: 0,
		delay: 0
	});
	speakers.push(speaker);
	for (var i = 0; i < speakers.length; i++) {
		speakers[i].selected = false;
	}
	speaker.selected = true;
	document.getElementById("sound").speakerSelected = speaker;
	document.getElementById("speakerInfo").speaker = speaker;
	
	populateSpeakerInfo();
	
	if (autoAnalyse) {
		drawSpeakers(true);
		drawSoundField();
		drawRoom();
	} else {
		drawSpeakers(true);
		drawRoom();
	}
}

function removeSpeaker() {
	var autoAnalyse = document.getElementById("autoAnalyse").checked;
	
	var speaker = document.getElementById("speakerInfo").speaker;
	for (var i = 0; i < speakers.length; i++) {
		if (speakers[i].name == speaker.name && speakers[i].x == speaker.x && speakers[i].y == speaker.y)
			speakers.splice(i, 1);
	}
	
	document.getElementById("sound").speakerSelected = null;
	document.getElementById("speakerInfo").speaker = null;
	populateSpeakerInfo();
	
	if (autoAnalyse) {
		drawSpeakers(true);
		drawSoundField();
		drawRoom();
	} else {
		drawSpeakers(true);
		drawRoom();
	}
}

var drawSoundField = debounce(function () {
	var startTime = performance.now();
	var frequency = (+document.getElementById("frequency").value);
	var crossOverFrequency = (+document.getElementById("crossover").value);
	
	var sound = document.getElementById("sound");
	var ctx = sound.getContext('2d');
	var roomWidth = building.room.width;
	var roomDepth = building.room.depth+building.stage.depth-building.stage.depthOffset;
	
	var wavelength = 1128/frequency;
	window.soundField = zeroSoundField(roomWidth, roomDepth);

	for (var y = 0; y <= roomDepth; y++) {
		var roomY = y-(building.stage.depth-building.stage.depthOffset);
		for (var x = 0; x <= roomWidth; x++) {
			var roomX = x-(roomWidth/2);
			var spl = 0;
			for (var o = 0; o < 360; o++) {
				var phaseSPL = 0;
				for (var s = 0; s < speakers.length; s++) {
						var dist = Math.sqrt(Math.pow(speakers[s].x-roomX, 2) + Math.pow(speakers[s].y-roomY, 2));
						var offset = (Math.atan2(roomX-speakers[s].x, roomY-speakers[s].y)*180/Math.PI)+speakers[s].rotation;
						var phase = (dist+(1.128*speakers[s].delay))/wavelength;
						phase = o + (360 * (phase - Math.floor(phase)));
						var distSPL = ((Math.pow(10, crossOverMix(frequency,crossOverFrequency, (speakers[s].type == "sub" ? "low" : "high"))/20) * speakers[s].axisSWL(frequency, offset)) - Math.abs(10 * Math.log10(2/(4*Math.PI*Math.pow(0.3048*dist, 2)))));
						phaseSPL += Math.cos(phase*Math.PI/180) * (distSPL > 0 ? distSPL : 0);						
				}
				spl = Math.max(spl, phaseSPL);
			}
			soundField[y][x] = spl;
		}
	}
	console.log("analyseSoundField: "+(performance.now()-startTime)+" millisec");
	startTime = performance.now();
	for (var y = 0; y <= roomDepth; y++) {
		var roomY = y-(building.stage.depth-building.stage.depthOffset);
		for (var x = 0; x <= roomWidth; x++) {
			var roomX = x-(roomWidth/2);
			ctx.fillStyle = getSPLcolor(soundField[y][x]);
			ctx.fillRect(roomX*sound.roomRatio, roomY*sound.roomRatio, sound.roomRatio+1, sound.roomRatio+1);
		}
	}
	console.log("drawSoundField: "+(performance.now()-startTime)+" millisec");
	drawSpeakers();
	drawRoom();
}, 100);

function drawSpeakers (eraseAll=false) {
	var sound = document.getElementById("sound");
	var ctx = sound.getContext('2d');
	if (eraseAll) ctx.clearRect(-sound.width/2, -sound.roomRatio*(building.stage.depth-building.stage.depthOffset) - 15, sound.width, sound.height);
	
	var roomWidth = building.room.width;
	var roomDepth = building.room.depth+building.stage.depth-building.stage.depthOffset;
	
	for (var s = 0; s < speakers.length; s++) {
		if (speakers[s].hasOwnProperty("selected") && speakers[s].selected) {
			ctx.fillStyle = "darkgray";
		} else {
			ctx.fillStyle = "black";
		}
		ctx.save();
		ctx.translate(speakers[s].x*sound.roomRatio,speakers[s].y*sound.roomRatio);
		ctx.rotate(speakers[s].rotation*Math.PI/180);
		ctx.fillRect(-sound.roomRatio*speakers[s].width/24, -sound.roomRatio*speakers[s].depth/12, sound.roomRatio*speakers[s].width/12, sound.roomRatio*speakers[s].depth/12);
		ctx.restore();
	}
}

function drawRoom () {
	var sound = document.getElementById("sound");
	var ctx = sound.getContext('2d');
	
	ctx.moveTo((-sound.roomRatio*building.room.width/2) - 2.5, -2.5);
	ctx.lineWidth="5";
	ctx.rect((-sound.roomRatio*building.room.width/2) - 2.5, -2.5, 5 + (sound.roomRatio*building.room.width), 5 + (sound.roomRatio*building.room.depth));
	ctx.moveTo((-sound.roomRatio*building.stage.width/2) - 2.5, -2.5);
	ctx.rect((-sound.roomRatio*building.stage.width/2) - 2.5, (-sound.roomRatio*(building.stage.depth-building.stage.depthOffset))+2.5, 5 + (sound.roomRatio*building.stage.width), (sound.roomRatio*building.stage.depth) - 5);
	ctx.stroke();
}

function populateSpeakerInfo() {
	var speakerInfo = document.getElementById("speakerInfo");
	if (speakerInfo.speaker != null) {
		speakerInfo.classList.remove("disabled");
		document.getElementById("speakerName").value = speakerInfo.speaker.name;
		document.getElementById("speakerType").value = speakerInfo.speaker.type;
		document.getElementById("speakerX").value = speakerInfo.speaker.x;
		document.getElementById("speakerY").value = speakerInfo.speaker.y;
		document.getElementById("speakerWidth").value = speakerInfo.speaker.width;
		document.getElementById("speakerDepth").value = speakerInfo.speaker.depth;
		document.getElementById("speakerRotation").value = speakerInfo.speaker.rotation;
		document.getElementById("speakerSWL").value = speakerInfo.speaker.SWL;
		document.getElementById("speakerDelay").value = speakerInfo.speaker.delay;
		document.getElementById("removeSpeaker").disabled = false;
	} else {
		speakerInfo.classList.add("disabled");
		document.getElementById("speakerName").value = "";
		document.getElementById("speakerType").value = "";
		document.getElementById("speakerX").value = "";
		document.getElementById("speakerY").value = "";
		document.getElementById("speakerWidth").value = "";
		document.getElementById("speakerDepth").value = "";
		document.getElementById("speakerRotation").value = "";
		document.getElementById("speakerSWL").value = "";
		document.getElementById("speakerDelay").value = "";
		document.getElementById("removeSpeaker").disabled = true;
	}
}

function soundFieldClick (e) {
	var sound = document.getElementById("sound");
	var speakerInfo = document.getElementById("speakerInfo");
	
	var roomWidth = building.room.width;
	var roomDepth = building.room.depth+building.stage.depth-building.stage.depthOffset;
	var roomPosX = ((e.offsetX-(sound.width/2))/sound.roomRatio);	
	var roomPosY = ((e.offsetY-15)/sound.roomRatio)-(building.stage.depth-building.stage.depthOffset);

	if (e.type == "mousedown") {
		sound.speakerSelected = null;
		speakerInfo.speaker = null;
		console.log(roomPosX, roomPosY);
		speakers.forEach(function (speaker) {
			if (roomPosX >= speaker.x-(speaker.width/24) && roomPosX <= speaker.x+(speaker.width/24) && roomPosY >= speaker.y-(speaker.depth/12) && roomPosY <= speaker.y) {
				sound.speakerSelected = speaker;
				speaker.selected = true;
				speakerInfo.speaker = speaker;
			} else {
				speaker.selected = false;
			}
			drawSpeakers();
			drawRoom();
			populateSpeakerInfo();
		});
	} else if (e.type == "mouseup") {
/*
		if (sound.speakerSelected != null) {
			sound.speakerSelected.x = e.offsetX/roomRatio;
			sound.speakerSelected.y = e.offsetY/roomRatio;
			sound.speakerSelected.selected = false;
			sound.speakerSelected = null;
			drawSoundField();
		}
*/
//		drawSoundField();
	} else if (e.type == "mousemove") {
		if ((e.buttons === undefined ? e.which : e.buttons) == 1 && sound.speakerSelected) {
			sound.speakerSelected.x = roomPosX;
			sound.speakerSelected.y = roomPosY;
			drawSpeakers(true);
			drawRoom();
			populateSpeakerInfo();
		} else {
			var overSpeaker = false;
			var x = roomPosX; //Math.floor(roomPosX);
			var y = Math.floor(roomPosY);
			speakers.forEach(function (speaker) {
				if (roomPosX >= speaker.x-(speaker.width/24) && roomPosX <= speaker.x+(speaker.width/24) && roomPosY >= speaker.y-(speaker.depth/12) && roomPosY <= speaker.y) {
					overSpeaker = true;
				}
				if (overSpeaker) sound.style.cursor = "pointer";
				else sound.style.cursor = "";
			});
			if (window.soundField[y] != null && window.soundField[y][x] != null) {
				document.getElementById("info").innerHTML = Math.round(window.soundField[y][x])+" dB";
			}
		}
	}
}

function getSPL() {
	var high = +document.getElementById("highLevel").value;
	var low = +document.getElementById("lowLevel").value;
	return [low, high];
}

function getSPLcolor(p, alpha=1) {
	if (Math.abs(p) == Infinity) return 'rgb(200,200,200,'+alpha+')';
	var splRange = getSPL();
	var interval = (splRange[1]-splRange[0])/4;
	if (p >= 120) {
		if (p > 140) p = 140;
		return 'rgba(255, 0 , '+Math.round(12.75*(p-120))+', '+alpha+')';
	} else if (p <= 40 && p >= 0) {
		return 'rgba('+Math.round(255-(4*p))+', '+Math.round(255-(4*p))+', 255, '+alpha+')';
	}
	if (p >= splRange[1]) {
		return 'rgba(255, 0 , 0, '+alpha+')';
	} else if (p <= splRange[0]) {
		return 'rgba(0, 0 , 255, '+alpha+')';		
	} else {
		if (p >= splRange[1]-interval) {
			return 'rgba(255, '+(255-Math.round((p-(splRange[1]-interval))*(255/interval)))+', 0, '+alpha+')';
		} else if (p >= splRange[1]-(2*interval)) {
			return 'rgba('+Math.round((p-(splRange[1]-(2*interval)))*(255/interval))+', 255, 0, '+alpha+')';
		} else if (p >= splRange[0]+interval) {
			return 'rgba(0, 255, '+(255-Math.round((p-(splRange[0]+interval))*(255/interval)))+', '+alpha+')';
		} else {
			return 'rgba(0, '+Math.round((p-splRange[0])*(255/interval))+', 255, '+alpha+')';
		}
	}	
}

function Speaker (init) {
	if (init == null) init = {};
	this.name = init.name;
	this.type = init.type;
	this.x = init.x;
	this.y = init.y;
	this.width = init.width;
	this.depth = init.depth;
	this.rotation = init.rotation;
	this.polar = ( init.hasOwnProperty("polar") ? init.polar : {} );
	this.SWL = init.SWL;
	this.delay = init.delay;
}

Speaker.prototype.axisSWL = function (freq, offset) {
	if (freq > 200 && (offset < -45 || offset > 45)) return 0;
	else return this.SWL;
};

function crossOverMix (freq, crossover, type) {
	if (freq <= crossover/2) {
		var low = 0;
		var high = -100;
	} else if (freq >= 2*crossover) {
		var low = -100;
		var high = 0;
	} else {
		var high = -8 * (Math.pow(freq/crossover, -2)-0.25);
		if (type == "high") return high;
		if (high == 0) var low = -100;
		else {
			var low = 20 * Math.log10(1-Math.pow(10, high/20));
		}
	}
	
	if (type == "low") return low;
	else if (type == "high") return high;
	else return {"low": low, "high": high};
}

function fillMeter () {
	var db = document.getElementById("db");
	db.height = db.clientHeight;
	
	var ctx = db.getContext('2d');
	ctx.fillStyle = 'white';
	ctx.fillRect(0, 0, db.width+1, db.height+1);
	var blocks = (getSPL()[1])-(getSPL()[0]);
	var blockHeight = db.height/blocks;
	
	for (var h = 0; h < blocks; h++) {
		ctx.fillStyle = getSPLcolor(getSPL()[1]-h);
		ctx.fillRect(0, h*blockHeight, db.width, blockHeight+1);
		if (h != 0 && (getSPL()[1]-h) % 10 == 0) {
			ctx.fillStyle = "black";
			ctx.fillText((getSPL()[1]-h)+" db", 10, (h*blockHeight)+blockHeight, db.width-20);
		}
	}
}

function debounce(func, wait, immediate) {
  var timeout;

  return function executedFunction() {
    var context = this;
    var args = arguments;
	    
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    var callNow = immediate && !timeout;
	
    clearTimeout(timeout);

    timeout = setTimeout(later, wait);
	
    if (callNow) func.apply(context, args);
  };
}