function init() {
  let scores = 0;
  let isMouseDown = false;
  let prevTouchTagret = null;
  const audioIn = new Audio("audio/popin.mp3");
  // const audioIn1 = new Audio("audio/popin.mp3");
  // const audioIn2 = new Audio("audio/popin.mp3");

  const audioOut = new Audio("audio/popin.mp3");
  // const audioOut1 = new Audio("audio/popout.mp3");
  // const audioOut2 = new Audio("audio/popout.mp3");

  let scoreEl = document.querySelector("#score-value");

  function updateScore() {
    scores++;
    scoreEl.innerText = scores.toString();
  }

  function playSound(isOut) {
    if(isOut) {
      playSoundOut();
    } else {
      playSoundIn();
    }
  }

  async function playSoundOut() {
    try {
      await audioOut.play();
    } catch(err) {
      console.log("#####: УПС-out!")
    }
  }

  async function playSoundIn() {
    try {
      await audioIn.play();
    } catch(err) {
      console.log("#####: УПС-in!")
    }
  }

  function isPopLabel(target) {
    return target.classList && target.classList.contains("pop-item");
  }

  function onTouchstart() {
    isMouseDown = true;
    prevTouchTagret = null;
  };

  function onTouchend() {
    isMouseDown = false;
    prevTouchTagret = null;
  };

  function onMouseDown(e) {
    isMouseDown = true;
    if(isPopLabel(e.target)) {
      onPopClick(e);
    }
  }

  function onMouseUp(){
    isMouseDown = false;
  }

  function onPopClick(e) {
    let checkbox = e.target.querySelector("input");
    let isChecked = checkbox.checked;
    if (!isChecked) {
      e.target.classList.add("checked");
      playSound(isChecked);
    } else {
      e.target.classList.remove("checked");
      playSound(isChecked);
    }
    updateScore();
  }

  function toggleElementWithAction(target, checkbox) {
    let isChecked = checkbox.checked;
    if(!isChecked) {
      checkbox.checked = true;
      target.classList.add("checked");
      playSound(isChecked);
    } else {
      checkbox.checked = false;
      target.classList.remove("checked");
      playSound(isChecked);
    }
    updateScore();
  }

  function onToucheMove(e) {
    let myLocation = e.changedTouches[0];
    let realTarget = document.elementFromPoint(myLocation.clientX, myLocation.clientY);
    if(isMouseDown && isPopLabel(realTarget)) {
      let checkbox = realTarget.querySelector("input");
      if(checkbox) {
        if(realTarget == prevTouchTagret) {
          return;
        }
        prevTouchTagret = realTarget;
        toggleElementWithAction(realTarget, checkbox);
      }
    }
  }

  function onLabelMouseover(e) {
    const target = e.target;
    if(isMouseDown && isPopLabel(target)) {
      let checkbox = target.querySelector("input");
      if(!checkbox) {
        return;
      }
      toggleElementWithAction(target, checkbox);
    }
  }

  function resetAll() {
    let checkboxes = document.querySelectorAll("input[type=checkbox]");
    playSound(true);
    checkboxes.forEach(item => {
      item.checked = false;
      item.parentElement.classList.remove("checked");
    })
  }

  let checkboxLists = document.querySelectorAll(".popit");
  let reset = document.querySelector("#reset");
  let body = document.querySelector("body");

  reset.addEventListener("click", resetAll);

  checkboxLists.forEach((checkboxList) => {
    body.addEventListener("mousedown", onMouseDown);
    body.addEventListener("mouseup", onMouseUp);
    body.addEventListener("touchstart", onTouchstart);
    body.addEventListener("touchend", onTouchend);
    checkboxList.addEventListener("mouseover", onLabelMouseover);
    checkboxList.addEventListener("touchmove", onToucheMove);
  });

};

init();