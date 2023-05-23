const url = 'months.json';
let mylist = [];
monthtitle = document.getElementById('title');
calendarcontainer = document.getElementById('calendar');
yearchoose = document.getElementById('year');
date = new Date();
year = date.getFullYear();
monthcallknow = sessionStorage.setItem("yearset", year);
monthnow = date.getMonth();
daynow = date.getDate();
monthcallknow = sessionStorage.setItem("monthset", monthnow);
function monthload() {
    fetch(url).then(rep => rep.json())
        .then((data) => {
            mylist = data;
            monthtitle.innerHTML = mylist[monthnow].month + " " + year;
            addbut();
            dayone = document.getElementById('dayone');
            monthstart = mylist[monthnow].daystart;
            dayone.style.gridColumnStart = monthstart;
            document.getElementsByClassName('day')[daynow - 1].style.backgroundColor = 'red';
            if (document.cookie.length != 0) {
            loadcookie = JSON.parse(document.cookie);
                for (i=0; i<Object.keys(loadcookie).length; i++) {
                    document.getElementById(Object.keys(loadcookie)[i]).innerHTML = Object.values(loadcookie)[i];
                }
            }

    });

}

function monthcall(newvalue) {
    monthinfo = mylist[newvalue];
    monthname = monthinfo.month;
    monthtitle.innerHTML = monthname + " " + sessionStorage.getItem('yearset');
    calendarcontainer.innerHTML = 
    `<p class="daynames">Sunday</p>
    <p class="daynames">Monday</p>
    <p class="daynames">Tuesday</p>
    <p class="daynames">Wednesday</p>
    <p class="daynames">Thursday</p>
    <p class="daynames">Friday</p>
    <p class="daynames">Saturday</p>`
    addbut();
    newdaystart = monthinfo.daystart;
    document.getElementById('dayone').style.gridColumnStart = newdaystart;
    if (monthnow == newvalue) {
        document.getElementsByClassName('day')[daynow - 1].style.backgroundColor = 'red';
    }
    sessionStorage.setItem("monthset", newvalue)
};

function addbut() {
    for (y = 1; y < 32; y++) {
        if (y == mylist[monthnow].amountdays) {
            ynew = y + 1;
            for (h = 1; h < ynew; h++) {
                var newday = document.createElement('button');
                newday.className = "day";
                newday.innerHTML = h + " <br><div class='buttontitle' id='title" + String(h) + "'>&nbsp;</div><div class='buttondesc' id='desc" + String(h) + "'>&nbsp;</div>";
                if (h == 1) {
                    newday.id = 'dayone';
                }
                newday.setAttribute('onclick', "schedule(" + h + ")");
                calendarcontainer.appendChild(newday);
            }
        }
    }
}

function schedule(daynum) {
    daynumnew = daynum;
    daynumtitle = "title" + daynum;
    daynumdesc = "desc" + daynum;
    title = document.getElementById(daynumtitle);
    desc = document.getElementById(daynumdesc);
    inputtitle = document.getElementById('scheduleinputtitle');
    inputdesc = document.getElementById('scheduleinputdesc');
    document.getElementById('background').style.display = "block";
    document.getElementById('schedule').style.display = "block";
    if (title.innerHTML == "&nbsp;" && desc.innerHTML == "&nbsp;") {
        inputtitle.value = '';
        inputdesc.value = '';
    }
    else {
        inputtitle.value = title.innerHTML;
        inputdesc.value = desc.innerHTML;
    }
}
function schedulesubmit() {
    title.innerHTML = inputtitle.value;
    desc.innerHTML = inputdesc.value;
    thecookie = {
        [daynumtitle]: inputtitle.value,
        [daynumdesc]: inputdesc.value
        };
        newcookie = JSON.stringify(thecookie);
    if (document.cookie.length == 0) {
        document.cookie = newcookie;
    }
    else {
        cookieparse = JSON.parse(document.cookie);
        newcookie = JSON.parse(newcookie);
        finalcookie = {
            ...cookieparse,
            ...newcookie
        }
        finalcookie = JSON.stringify(finalcookie);
        document.cookie = finalcookie;
    }
    document.getElementById('background').style.display = "none";
    document.getElementById('schedule').style.display = "none";
}