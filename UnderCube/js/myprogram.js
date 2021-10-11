"use strict";
/* 
 * Copyright (c) 2012, 2016 Carson Cheng.
 * Licensed under the MIT-License (http://opensource.org/licenses/MIT)
 * which can be found in the file MIT-LICENSE.txt in the LICENSE directory
 * at the root of this project distribution.
 */
// There are a bunch of special variables and functions.
// Here are some notable ones, but there are many more:
// setup, draw, PLAYGROUND_WIDTH, PLAYGROUND_HEIGHT
setGqPlaygroundDimensions(1900, 1400);
//disableContextMenu();
//hideMouseCursor();



//the reason the top collision is buggy is because of teh bounce height. 28 and 0 yspeed. 
var bounce1 = 100000;
var bounce2 = 100000;
var bounce3 = 100000;
var bounce4 = 100000;
var level = 1;
var dead = "false";
var player = [];
var background = [];
var allTexts = [];
var deco = [];//deco means blocks in arthrangian
var decoration = [];
var ontop;
var addblockonce = 0;
var setuponce = 0;
var decayrate = 0.7;
var decorationGroupName = "decorationGroup";
var backgroundGroupName = "backgroundGroup";
var playerGroupName = "playerGroup";
var decoGroupName = "decoGroup";
var textGroupName = "textGroup";
var portaltimer = 0;
var deathsound = new Audio('sound/deathsound.mp3');
var themesong = new Audio('sound/themesong.mp3');
var teleportsound = new Audio('sound/teleport2.wav');
var housesound = new Audio('sound/StardewValleyGrandpasTheme.mp3');
var birdsounds = new Audio('sound/birdsounds.mp3');
var doorclose = new Audio('sound/doorclose.mp3');
var boingsound = new Audio('sound/boingsound.mp3');
var dooropen = new Audio('sound/dooropen.mp3');
var jumpsound = new Audio('sound/jumpsound.mp3');
var coinsound = new Audio('sound/coinsound.mp3');
var run_once = 0;
var run_twonce = 1;
var setup = function () {
    createGroupInPlayground(backgroundGroupName);
    createGroupInPlayground(decorationGroupName);
    createGroupInPlayground(playerGroupName);
    createGroupInPlayground(decoGroupName);
    createGroupInPlayground(textGroupName);
    addplayer();
    addbackground();
    adddeco();
    adddeco();
    adddecoration();
    adddecoration();
    adddecoration();
    adddecoration();
    adddecoration();
    addtext();


};
var addtext = function () {
    var spriteInfo;
    var index;
    index = allTexts.length;
    allTexts[index] = {
        "id": "text" + index,
        "width": 5000,
        "height": 200,
        "xpos": 100,
        "ypos": 100
    };
    spriteInfo = allTexts[index];
    createTextSpriteInGroup(textGroupName, spriteInfo["id"], spriteInfo["width"], spriteInfo["height"], spriteInfo["xpos"], spriteInfo["ypos"]);
};
var adddecoration = function () {
    var spriteInfo;
    var index;
    index = decoration.length;
    decoration[index] = {
        "id": "decoration" + index,
        "width": 2000,
        "height": 2000,
        "momleft": newGQAnimation("img/momleft.png"),
        "momright": newGQAnimation("img/momright.png"),
        "opendoor": newGQAnimation("img/opendoor.png"),
        "redflower": newGQAnimation("img/redflower.png"),
        "closeddoor": newGQAnimation("img/closeddoor.png"),
        "rock": newGQAnimation("img/rock.png"),
        "yellowflower": newGQAnimation("img/yellowflower.png"),
        "plank": newGQAnimation("img/plank.png"),
        "log": newGQAnimation("img/log.jpg"),
        "xpos": 0,
        "ypos": 0
    };
    spriteInfo = decoration[index];
    createSpriteInGroup(decorationGroupName, spriteInfo["id"], spriteInfo["rock"], spriteInfo["width"], spriteInfo["height"], spriteInfo["xpos"], spriteInfo["ypos"]);
};
var addplayer = function () {
    var spriteInfo;
    var index;
    index = player.length;
    player[index] = {
        "id": "player" + index,
        "width": 100,
        "height": 100,
        "leftanim": newGQAnimation("img/playerleft.png"),
        "rightanim": newGQAnimation("img/playerright.png"),
        "currentanim": "rightanim",
        "jumpheight": -40,
        "xspeed": 0,
        "yspeed": 28,
        "xpos": 0,
        "ypos": 1200,
        "xposrespawn": 0,
        "yposrespawn": 0
    };
    spriteInfo = player[index];
    createSpriteInGroup(playerGroupName, spriteInfo["id"], spriteInfo["rightanim"], spriteInfo["width"], spriteInfo["height"], spriteInfo["xpos"], spriteInfo["ypos"]);
};
var addbackground = function () {
    var spriteInfo;
    var index;
    index = background.length;
    background[index] = {
        "id": "background" + index,
        "width": 2000,
        "height": 2000,
        "anim": newGQAnimation("img/sky.png"),
        "xpos": 0,
        "ypos": 0
    };
    spriteInfo = background[index];
    createSpriteInGroup(backgroundGroupName, spriteInfo["id"], spriteInfo["anim"], spriteInfo["width"], spriteInfo["height"], spriteInfo["xpos"], spriteInfo["ypos"]);
};
var adddeco = function () {
    var spriteInfo;
    var index;
    index = deco.length;
    deco[index] = {
        "id": "deco" + index,
        "width": 700,
        "height": 100,
        "grass": newGQAnimation("img/grass.jpg"),
        "plank": newGQAnimation("img/plank.png"),
        "log": newGQAnimation("img/log.jpg"),
        "dirt": newGQAnimation("img/dirt.jpg"),
        "cobblestone": newGQAnimation("img/cobblestone.jpg"),
        "safemagmablock": newGQAnimation("img/safetopmagmablock.png"),
        "slimeblock": newGQAnimation("img/slimeblock.png"),
        "magmablock": newGQAnimation("img/magmablock.png"),
        "iceblock": newGQAnimation("img/iceblock.png"),
        "blueportal": newGQAnimation("img/blueportal.png"),
        "orangeportal": newGQAnimation("img/orangeportal.png"),
        "bounceamt": -60,
        "blocktype": "solidblock", // bounceblock, deathblock, deathontopblock, ymoveblock, portalblock
        "xspeed": 0,
        "yspeed": 0,
        "xlink": 0,
        "ylink": 0,
        "xpos": 0,
        "ypos": 0
    };
    spriteInfo = deco[index];
    createSpriteInGroup(decoGroupName, spriteInfo["id"], spriteInfo["cobblestone"], spriteInfo["width"], spriteInfo["height"], spriteInfo["xpos"], spriteInfo["ypos"]);
};

var moveplayer = function (spriteInfo) {//you have to change volume of a sound in a constantly running function!!!

    if (getKeyState(32)) { // delete this when finished making game
        spriteInfo["xpos"] = 1899;
    }

    spriteInfo["yspeed"] = spriteInfo["yspeed"] + 6;//this is gravity
    if (spriteInfo["yspeed"] > 29) {
        spriteInfo["yspeed"] = 28.9999
    }//stops gravity from going ver 29

    spriteInfo["ypos"] = spriteInfo["ypos"] + spriteInfo["yspeed"];
    if (spriteInfo["ypos"] > PLAYGROUND_HEIGHT - spriteInfo["height"]) {
        spriteInfo["ypos"] = PLAYGROUND_HEIGHT - spriteInfo["height"];
    }
    if (spriteInfo["ypos"] < 0) {
        spriteInfo["ypos"] = 0;
    }
    spriteSetY(spriteInfo["id"], spriteInfo["ypos"]);


    spriteInfo["xpos"] = spriteInfo["xpos"] + spriteInfo["xspeed"]
    if (spriteInfo["xpos"] > PLAYGROUND_WIDTH) {
        spriteInfo["xspeed"] = 0;
        spriteInfo["xpos"] = 0 - spriteInfo["width"] + 1;
        spriteInfo["ypos"] = spriteInfo["yposrespawn"];
        coinsound.play();
        level = level + 1;

    }
    if (spriteInfo["xpos"] < 0 - spriteInfo["width"]) {
        spriteInfo["xspeed"] = 0;
        spriteInfo["xpos"] = 0 - spriteInfo["width"] + 1;
    }
    if (spriteInfo["xspeed"] > 30) {
        spriteInfo["xspeed"] = 30;
    }
    if (spriteInfo["xspeed"] < -30) {
        spriteInfo["xspeed"] = -30;
    }
    if (getKeyState(68)) {
        spriteInfo["xspeed"] = spriteInfo["xspeed"] + 2;
        spriteSetAnimation(spriteInfo["id"], spriteInfo["rightanim"])
    }
    if (getKeyState(65)) {
        spriteInfo["xspeed"] = spriteInfo["xspeed"] - 2;
        spriteSetAnimation(spriteInfo["id"], spriteInfo["leftanim"])
    }
    if (!getKeyState(68) && !getKeyState(65)) {
        spriteInfo["xspeed"] = spriteInfo["xspeed"] * decayrate;
    }
    spriteSetX(spriteInfo["id"], spriteInfo["xpos"]);
};
var collisionwithblock = function (collIndex, hitSprite) {//for moving platforms, crushing must use death blocks because the bottom collision is weird.
    var hitSpriteName = spriteId(hitSprite);
    var hitSpriteIndex = hitSpriteName.substring(4);
    var hitSpriteInfo = deco[hitSpriteIndex];
    var playerInfo = player[0];


    if ((playerInfo["yspeed"] == playerInfo["jumpheight"] || playerInfo["yspeed"] >= 0 || playerInfo["yspeed"] === bounce1 || playerInfo["yspeed"] == bounce2 || playerInfo["yspeed"] == bounce3 || playerInfo["yspeed"] == bounce4) && playerInfo["ypos"] + playerInfo["height"] <= hitSpriteInfo["ypos"] + 29 && hitSpriteInfo["blocktype"] == "solidblock") {//top of cube
        playerInfo["ypos"] = hitSpriteInfo["ypos"] - playerInfo["height"];
        if (getKeyState(87) && playerInfo["yspeed"] == 28.9999 && playerInfo["ypos"] == hitSpriteInfo["ypos"] - 100 && !playerInfo["ypos"] + 100 < hitSpriteInfo["ypos"]) {
            jumpsound.play();
            playerInfo["yspeed"] = playerInfo["jumpheight"];
        }
    } else if (playerInfo["ypos"] >= hitSpriteInfo["ypos"] + hitSpriteInfo["height"] - 42 && playerInfo["yspeed"] <= 0 && hitSpriteInfo["blocktype"] == "solidblock") {//bottom of cube //if you want collision with the bottom make sure its 200pixels above the player//the height MUST be 100 pixels or it wont work
        playerInfo["ypos"] = hitSpriteInfo["ypos"] + playerInfo["height"];
        playerInfo["yspeed"] = 0;
    } else if (playerInfo["xpos"] + playerInfo["width"] > hitSpriteInfo["xpos"] && playerInfo["xpos"] < hitSpriteInfo["xpos"] + (hitSpriteInfo["width"] / 2) && hitSpriteInfo["blocktype"] == "solidblock") {//leftside collision
        playerInfo["xpos"] = hitSpriteInfo["xpos"] - playerInfo["width"];
        playerInfo["xspeed"] = 0;
    } else if (playerInfo["xpos"] < hitSpriteInfo["xpos"] + hitSpriteInfo["width"] && playerInfo["xpos"] + playerInfo["width"] > hitSpriteInfo["xpos"] + (hitSpriteInfo["width"] / 2) && hitSpriteInfo["blocktype"] == "solidblock") {//rightside collision
        playerInfo["xpos"] = hitSpriteInfo["xpos"] + hitSpriteInfo["width"];
        playerInfo["xspeed"] = 0;
    }

    if (hitSpriteInfo["blocktype"] == "deathblock" && playerInfo["ypos"] + 100 > hitSpriteInfo["ypos"] + 30) {
        playerInfo["ypos"] = 1200
        playerInfo["xpos"] = 0;
        playerInfo["xspeed"] = 0;
        playerInfo["yspeed"] = 0;
        dead = "true";
        deathsound.play();
    }





    if ((playerInfo["yspeed"] == playerInfo["jumpheight"] || playerInfo["yspeed"] >= 0 || playerInfo["yspeed"] === bounce1 || playerInfo["yspeed"] == bounce2 || playerInfo["yspeed"] == bounce3 || playerInfo["yspeed"] == bounce4) && playerInfo["ypos"] + playerInfo["height"] <= hitSpriteInfo["ypos"] + 29 && hitSpriteInfo["blocktype"] == "deathontopblock") {//top of cube
        playerInfo["ypos"] = hitSpriteInfo["ypos"] - playerInfo["height"];
        playerInfo["yspeed"] = 0;
        if (getKeyState(87) && playerInfo["ypos"] == hitSpriteInfo["ypos"] - 100 && !playerInfo["ypos"] + 100 < hitSpriteInfo["ypos"]) {
            jumpsound.play();
            playerInfo["yspeed"] = playerInfo["jumpheight"];
        }
    } else if (hitSpriteInfo["blocktype"] == "deathontopblock") {
        playerInfo["ypos"] = 1200
        playerInfo["xpos"] = 0;
        playerInfo["xspeed"] = 0;
        playerInfo["yspeed"] = 0;
        dead = "true";
        deathsound.play();
    }

    if (playerInfo["ypos"] + 100 <= hitSpriteInfo["ypos"] + 42 && playerInfo["xpos"] > hitSpriteInfo["xpos"] - 100 && hitSpriteInfo["blocktype"] == "ymoveblock") {//top of cube
        playerInfo["ypos"] = hitSpriteInfo["ypos"] - playerInfo["height"];
        playerInfo["yspeed"] = 0;
        if (getKeyState(87) && playerInfo["ypos"] == hitSpriteInfo["ypos"] - 100 && !playerInfo["ypos"] + 100 < hitSpriteInfo["ypos"]) {
            jumpsound.play();
            playerInfo["yspeed"] = playerInfo["jumpheight"];
        }
    } else if (hitSpriteInfo["blocktype"] == "ymoveblock") {
        playerInfo["ypos"] = 1200
        playerInfo["xpos"] = 0;
        playerInfo["xspeed"] = 0;
        playerInfo["yspeed"] = 0;
        dead = "true";
        deathsound.play();
    }


    if (hitSpriteInfo["blocktype"] == "portalblock" && portaltimer > 10) {//portal block thingy
        playerInfo["ypos"] = hitSpriteInfo["ylink"];
        playerInfo["xpos"] = hitSpriteInfo["xlink"];
        teleportsound.play();
        portaltimer = 0;
    }
    if (hitSpriteInfo["blocktype"] == "bouncyblock" && playerInfo["ypos"] + 100 > hitSpriteInfo["ypos"]) {
        playerInfo["yspeed"] = hitSpriteInfo["bounceamt"];
        boingsound.play(100);
    }
    console.log(playerInfo["yspeed"])
    spriteSetXY(playerInfo["id"], playerInfo["xpos"], playerInfo["ypos"]);







    if ((playerInfo["yspeed"] == playerInfo["jumpheight"] || playerInfo["yspeed"] >= 0 || playerInfo["yspeed"] === bounce1 || playerInfo["yspeed"] == bounce2 || playerInfo["yspeed"] == bounce3 || playerInfo["yspeed"] == bounce4) && playerInfo["ypos"] + playerInfo["height"] <= hitSpriteInfo["ypos"] + 29 && hitSpriteInfo["blocktype"] == "iceblock") {//top of cube
        playerInfo["ypos"] = hitSpriteInfo["ypos"] - playerInfo["height"];
        if (getKeyState(87) && playerInfo["yspeed"] == 28.9999 && playerInfo["ypos"] == hitSpriteInfo["ypos"] - 100 && !playerInfo["ypos"] + 100 < hitSpriteInfo["ypos"]) {
            jumpsound.play();
            playerInfo["yspeed"] = playerInfo["jumpheight"];
        }
    } else if (playerInfo["ypos"] >= hitSpriteInfo["ypos"] + hitSpriteInfo["height"] - 42 && playerInfo["yspeed"] <= 0 && hitSpriteInfo["blocktype"] == "iceblock") {//bottom of cube //may glitch if jump speed is greater than 40
        playerInfo["ypos"] = hitSpriteInfo["ypos"] + playerInfo["height"];
        playerInfo["yspeed"] = 0;
    } else if (playerInfo["xpos"] + playerInfo["width"] > hitSpriteInfo["xpos"] && playerInfo["xpos"] < hitSpriteInfo["xpos"] + (hitSpriteInfo["width"] / 2) && hitSpriteInfo["blocktype"] == "iceblock") {//leftside collision
        playerInfo["xpos"] = hitSpriteInfo["xpos"] - playerInfo["width"];
        playerInfo["xspeed"] = 0;
    } else if (playerInfo["xpos"] < hitSpriteInfo["xpos"] + hitSpriteInfo["width"] && playerInfo["xpos"] + playerInfo["width"] > hitSpriteInfo["xpos"] + (hitSpriteInfo["width"] / 2) && hitSpriteInfo["blocktype"] == "iceblock") {//rightside collision
        playerInfo["xpos"] = hitSpriteInfo["xpos"] + hitSpriteInfo["width"];
        playerInfo["xspeed"] = 0;
    }

    if (hitSpriteInfo["blocktype"] == "iceblock") {
        decayrate = 1;
    } else {
        decayrate = 0.7;
    }
};

var timer = function () {
    portaltimer = portaltimer + 1;
};

var sound = function () {
    var lowersound = "false";
    if (level == 1) {
        housesound.play();
        themesong.volume = 0.001;
    } else if (lowersound == "false" && level > 1) {
        housesound.volume = housesound.volume * 0.97;
    }
    if (lowersound == "false" && housesound.volume < 0.01) {
        housesound.volume = 0;
        lowersound == "true";
    }
    if (level > 1) {
        themesong.play();
        birdsounds.play();
    }
    console.log(housesound.volume)
};

var blocks = function (spriteInfo) {
    if (level == 1) {
        player[0]["yposrespawn"] = 1200
        player[0]["jumpheight"] = -40;
        deco[0]["ypos"] = 1300;
        deco[0]["xpos"] = 0;
        spriteSetAnimation(deco[1]["id"], deco[1]["grass"]);
        deco[1]["width"] = 1300;
        deco[1]["xpos"] = 700;
        deco[1]["ypos"] = 1300;
        spriteSetAnimation(decoration[0]["id"], decoration[0]["plank"]);
        decoration[0]["height"] = 500;
        decoration[0]["width"] = 700;
        decoration[0]["xpos"] = 0;
        decoration[0]["ypos"] = 800;
        spriteSetAnimation(decoration[1]["id"], decoration[1]["log"]);
        decoration[1]["height"] = 100;
        decoration[1]["width"] = 700;
        decoration[1]["xpos"] = 0;
        decoration[1]["ypos"] = 700;
        spriteSetAnimation(decoration[2]["id"], decoration[2]["log"]);
        decoration[2]["height"] = 268;
        decoration[2]["width"] = 100;
        decoration[2]["xpos"] = 600;
        decoration[2]["ypos"] = 800;
        spriteSetAnimation(decoration[3]["id"], decoration[3]["closeddoor"]);
        decoration[3]["height"] = 268;
        decoration[3]["width"] = 232;
        decoration[3]["xpos"] = 643;
        decoration[3]["ypos"] = 1068;
        if (player[0]["xpos"] + 100 > decoration[3]["xpos"] - 100 && player[0]["xpos"] - 100 < decoration[3]["xpos"] + 200) {
            spriteSetAnimation(decoration[3]["id"], decoration[3]["opendoor"]);
            decoration[3]["xpos"] = 665;
            if (run_once == 0) {
                run_twonce = 0;
                dooropen.play();
                run_once = 1;
            }
        } else {
            run_once = 0;
            if (run_twonce == 0) {
                run_twonce = 1;
                doorclose.play();
            }
        }
        if (player[0]["xpos"] + 50 >= decoration[4]["xpos"] + 65) {
            spriteSetAnimation(decoration[4]["id"], decoration[4]["momright"]);
        } else {
            spriteSetAnimation(decoration[4]["id"], decoration[4]["momleft"]);
        }
        decoration[4]["height"] = 130;
        decoration[4]["width"] = 130;
        decoration[4]["xpos"] = 300;
        decoration[4]["ypos"] = 1170;
    }
    if (level == 2) {
        player[0]["jumpheight"] = -48;
        spriteSetAnimation(deco[0]["id"], deco[0]["grass"]);
        deco[0]["width"] = 2000;
        deco[0]["height"] = 100;
        deco[0]["xpos"] = 0;
        deco[0]["ypos"] = 1300;
        spriteSetAnimation(deco[1]["id"], deco[1]["cobblestone"]);
        deco[1]["width"] = 100;
        deco[1]["height"] = 100;
        deco[1]["xpos"] = 700;
        deco[1]["ypos"] = 1200;
        if (addblockonce == 0) {
            adddeco();
            addblockonce = addblockonce + 1
        }
        spriteSetAnimation(deco[2]["id"], deco[2]["cobblestone"]);
        deco[2]["width"] = 100;
        deco[2]["height"] = 100;
        deco[2]["xpos"] = 800;
        deco[2]["ypos"] = 1200;
        deco[2]["blocktype"] = "solidblock";
        decoration[0]["ypos"] = 2000;
        decoration[1]["ypos"] = 2000;
        decoration[2]["ypos"] = 2000;
        decoration[3]["ypos"] = 2000;
        spriteSetAnimation(decoration[4]["id"], decoration[4]["yellowflower"]);
        decoration[4]["height"] = 131;
        decoration[4]["width"] = 75;
        decoration[4]["xpos"] = 300;
        decoration[4]["ypos"] = 1169;
    }
    if (level == 3) {
        spriteSetAnimation(deco[1]["id"], deco[1]["cobblestone"]);
        deco[1]["width"] = 100;
        deco[1]["height"] = 100;
        deco[1]["xpos"] = 700;
        deco[1]["ypos"] = 1200;
        spriteSetAnimation(deco[2]["id"], deco[2]["cobblestone"]);
        deco[2]["width"] = 100;
        deco[2]["height"] = 100;
        deco[2]["xpos"] = 300;
        deco[2]["ypos"] = 1200;
        deco[2]["blocktype"] = "solidblock";
        spriteSetAnimation(decoration[4]["id"], decoration[4]["rock"]);
        decoration[4]["height"] = 80;
        decoration[4]["width"] = 116;
        decoration[4]["xpos"] = 900;
        decoration[4]["ypos"] = 1220;
    }
    if (level == 4) {
        spriteSetAnimation(deco[1]["id"], deco[1]["cobblestone"]);
        deco[1]["width"] = 100;
        deco[1]["height"] = 200;
        deco[1]["xpos"] = 700;
        deco[1]["ypos"] = 1100;
        spriteSetAnimation(deco[2]["id"], deco[2]["cobblestone"]);
        deco[2]["width"] = 100;
        deco[2]["height"] = 100;
        deco[2]["xpos"] = 300;
        deco[2]["ypos"] = 1200;
        deco[2]["blocktype"] = "solidblock";
        spriteSetAnimation(decoration[4]["id"], decoration[4]["rock"]);
        decoration[4]["height"] = 80;
        decoration[4]["width"] = 116;
        decoration[4]["xpos"] = 900;
        decoration[4]["ypos"] = 1220;
    }
    if (level == 5) {
        if (addblockonce == 0) {
            adddeco();
            addblockonce = addblockonce + 1
        }
        if (addblockonce == 1) {
            adddeco();
            addblockonce = addblockonce + 1
        }
        if (addblockonce == 2) {
            adddeco();
            addblockonce = addblockonce + 1
        }
        spriteSetAnimation(deco[3]["id"], deco[3]["cobblestone"]);
        deco[3]["width"] = 100;
        deco[3]["height"] = 100;
        deco[3]["xpos"] = 800;
        deco[3]["ypos"] = 1200;
        deco[3]["blocktype"] = "solidblock";
        spriteSetAnimation(deco[4]["id"], deco[3]["cobblestone"]);
        deco[4]["width"] = 100;
        deco[4]["height"] = 300;
        deco[4]["xpos"] = 1200;
        deco[4]["ypos"] = 1000;
        deco[4]["blocktype"] = "solidblock";
    }
    if (level == 6) {
        spriteSetAnimation(deco[1]["id"], deco[3]["magmablock"]);
        deco[1]["width"] = 100;
        deco[1]["height"] = 100;
        deco[1]["xpos"] = 400;
        deco[1]["ypos"] = 1200;
        deco[1]["blocktype"] = "deathblock";
        deco[4]["ypos"] = 2000;
        deco[2]["ypos"] = 2000;
        deco[3]["ypos"] = 2000;
    }
    if (level == 7) {
        spriteSetAnimation(deco[2]["id"], deco[3]["magmablock"]);
        deco[2]["width"] = 100;
        deco[2]["height"] = 100;
        deco[2]["xpos"] = 700;
        deco[2]["ypos"] = 1200;
        deco[2]["blocktype"] = "deathblock";
    }
    if (level == 8) {
        spriteSetAnimation(deco[3]["id"], deco[3]["magmablock"]);
        deco[3]["width"] = 100;
        deco[3]["height"] = 100;
        deco[3]["xpos"] = 1000;
        deco[3]["ypos"] = 1200;
        deco[3]["blocktype"] = "deathblock";
        spriteSetAnimation(decoration[4]["id"], decoration[4]["rock"]);
        decoration[4]["height"] = 80;
        decoration[4]["width"] = 116;
        decoration[4]["xpos"] = 1100;
        decoration[4]["ypos"] = 1220;
    }
    if (level == 9) {
        spriteSetAnimation(deco[1]["id"], deco[3]["magmablock"]);
        deco[1]["width"] = 200;
        deco[1]["height"] = 100;
        deco[1]["xpos"] = 1000;
        deco[1]["ypos"] = 1200;
        deco[1]["blocktype"] = "deathblock";
        deco[2]["ypos"] = 2000;
        deco[3]["ypos"] = 2000;
        deco[4]["ypos"] = 2000;
        spriteSetAnimation(decoration[4]["id"], decoration[4]["rock"]);
        decoration[4]["height"] = 80;
        decoration[4]["width"] = 116;
        decoration[4]["xpos"] = 600;
        decoration[4]["ypos"] = 1220;
    }
    if (level == 10) {
        spriteSetAnimation(deco[1]["id"], deco[3]["safemagmablock"]);
        deco[1]["width"] = 600;
        deco[1]["height"] = 100;
        deco[1]["xpos"] = 400;
        deco[1]["ypos"] = 1200;
        deco[1]["blocktype"] = "deathontopblock";
        spriteSetAnimation(decoration[4]["id"], decoration[4]["rock"]);
        decoration[4]["height"] = 80;
        decoration[4]["width"] = 116;
        decoration[4]["xpos"] = 1300;
        decoration[4]["ypos"] = 1220;
    }
    if (level == 11) {
        deco[2]["xpos"] = deco[2]["xpos"] + deco[2]["xspeed"];
        if (deco[2]["xpos"] > 1300) {
            deco[2]["xspeed"] = deco[2]["xspeed"] * -1;
        } else if (deco[2]["xpos"] < 400) {
            deco[2]["xspeed"] = deco[2]["xspeed"] * -1;
        }
        spriteSetAnimation(deco[1]["id"], deco[3]["magmablock"]);
        deco[1]["width"] = 1000;
        deco[1]["height"] = 100;
        deco[1]["xpos"] = 400;
        deco[1]["ypos"] = 1200;
        deco[1]["blocktype"] = "deathblock";
        spriteSetAnimation(deco[3]["id"], deco[3]["cobblestone"]);
        deco[3]["width"] = 100;
        deco[3]["height"] = 100;
        deco[3]["xpos"] = 300;
        deco[3]["ypos"] = 1200;
        deco[3]["blocktype"] = "solidblock";
        if (setuponce == 0) {
            spriteSetAnimation(deco[2]["id"], deco[3]["safemagmablock"]);
            deco[2]["width"] = 100;
            deco[2]["height"] = 100;
            deco[2]["xpos"] = 400;
            deco[2]["ypos"] = 1100;
            deco[2]["xspeed"] = 0.5;
            deco[2]["blocktype"] = "deathontopblock";
            setuponce = setuponce + 1;
        }
        spriteSetAnimation(decoration[4]["id"], decoration[4]["yellowflower"]);
        decoration[4]["height"] = 131;
        decoration[4]["width"] = 75;
        decoration[4]["xpos"] = 200;
        decoration[4]["ypos"] = 1169;
    }
    if (level == 12) {
        deco[1]["xpos"] = deco[1]["xpos"] + deco[1]["xspeed"];
        deco[2]["xpos"] = deco[2]["xpos"] + deco[2]["xspeed"];
        if (setuponce == 1) {
            spriteSetAnimation(deco[1]["id"], deco[3]["magmablock"]);
            deco[1]["width"] = 100;
            deco[1]["height"] = 100;
            deco[1]["xpos"] = 900;
            deco[1]["ypos"] = 1200;
            deco[1]["xspeed"] = -2;
            deco[1]["blocktype"] = "deathblock";
            spriteSetAnimation(deco[2]["id"], deco[3]["magmablock"]);
            deco[2]["width"] = 100;
            deco[2]["height"] = 100;
            deco[2]["xpos"] = 1000;
            deco[2]["ypos"] = 1200;
            deco[2]["xspeed"] = 2;
            deco[2]["blocktype"] = "deathblock";
            deco[3]["ypos"] = 2000;
            setuponce = setuponce - 1;
        }
        if (deco[1]["xpos"] < 200) {
            deco[1]["xspeed"] = deco[1]["xspeed"] * -1
            deco[2]["xspeed"] = deco[2]["xspeed"] * -1
        } else if (deco[1]["xpos"] > 900) {
            deco[1]["xspeed"] = deco[1]["xspeed"] * -1
            deco[2]["xspeed"] = deco[2]["xspeed"] * -1
        }
    }
    if (level == 13) {
        if (addblockonce == 3) {
            adddeco();
            addblockonce = 0;
        }
        spriteSetAnimation(deco[1]["id"], deco[3]["cobblestone"]);
        deco[1]["width"] = 100;
        deco[1]["height"] = 200;
        deco[1]["xpos"] = 300;
        deco[1]["ypos"] = 1100;
        deco[1]["blocktype"] = "solidblock";
        spriteSetAnimation(deco[2]["id"], deco[3]["cobblestone"]);
        deco[2]["width"] = 100;
        deco[2]["height"] = 100;
        deco[2]["xpos"] = 700;
        deco[2]["ypos"] = 1000;
        deco[2]["blocktype"] = "solidblock";
        spriteSetAnimation(deco[3]["id"], deco[3]["cobblestone"]);
        deco[3]["width"] = 100;
        deco[3]["height"] = 100;
        deco[3]["xpos"] = 1100;
        deco[3]["ypos"] = 900;
        deco[3]["blocktype"] = "solidblock";
        spriteSetAnimation(deco[4]["id"], deco[3]["magmablock"]);
        deco[4]["width"] = 100;
        deco[4]["height"] = 500;
        deco[4]["xpos"] = 1500;
        deco[4]["ypos"] = 800;
        deco[4]["blocktype"] = "deathblock";
        spriteSetAnimation(deco[5]["id"], deco[3]["cobblestone"]);
        deco[5]["width"] = 100;
        deco[5]["height"] = 100;
        deco[5]["xpos"] = 200;
        deco[5]["ypos"] = 1200;
        deco[5]["blocktype"] = "solidblock";
        spriteSetAnimation(decoration[4]["id"], decoration[4]["yellowflower"]);
        decoration[4]["height"] = 131;
        decoration[4]["width"] = 75;
        decoration[4]["xpos"] = 700;
        decoration[4]["ypos"] = 1169;
    }
    if (level == 14) {
        deco[1]["xpos"] = deco[1]["xpos"] + deco[1]["xspeed"];
        if (deco[1]["xpos"] > 600) {
            deco[1]["xspeed"] = deco[1]["xspeed"] * -1;
        } else if (deco[1]["xpos"] < 300) {
            deco[1]["xspeed"] = deco[1]["xspeed"] * -1;
        }
        deco[2]["xpos"] = deco[2]["xpos"] + deco[2]["xspeed"];
        if (deco[2]["xpos"] > 1000) {
            deco[2]["xspeed"] = deco[2]["xspeed"] * -1;
        } else if (deco[2]["xpos"] < 700) {
            deco[2]["xspeed"] = deco[2]["xspeed"] * -1;
        }
        deco[5]["ypos"] = deco[5]["ypos"] + deco[5]["yspeed"];
        if (deco[5]["ypos"] > 1200) {
            deco[5]["yspeed"] = deco[5]["yspeed"] * -1;
        } else if (deco[5]["ypos"] < 900) {
            deco[5]["yspeed"] = deco[5]["yspeed"] * -1;
        }

        if (setuponce == 0) {

            deco[1]["ypos"] = 2000;
            deco[2]["ypos"] = 2000;
            deco[3]["ypos"] = 2000;
            deco[4]["ypos"] = 2000;
            deco[5]["ypos"] = 2000;

            spriteSetAnimation(deco[1]["id"], deco[3]["magmablock"]);
            deco[1]["width"] = 100;
            deco[1]["height"] = 100;
            deco[1]["xpos"] = 300;
            deco[1]["ypos"] = 1200;
            deco[1]["xspeed"] = 1.3;
            deco[1]["blocktype"] = "deathblock";
            spriteSetAnimation(deco[2]["id"], deco[3]["cobblestone"]);
            deco[2]["width"] = 100;
            deco[2]["height"] = 100;
            deco[2]["xpos"] = 1000;
            deco[2]["ypos"] = 1200;
            deco[2]["xspeed"] = -1;
            deco[2]["blocktype"] = "solidblock";
            spriteSetAnimation(deco[3]["id"], deco[3]["safemagmablock"]);
            deco[3]["width"] = 100;
            deco[3]["height"] = 200;
            deco[3]["xpos"] = 1100;
            deco[3]["ypos"] = 1100;
            deco[3]["xspeed"] = 0;
            deco[3]["blocktype"] = "deathontopblock";
            spriteSetAnimation(deco[4]["id"], deco[3]["magmablock"]);
            deco[4]["width"] = 100;
            deco[4]["height"] = 400;
            deco[4]["xpos"] = 1300;
            deco[4]["ypos"] = 900;
            deco[4]["xspeed"] = 0;
            deco[4]["blocktype"] = "deathblock";
            spriteSetAnimation(deco[5]["id"], deco[3]["safemagmablock"]);
            deco[5]["width"] = 100;
            deco[5]["height"] = 100;
            deco[5]["xpos"] = 1200;
            deco[5]["ypos"] = 1000;
            deco[5]["yspeed"] = -1;
            deco[5]["blocktype"] = "ymoveblock";
            setuponce = setuponce + 1;
        }
    }
    if (level == 15) {
//pressing space skips this level because the sprite will spawn inside the block forcing past the playgroundwidth!!!!!!!
//pressing space skips this level because the sprite will spawn inside the block forcing past the playgroundwidth!!!!!!!
//pressing space skips this level because the sprite will spawn inside the block forcing past the playgroundwidth!!!!!!!
//pressing space skips this level because the sprite will spawn inside the block forcing past the playgroundwidth!!!!!!!
//pressing space skips this level because the sprite will spawn inside the block forcing past the playgroundwidth!!!!!!!
        deco[3]["xpos"] = deco[3]["xpos"] + deco[3]["xspeed"];
        deco[4]["xpos"] = deco[4]["xpos"] + deco[4]["xspeed"];
        deco[5]["xpos"] = deco[5]["xpos"] + deco[5]["xspeed"];
        if (deco[3]["xpos"] > 1800) {
            deco[3]["xspeed"] = deco[3]["xspeed"] * -1;
        } else if (deco[3]["xpos"] < 300) {
            deco[3]["xspeed"] = deco[3]["xspeed"] * -1;
        }
        if (deco[4]["xpos"] > 1800) {
            deco[4]["xspeed"] = deco[4]["xspeed"] * -1;
        } else if (deco[4]["xpos"] < 300) {
            deco[4]["xspeed"] = deco[4]["xspeed"] * -1;
        }
        if (deco[5]["xpos"] > 1200) {
            deco[5]["xspeed"] = deco[5]["xspeed"] * -1;
        } else if (deco[5]["xpos"] < 800) {
            deco[5]["xspeed"] = deco[5]["xspeed"] * -1;
        }
        if (setuponce == 1) {
            adddeco();
            adddeco();
            adddeco();
            adddeco();
            adddeco();
            adddeco();
            adddeco();
            adddeco();
            adddeco();
            adddeco();
            adddeco();
            adddeco();
            adddeco();
            adddeco();
            adddeco();
            adddeco();
            adddeco();
            adddeco();
            adddeco();
            adddeco();
            resetblocks();

            spriteSetAnimation(deco[1]["id"], deco[3]["slimeblock"]);
            deco[1]["width"] = 100;
            deco[1]["height"] = 100;
            deco[1]["xpos"] = 200;
            deco[1]["ypos"] = 1200;
            deco[1]["xspeed"] = 0;
            deco[1]["blocktype"] = "bouncyblock";
            deco[1]["bounceamt"] = -101;
            bounce1 = -101
            spriteSetAnimation(deco[2]["id"], deco[3]["grass"]);
            deco[2]["width"] = 2000;
            deco[2]["height"] = 2000;
            deco[2]["xpos"] = 300;
            deco[2]["ypos"] = 500;
            deco[2]["xspeed"] = 0;
            deco[2]["blocktype"] = "solidblock";
            spriteSetAnimation(deco[3]["id"], deco[3]["magmablock"]);
            deco[3]["width"] = 100;
            deco[3]["height"] = 100;
            deco[3]["xpos"] = 300;
            deco[3]["ypos"] = 400;
            deco[3]["xspeed"] = 0.2;
            deco[3]["blocktype"] = "deathblock";
            spriteSetAnimation(deco[4]["id"], deco[3]["magmablock"]);
            deco[4]["width"] = 100;
            deco[4]["height"] = 100;
            deco[4]["xpos"] = 1800;
            deco[4]["ypos"] = 400;
            deco[4]["xspeed"] = -0.2;
            deco[4]["blocktype"] = "deathblock";
            spriteSetAnimation(deco[5]["id"], deco[3]["magmablock"]);
            deco[5]["width"] = 100;
            deco[5]["height"] = 100;
            deco[5]["xpos"] = 800;
            deco[5]["ypos"] = 400;
            deco[5]["xspeed"] = 0.2;
            deco[5]["blocktype"] = "deathblock";
            spriteSetAnimation(deco[6]["id"], deco[3]["magmablock"]);
            deco[6]["width"] = 100;
            deco[6]["height"] = 100;
            deco[6]["xpos"] = 1300;
            deco[6]["ypos"] = 400;
            deco[6]["xspeed"] = -0.2;
            deco[6]["blocktype"] = "deathblock";
            setuponce = setuponce - 1;
        }
        deco[6]["xpos"] = deco[6]["xpos"] + deco[6]["xspeed"];
        if (deco[6]["xpos"] > 1300) {
            deco[6]["xspeed"] = deco[6]["xspeed"] * -1;
        } else if (deco[6]["xpos"] < 800) {
            deco[6]["xspeed"] = deco[6]["xspeed"] * -1;
        }
    }
    if (level == 16) {
        //spressing space does not work for this as space only changes xpos and not ypos!!!!!!!!
        //spressing space does not work for this as space only changes xpos and not ypos!!!!!!!!
        //spressing space does not work for this as space only changes xpos and not ypos!!!!!!!!
        if (getKeyState(32)) {
            player[0]["xpos"] = 2000;
        }
        //get rid of this when final game finished!!!!
        //spressing space does not work for this as space only changes xpos and not ypos!!!!!!!! //spressing space does not work for this as space only changes xpos and not ypos!!!!!!!!
        //spressing space does not work for this as space only changes xpos and not ypos!!!!!!!!

        deco[3]["yspeed"] = deco[3]["yspeed"] + 0.01
        if (deco[3]["ypos"] > 400) {
            deco[3]["yspeed"] = -3;
        }
        deco[3]["ypos"] = deco[3]["ypos"] + deco[3]["yspeed"];

        deco[4]["yspeed"] = deco[4]["yspeed"] + 0.01
        if (deco[4]["ypos"] > 400) {
            deco[4]["yspeed"] = -3;
        }
        deco[4]["ypos"] = deco[4]["ypos"] + deco[4]["yspeed"];
        deco[5]["yspeed"] = deco[5]["yspeed"] + 0.01
        if (deco[5]["ypos"] > 400) {
            deco[5]["yspeed"] = -3;
        }
        deco[5]["ypos"] = deco[5]["ypos"] + deco[5]["yspeed"];

        deco[6]["yspeed"] = deco[6]["yspeed"] + 0.01
        if (deco[6]["ypos"] > 400) {
            deco[6]["yspeed"] = -3;
        }
        deco[6]["ypos"] = deco[6]["ypos"] + deco[6]["yspeed"];

        deco[8]["xpos"] = deco[8]["xpos"] + deco[8]["xspeed"];
        if (deco[8]["xpos"] > 1800) {
            deco[8]["xspeed"] = -0.5;
        } else if (deco[8]["xpos"] < 1000) {
            deco[8]["xspeed"] = 1.5;
        }
        if (dead == "true") {//if change in spawn height just do this crap or else it becomes rlly buggy and weird
            player[0]["ypos"] = 400;
            player[0]["xpos"] = -100;
            dead = "false";
        }
        if (setuponce == 0) {
            player[0]["ypos"] = 400;
            resetblocks();
            spriteSetAnimation(deco[2]["id"], deco[3]["grass"]);
            deco[2]["width"] = 1100;
            deco[2]["height"] = 2000;
            deco[2]["xpos"] = -100;
            deco[2]["ypos"] = 500;
            deco[2]["xspeed"] = 0;
            deco[2]["blocktype"] = "solidblock";
            spriteSetAnimation(deco[3]["id"], deco[3]["magmablock"]);
            deco[3]["width"] = 100;
            deco[3]["height"] = 100;
            deco[3]["xpos"] = 300;
            deco[3]["ypos"] = 0;
            deco[3]["yspeed"] = 0;
            deco[3]["blocktype"] = "deathblock";
            spriteSetAnimation(deco[4]["id"], deco[3]["magmablock"]);
            deco[4]["width"] = 100;
            deco[4]["height"] = 100;
            deco[4]["xpos"] = 400;
            deco[4]["ypos"] = 100;
            deco[4]["yspeed"] = 0;
            deco[4]["blocktype"] = "deathblock";
            spriteSetAnimation(deco[5]["id"], deco[3]["magmablock"]);
            deco[5]["width"] = 100;
            deco[5]["height"] = 100;
            deco[5]["xpos"] = 800;
            deco[5]["ypos"] = 0;
            deco[5]["yspeed"] = 0;
            deco[5]["blocktype"] = "deathblock";
            spriteSetAnimation(deco[6]["id"], deco[3]["magmablock"]);
            deco[6]["width"] = 100;
            deco[6]["height"] = 100;
            deco[6]["xpos"] = 900;
            deco[6]["ypos"] = 100;
            deco[6]["yspeed"] = 0;
            deco[6]["blocktype"] = "deathblock";
            spriteSetAnimation(deco[7]["id"], deco[3]["magmablock"]);
            deco[7]["width"] = 100;
            deco[7]["height"] = 1200;
            deco[7]["xpos"] = 1800;
            deco[7]["ypos"] = 0;
            deco[7]["yspeed"] = 0;
            deco[7]["blocktype"] = "deathblock";
            spriteSetAnimation(deco[8]["id"], deco[3]["magmablock"]);
            deco[8]["width"] = 100;
            deco[8]["height"] = 100;
            deco[8]["xpos"] = 1000;
            deco[8]["ypos"] = 1200;
            deco[8]["xspeed"] = -1;
            deco[8]["blocktype"] = "deathblock";
            setuponce = setuponce + 1;
        }
    }
    if (level == 17) {
        if (dead == "true") {//CHANGE RESPAWN POINT FROM HERE
            player[0]["ypos"] = 1200;
            player[0]["yspeed"] = 0;
            player[0]["xspeed"] = 0;
            player[0]["xpos"] = 0;
            dead = "false";
        }
        if (setuponce == 1) {//if needed you can change the SPAWNPOINT HERE NOT THE RESPAWNPOINT
            resetblocks();
            spriteSetAnimation(deco[1]["id"], deco[3]["slimeblock"]);
            deco[1]["width"] = 100;
            deco[1]["height"] = 100;
            deco[1]["xpos"] = 300;
            deco[1]["ypos"] = 1200;
            deco[1]["bounceamt"] = -60;
            bounce1 = -60
            deco[1]["xspeed"] = 0;
            deco[1]["blocktype"] = "bouncyblock";
            spriteSetAnimation(deco[2]["id"], deco[3]["slimeblock"]);
            deco[2]["width"] = 100;
            deco[2]["height"] = 100;
            deco[2]["xpos"] = 1000;
            deco[2]["ypos"] = 1200;
            deco[2]["bounceamt"] = -99;
            bounce2 = -99
            deco[2]["xspeed"] = 0;
            deco[2]["blocktype"] = "bouncyblock";
            spriteSetAnimation(deco[3]["id"], deco[3]["cobblestone"]);
            deco[3]["width"] = 800;
            deco[3]["height"] = 100;
            deco[3]["xpos"] = -100;
            deco[3]["ypos"] = 500;
            deco[3]["bounceamt"] = 0;
            deco[3]["xspeed"] = 0;
            deco[3]["blocktype"] = "solidblock";
            spriteSetAnimation(deco[4]["id"], deco[3]["safemagmablock"]);
            deco[4]["width"] = 100;
            deco[4]["height"] = 100;
            deco[4]["xpos"] = 1000;
            deco[4]["ypos"] = 500;
            deco[4]["bounceamt"] = 0;
            deco[4]["xspeed"] = 0;
            deco[4]["blocktype"] = "deathontopblock";
            spriteSetAnimation(deco[5]["id"], deco[3]["magmablock"]);
            deco[5]["width"] = 600;
            deco[5]["height"] = 50;
            deco[5]["xpos"] = 400;
            deco[5]["ypos"] = 1250;
            deco[5]["bounceamt"] = 0;
            deco[5]["xspeed"] = 0;
            deco[5]["blocktype"] = "deathblock";
            spriteSetAnimation(deco[6]["id"], deco[3]["safemagmablock"]);
            deco[6]["width"] = 100;
            deco[6]["height"] = 900;
            deco[6]["xpos"] = 1400;
            deco[6]["ypos"] = 400;
            deco[6]["bounceamt"] = 0;
            deco[6]["xspeed"] = 0;
            deco[6]["blocktype"] = "deathontopblock";
            spriteSetAnimation(deco[7]["id"], deco[3]["magmablock"]);
            deco[7]["width"] = 300;
            deco[7]["height"] = 50;
            deco[7]["xpos"] = 1100;
            deco[7]["ypos"] = 1250;
            deco[7]["bounceamt"] = 0;
            deco[7]["xspeed"] = 0;
            deco[7]["blocktype"] = "deathblock";
            spriteSetAnimation(deco[8]["id"], deco[3]["grass"]);
            deco[8]["width"] = 200;
            deco[8]["height"] = 900;
            deco[8]["xpos"] = 1490;
            deco[8]["ypos"] = 400;
            deco[8]["bounceamt"] = 0;
            deco[8]["xspeed"] = 0;
            deco[8]["blocktype"] = "solidblock";
            spriteSetAnimation(deco[9]["id"], deco[3]["magmablock"]);
            deco[9]["width"] = 100;
            deco[9]["height"] = 1200;
            deco[9]["xpos"] = 1800;
            deco[9]["ypos"] = 0;
            deco[9]["bounceamt"] = 0;
            deco[9]["xspeed"] = 0;
            deco[9]["blocktype"] = "deathblock";
            spriteSetAnimation(deco[10]["id"], deco[10]["cobblestone"]);
            deco[10]["width"] = 100;
            deco[10]["height"] = 100;
            deco[10]["xpos"] = 1300;
            deco[10]["ypos"] = 300;
            deco[10]["bounceamt"] = 0;
            deco[10]["xspeed"] = 0.5;
            deco[10]["blocktype"] = "solidblock";
            spriteSetAnimation(deco[11]["id"], deco[3]["magmablock"]);
            deco[11]["width"] = 100;
            deco[11]["height"] = 100;
            deco[11]["xpos"] = 0;
            deco[11]["ypos"] = 400;
            deco[11]["bounceamt"] = 0;
            deco[11]["xspeed"] = -1;
            deco[11]["blocktype"] = "deathblock";
            setuponce = setuponce - 1;
        }
        deco[10]["xpos"] = deco[10]["xpos"] + deco[10]["xspeed"];
        if (deco[10]["xpos"] > 1600) {
            deco[10]["xspeed"] = -0.5;
        } else if (deco[10]["xpos"] < 1300) {
            deco[10]["xspeed"] = 0.5;
        }
        deco[11]["xpos"] = deco[11]["xpos"] + deco[11]["xspeed"];
        if (deco[11]["xpos"] > 600) {
            deco[11]["xspeed"] = -0.5;
        } else if (deco[11]["xpos"] < 0) {
            deco[11]["xspeed"] = 2;
        }
    }
    if (level == 18) {
        if (dead == "true") {//CHANGE RESPAWN POINT FROM HERE
            player[0]["ypos"] = 1200;
            player[0]["yspeed"] = 0;
            player[0]["xspeed"] = 0;
            player[0]["xpos"] = 0;
            dead = "false";
        }
        if (setuponce == 0) {//if needed you can change the SPAWNPOINT HERE NOT THE RESPAWNPOINT
            resetblocks();
            deco[0]["ypos"] = 2000; // got rid of deco0 ground as it was glitchcing the portals for some reason...
            spriteSetAnimation(deco[2]["id"], deco[3]["blueportal"]);
            deco[2]["width"] = 100;
            deco[2]["height"] = 100;
            deco[2]["xpos"] = 1500;
            deco[2]["ypos"] = 1200;
            deco[2]["xspeed"] = 0;
            deco[2]["blocktype"] = "portalblock";
            spriteSetAnimation(deco[1]["id"], deco[3]["orangeportal"]);
            deco[1]["width"] = 50;
            deco[1]["height"] = 50;
            deco[1]["xpos"] = 300;
            deco[1]["ypos"] = 600;
            deco[1]["xspeed"] = 0;
            deco[1]["blocktype"] = "portalblock";
            spriteSetAnimation(deco[3]["id"], deco[3]["iceblock"]);
            deco[3]["width"] = 1700;
            deco[3]["height"] = 100;
            deco[3]["xpos"] = 0;
            deco[3]["ypos"] = 1100;
            deco[3]["xspeed"] = 0;
            deco[3]["blocktype"] = "iceblock";
            spriteSetAnimation(deco[4]["id"], deco[3]["grass"]);
            deco[4]["width"] = 2000;
            deco[4]["height"] = 100;//use this as ground now as deco0 is weird and i dont know why...
            deco[4]["xpos"] = 0;
            deco[4]["ypos"] = 1300;
            deco[4]["xspeed"] = 0;
            deco[4]["blocktype"] = "solidblock";
            spriteSetAnimation(deco[5]["id"], deco[3]["iceblock"]);
            deco[5]["width"] = 100;
            deco[5]["height"] = 100;
            deco[5]["xpos"] = 1600;
            deco[5]["ypos"] = 1200;
            deco[5]["xspeed"] = 0;
            deco[5]["blocktype"] = "iceblock";
            spriteSetAnimation(deco[6]["id"], deco[3]["magmablock"]);
            deco[6]["width"] = 300;
            deco[6]["height"] = 1100;
            deco[6]["xpos"] = 0;
            deco[6]["ypos"] = 0;
            deco[6]["xspeed"] = 0;
            deco[6]["blocktype"] = "deathblock";
            spriteSetAnimation(deco[7]["id"], deco[3]["magmablock"]);
            deco[7]["width"] = 100;
            deco[7]["height"] = 900;
            deco[7]["xpos"] = 600;
            deco[7]["ypos"] = 200;
            deco[7]["xspeed"] = 0;
            deco[7]["blocktype"] = "deathblock";
            spriteSetAnimation(deco[8]["id"], deco[3]["iceblock"]);
            deco[8]["width"] = 100;
            deco[8]["height"] = 100;
            deco[8]["xpos"] = 300;
            deco[8]["ypos"] = 500;
            deco[8]["xspeed"] = 0;
            deco[8]["blocktype"] = "iceblock";
            spriteSetAnimation(deco[9]["id"], deco[3]["slimeblock"]);
            deco[9]["width"] = 100;
            deco[9]["height"] = 100;
            deco[9]["xpos"] = 500;
            deco[9]["ypos"] = 1000;
            deco[9]["bounceamt"] = -83;
            bounce1 = -83
            deco[9]["xspeed"] = 0;
            deco[9]["blocktype"] = "bouncyblock";
            spriteSetAnimation(deco[10]["id"], deco[3]["slimeblock"]);
            deco[10]["width"] = 100;
            deco[10]["height"] = 100;
            deco[10]["xpos"] = 500;
            deco[10]["ypos"] = 200;
            deco[10]["bounceamt"] = -40;
            bounce2 = -40
            deco[10]["blocktype"] = "bouncyblock";
            spriteSetAnimation(deco[11]["id"], deco[3]["magmablock"]);
            deco[11]["width"] = 2000;
            deco[11]["height"] = 1000;
            deco[11]["xpos"] = 850;
            deco[11]["ypos"] = 0;
            deco[11]["xspeed"] = 0.1;
            deco[11]["blocktype"] = "deathblock";
            spriteSetAnimation(deco[12]["id"], deco[3]["iceblock"]);
            deco[12]["width"] = 100;
            deco[12]["height"] = 200;
            deco[12]["xpos"] = 1800;
            deco[12]["ypos"] = 1000;
            deco[12]["xspeed"] = 0;
            deco[12]["blocktype"] = "iceblock";
            setuponce = setuponce + 1;

            //dont use deco4 as obstaclels anyomore!!!
            //dont use deco4 as obstaclels anyomore!!!
            //dont use deco4 as obstaclels anyomore!!!
            //dont use deco4 as obstaclels anyomore!!!
            //dont use deco4 as obstaclels anyomore!!!
        }
        deco[11]["xpos"] = deco[11]["xpos"] + deco[11]["xspeed"];
        if (deco[11]["xpos"] > 1000) {
            deco[11]["xspeed"] = -0.1;
        } else if (deco[11]["xpos"] < 700) {
            deco[11]["xspeed"] = 0.1;
        }

        deco[2]["xlink"] = deco[1]["xpos"];
        deco[2]["ylink"] = deco[1]["ypos"];
        deco[1]["xlink"] = deco[2]["xpos"];//the xlinks and the ylinks of the portals must be set in a if or while loop or else one of the links could be set to 2000!!!!!
        deco[1]["ylink"] = deco[2]["ypos"];
    }
    if (level == 19) {
        if (dead == "true") {//CHANGE RESPAWN POINT FROM HERE
            player[0]["ypos"] = 1200;
            player[0]["yspeed"] = 0;
            player[0]["xspeed"] = 0;
            player[0]["xpos"] = 0;
            dead = "false";
        }
        if (setuponce == 1) {//if needed you can change the SPAWNPOINT HERE NOT THE RESPAWNPOINT
            resetblocks();
            player[0]["ypos"] = 1200;
            setuponce = setuponce - 1;
        }
    }
    spriteSetXY(spriteInfo["id"], spriteInfo["xpos"], spriteInfo["ypos"]);
    spriteSetWidthHeight(spriteInfo["id"], spriteInfo["width"], spriteInfo["height"]);
    console.log(level);
    spriteSetXY(player[0]["id"], player[0]["xpos"], player[0]["ypos"]);
};
var resetblocks = function () {
    deco[1]["ypos"] = 2000;
    deco[2]["ypos"] = 2000;
    deco[3]["ypos"] = 2000;
    if (level < 18) {
        deco[4]["ypos"] = 2000;
    }
    deco[5]["ypos"] = 2000;
    deco[6]["ypos"] = 2000;
    deco[7]["ypos"] = 2000;
    deco[8]["ypos"] = 2000;
    deco[9]["ypos"] = 2000;
    deco[10]["ypos"] = 2000;
    deco[11]["ypos"] = 2000;
    deco[12]["ypos"] = 2000;
    deco[13]["ypos"] = 2000;
    deco[14]["ypos"] = 2000;
    deco[15]["ypos"] = 2000;
    deco[16]["ypos"] = 2000;
    deco[17]["ypos"] = 2000;
    deco[18]["ypos"] = 2000;
    deco[19]["ypos"] = 2000;
    deco[20]["ypos"] = 2000;
    deco[21]["ypos"] = 2000;
    deco[22]["ypos"] = 2000;
    deco[23]["ypos"] = 2000;
    deco[24]["ypos"] = 2000;
    deco[25]["ypos"] = 2000;
    deco[1]["bounceamt"] = 0;
    deco[2]["bounceamt"] = 0;
    deco[3]["bounceamt"] = 0;
    deco[4]["bounceamt"] = 0;
    deco[5]["bounceamt"] = 0;
    deco[6]["bounceamt"] = 0;
    deco[7]["bounceamt"] = 0;
    deco[8]["bounceamt"] = 0;
    deco[9]["bounceamt"] = 0;
    deco[10]["bounceamt"] = 0;
    deco[12]["bounceamt"] = 0;
    deco[13]["bounceamt"] = 0;
    deco[14]["bounceamt"] = 0;
    deco[15]["bounceamt"] = 0;
    deco[16]["bounceamt"] = 0;
    deco[17]["bounceamt"] = 0;
    deco[18]["bounceamt"] = 0;
    deco[19]["bounceamt"] = 0;
    deco[11]["bounceamt"] = 0;
    deco[20]["bounceamt"] = 0;
    deco[21]["bounceamt"] = 0;
    deco[22]["bounceamt"] = 0;
    deco[23]["bounceamt"] = 0;
    deco[24]["bounceamt"] = 0;
    deco[25]["bounceamt"] = 0;
    bounce1 = 100000;
    bounce2 = 100000;
    bounce3 = 100000;
    bounce4 = 100000;
};
var displaytextamt = 1;

var abovetext = function () {
    allTexts[0]["xpos"] = allTexts[0]["xpos"] - 5;
    spriteSetXY(allTexts[0]["id"], allTexts[0]["xpos"], allTexts[0]["ypos"]);
    sprite(allTexts[0]["id"]).css("color", "rgb(0, 0, 0)");
    sprite(allTexts[0]["id"]).css("background-color", "rgba(0, 0, 0, 0)");
    sprite(allTexts[0]["id"]).css("font-weight", "bold");
    sprite(allTexts[0]["id"]).css("font-size", "50pt");

    if (displaytextamt == 1 && level == 1) {
        allTexts[0]["xpos"] = PLAYGROUND_WIDTH;
        allTexts[0]["ypos"] = 800;
        //sprite(allTexts[0]["id"]).text("Nice day to go outside don't you think? Go and take a stroll");
        displaytextamt = displaytextamt + 1;
    }
}

var draw = function () {
    sound();
    timer();
    if (level > 1) {
        // themesong.play(200);
        if (themesong.volume < 0.9)
            themesong.volume = themesong.volume + 0.01;
    }
    abovetext(); //displays text above during conversations or warning about boss fights.
    var playerIndex = 0;
    while (playerIndex < player.length) {
        moveplayer(player[playerIndex]);
        playerIndex = playerIndex + 1;
    }
    var decoIndex = 0;
    while (decoIndex < deco.length) {
        forEachSpriteGroupCollisionDo(player0["id"], decoGroupName, collisionwithblock);
        blocks(deco[decoIndex]);
        decoIndex = decoIndex + 1;
    }
    var decorationIndex = 0;
    while (decorationIndex < decoration.length) {
        blocks(decoration[decorationIndex]);
        decorationIndex = decorationIndex + 1;
    }
};