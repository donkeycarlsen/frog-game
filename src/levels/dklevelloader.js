
loadlevelbyname = (levelname) => {
fetch(`./src/assets/levels/${levelname}.json`)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
    loadleveldata(data.layers[1].data)
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });
}

loadleveldata = (data) => {
    var rowcall = 19
    var colincow = 25
    data.forEach((bomboclat,rasclat) => {
        var rho = Math.floor(rasclat/colincow)
        var callem = rasclat % colincow
        var positiony = rho * 50 - 200
        var positionx = callem * 50 - 100
        if (bomboclat != -1){makeblock(positionx,positiony,50,50)}


    })

    spawnx = 50 ; spawny = 620 ; finishx = 5570 ; finishy = 670 ; started = false ; finished = false
    // frog
    f.x = spawnx ; f.y = spawny ; speedY = 0 ; accelY = -20 ; excessSpeedXleft = 0 ; excessSpeedXright = 0; frog.tint = 0xFFFFFF ; //var invinciblefrog.tintforlevel = 0xFFFFFF
    // camera
    cameraleft = 10000 ; cameraright = -10000 ; cameratop = 720 ; camerabot = 0 ; currentlevelbackground = levelbackgrounds[0]
    // timer
    timerdisplay.y = 0 ; timerdisplay.text = "0.000" ; timerdisplay.tint = 0x000000
    //



}