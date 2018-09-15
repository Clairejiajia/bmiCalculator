
var bmiData = JSON.parse(localStorage.getItem('BMIstorage')) || [];
var goBtn = document.querySelector('.btn')
var userH = document.querySelector('#userHeight').value;
var userW = document.querySelector('#userWeight').value;
var bmiRound = (userW / ((userH / 100) * (userH / 100))).toFixed(2);

var updatearea = document.querySelector('#record');

// 計算BMI>分辨是否填寫>判斷BMI狀態
// 重整按鈕及清空表單
//innerHtml寫法
function updateBMI(e) {

    var userH = document.querySelector('#userHeight').value;
    var userW = document.querySelector('#userWeight').value;
    if (userH !== "" && userW !== "") {
        var bmiRound = (userW / ((userH / 100) * (userH / 100))).toFixed(2);
        var result = document.querySelector('.result_area')

        // 先判斷欄位是否有輸入值，再判斷bmi狀態
        if (bmiRound < 18.5) {
            result.innerHTML = '<div class="result bgthin border-thin">' + bmiRound + '<p> BMI</p><a class="refresh" href="#"><img class="img bgthin" src="img/icons_loop.png"></a><div class="colorthin info"">過輕</div>';
        } else if (18.5 <= bmiRound && bmiRound < 24.5) {
            result.innerHTML = '<div class="result bghealth border-health ">' + bmiRound + '<p> BMI</p><a class="refresh" href="#"><img class="img bghealth" src="img/icons_loop.png"></a><div class="colorhealth info"">正常</div>';
        } else if (24.5 <= bmiRound && bmiRound < 27) {
            result.innerHTML = '<div class="result bgheavy border-heavy">' + bmiRound + '<p> BMI</p><a class="refresh" href="#"><img class="img bgheavy" src="img/icons_loop.png"></a><div class="colorheavy info"">過重</div>'
        }
        else if (bmiRound >= 27 && bmiRound < 29) {
            result.innerHTML = '<div class="result bgheavy-sm border-heavy-sm">' + bmiRound + '<p> BMI</p><a class="refresh" href="#"><img class="img bgheavy-sm" src="img/icons_loop.png"></a><div class="colorheavy-sm info"">輕度肥胖</div>'
        }
        else if (bmiRound >= 29 && bmiRound < 30) {
            result.innerHTML = '<div class="result bgheavy-md border-heavy-md">' + bmiRound + '<p> BMI</p><a class="refresh" href="#"><img class="img bgheavy-md" src="img/icons_loop.png"></a><div class="colorheavy-md info"">中度肥胖</div>'
        }
        else if (bmiRound >= 30) {
            result.innerHTML = '<div class="result bgheavy-lg border-heavy-lg">' + bmiRound + '<p> BMI</p><a class="refresh" href="#"><img class="img bgheavy-lg" src="img/icons_loop.png"></a><div class="colorheavy-lg info"">重度肥胖</div>'
        }
        goBtn.className = 'hide';

    } else if (userH == "" && userW == "") {
        document.getElementById('userHeight').className = "alert";
        document.getElementById('userWeight').className = "alert";
        alert('請輸入身高及體重')
    } else if (userH == "") {
        document.getElementById('userHeight').className = "alert";
        alert('請輸入身高')
    } else if (userW == "") {
        document.getElementById('userWeight').className = "alert";
        alert('請輸入體重')
    }
    var refresh = document.querySelector('.img')
    function refreshWeb(e) {
        e.preventDefault();
        goBtn.className.remove = 'hide';
        goBtn.className = 'btn';
        result.innerHTML = "";
        document.querySelector('#userHeight').value = "";
        document.querySelector('#userWeight').value = "";
    }
    refresh.addEventListener('click', refreshWeb, false);

};
// 儲存表單資料
function newRecord() {
    var userH = document.querySelector('#userHeight').value;
    var userW = document.querySelector('#userWeight').value;
    var bmiRound = (userW / ((userH / 100) * (userH / 100))).toFixed(2);

    var dt = new Date();
    var monthInfo = [
        'Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'
    ]
    var nowYear = dt.getFullYear();
    var nowMonth = monthInfo[dt.getMonth()];
    var nowDate = dt.getDate();
    var nowHours = dt.getHours();
    var nowMinutes = dt.getMinutes();
    bmiData.push({
        height: userH, weight: userW, bmi: bmiRound, year: nowYear, month: nowMonth, date: nowDate, hour: nowHours, minute: nowMinutes,
    });
    var str = JSON.stringify(bmiData);
    localStorage.setItem('BMIstorage', str);
    updateList();
}
// 產生紀錄表 createElement寫法
function updateList() {
    updatearea.innerHTML = "";
    for (var i = 0; i < bmiData.length; i++) {
        var recordBar = document.createElement('div');
        recordBar.setAttribute('class', 'recordBar border w-60 d-flex justify-content-between mb-2');
        recordBar.setAttribute('data-num', i);

        // alertBar&status
        var alertbar = document.createElement('div');
        var status = document.createElement('div');
        status.setAttribute('class', 'status');

        if (bmiData[i].bmi < 18.5) {
            alertbar.setAttribute('class', 'alertbar bgthin');
            status.textContent = '過輕';
        } else if (18.5 <= bmiData[i].bmi && bmiData[i].bmi < 24.5) {
            alertbar.setAttribute('class', 'alertbar bghealth');
            status.textContent = '正常';
        }
        else if (24.5 <= bmiData[i].bmi && bmiData[i].bmi < 27) {
            alertbar.setAttribute('class', 'alertbar bgheavy');
            status.textContent = '過重';
        }
        else if (bmiData[i].bmi >= 27 && bmiData[i].bmi < 29) {
            alertbar.setAttribute('class', 'alertbar bgheavy-sm');
            status.textContent = '輕微肥胖';
        }
        else if (bmiData[i].bmi >= 29 && bmiData[i].bmi < 30) {
            alertbar.setAttribute('class', 'alertbar bgheavy-md');
            status.textContent = '中度肥胖';
        }
        else if (bmiData[i].bmi >= 30) {
            alertbar.setAttribute('class', 'alertbar bgheavy-lg');
            status.textContent = '重度肥胖';
        }
        // 刪除鈕
        var delBtn = document.createElement('a');
        delBtn.setAttribute('href', '#');
        delBtn.setAttribute('data-num', i);
        delBtn.textContent = "x"
        alertbar.appendChild(delBtn);

        //bmiRecord
        var bmiRecord = document.createElement('div');
        bmiRecord.setAttribute('class', 'bmiRecord');
        var bmiSpan = document.createElement('span');
        bmiSpan.textContent = 'BMI';
        bmiRecord.appendChild(bmiSpan);
        var bmiP = document.createElement('p');
        bmiP.textContent = bmiData[i].bmi;
        bmiRecord.appendChild(bmiP);

        //heightRecord
        var heightRecord = document.createElement('div');
        heightRecord.setAttribute('class', 'heightRecord');
        var heightSpan = document.createElement('span');
        heightSpan.textContent = 'Height';
        heightRecord.appendChild(heightSpan);
        var heightP = document.createElement('p');
        heightP.textContent = bmiData[i].height;
        heightRecord.appendChild(heightP);
        var cmSpan = document.createElement('span');
        cmSpan.textContent = 'cm';
        heightRecord.appendChild(cmSpan);

        // weightRecord
        var weightRecord = document.createElement('div');
        weightRecord.setAttribute('class', 'weightRecord');
        var weightSpan = document.createElement('span');
        weightSpan.textContent = 'Weight';
        weightRecord.appendChild(weightSpan);
        var weightP = document.createElement('p');
        weightP.textContent = bmiData[i].weight;
        weightRecord.appendChild(weightP);
        var kgSpan = document.createElement('span');
        kgSpan.textContent = 'kg';
        weightRecord.appendChild(kgSpan);
        // timeRecord
        var timeRecord = document.createElement('div');
        timeRecord.setAttribute('class', 'timeRecord');
        timeRecord.textContent = bmiData[i].year + "-" + bmiData[i].month + bmiData[i].date + '  ' + bmiData[i].hour + ':' + bmiData[i].minute;

        recordBar.appendChild(alertbar);
        recordBar.appendChild(status);
        recordBar.appendChild(bmiRecord);
        recordBar.appendChild(heightRecord);
        recordBar.appendChild(weightRecord);
        recordBar.appendChild(timeRecord);
        updatearea.appendChild(recordBar);


    }

};
// 刪除紀錄指令
function deleteEvent(e) {
    e.preventDefault();
    if (e.target.nodeName !== 'A') {
        return;
    } else {
        if (deleteConfirm()) {
            var number = e.target.dataset.num;
            bmiData.splice(number, 1);
            var str = JSON.stringify(bmiData);
            localStorage.setItem('BMIstorage', str);
            updateList();
        } else {
            return;
        }
    }
}
// 確認是否刪除
function deleteConfirm() {
    if (window.confirm('您確定要刪除此筆紀錄嗎?')) {
        return true;
    } else {
        return false;
    }
}


updateList();
goBtn.addEventListener('click', updateBMI, false);
goBtn.addEventListener('click', newRecord, false);
updatearea.addEventListener('click', deleteEvent, false);

