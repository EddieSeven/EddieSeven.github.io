// Charles Culpepper - Digital Resume Scripts File

// Mobile Chrome vh rendering fix (from CSS Tricks)
//START bug fix
function chromeFix(){
    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    let vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// Listen for resize event
window.addEventListener('resize', () => {
    chromeFix();
});
// END bug fix

// Ensure runJobsPicker runs after the DOM has finished loading
function openJob(evt, job) {
    if (document.readyState != 'loading') runJobsPicker(evt, job);
    // Modern browser support
    else if (document.addEventListener) document.addEventListener('DOMContentLoaded', run);
    // IE <= 8 (Support for awfulness)
    else document.attachEvent('onreadystatechange', function () {
        if (document.readyState == 'complete') runJobsPicker(evt, job);
    });
}

function runJobsPicker(evt, job) {
    var i, jobslides, buttons;

    jobslides = document.getElementsByClassName("job-tile");
    for (i = 0; i < jobslides.length; i++) {
        jobslides[i].style.display = "none";
    }

    // Get all elements with class="buttons" and remove the class "active"
    buttons = document.getElementsByClassName("jobButton");
    for (i = 0; i < buttons.length; i++) {
        buttons[i].className = buttons[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(job).style.display = "flex";
    evt.currentTarget.className += " active";
}


/* From javascriptkit.com - 4 Novel Ways to Deal with Stick Hover*/
; (function () {
    var isTouch = false //var to indicate current input type (is touch versus no touch) 
    var isTouchTimer
    var curRootClass = '' //var indicating current document root class ("can-touch" or "")

    function addtouchclass(e) {
        clearTimeout(isTouchTimer)
        isTouch = true
        if (curRootClass != 'can-touch') { //add "can-touch' class if it's not already present
            curRootClass = 'can-touch'
            document.documentElement.classList.add(curRootClass)
        }
        isTouchTimer = setTimeout(function () { isTouch = false }, 500) //maintain "istouch" state for 500ms so removetouchclass doesn't get fired immediately following a touch event
    }

    function removetouchclass(e) {
        if (!isTouch && curRootClass == 'can-touch') { //remove 'can-touch' class if not triggered by a touch event and class is present
            isTouch = false
            curRootClass = ''
            document.documentElement.classList.remove('can-touch')
        }
    }

    document.addEventListener('touchstart', addtouchclass, false) //this event only gets called when input type is touch
    document.addEventListener('mouseover', removetouchclass, false) //this event gets called when input type is everything from touch to mouse/ trackpad
})();