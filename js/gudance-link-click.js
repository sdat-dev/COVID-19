let ulreturntowork = document.getElementById('ualrtwguidance');
let ultelecommute = document.getElementById('ualtelguidance');
let rfreturntowork = document.getElementById('rfrtwguidance');
let rftelecommute = document.getElementById('rftelguidance');
let rfhrmessage = document.getElementById('rfhrguidance');

function clickHandler(link)
{
    let messages =  document.getElementsByClassName('message');
    for (var i = 0; i < messages.length; i++) {
        messages[i].style.display = "none";
    }

    if(link.classList.toggle("clicked"))
    {
        let currentmsg = link.getElementsByClassName('message')[0];
        currentmsg.style.display = "block";
    }
}

ulreturntowork.onclick = function() {clickHandler(this.parentElement)};
ultelecommute.onclick = function() {clickHandler(this.parentElement)};
rfreturntowork.onclick = function() {clickHandler(this.parentElement)};
rftelecommute.onclick = function() {clickHandler(this.parentElement)};
rfhrmessage.onclick = function() {clickHandler(this.parentElement)};