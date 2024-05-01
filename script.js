var num1Input = document.getElementById('num1');
var num2Input = document.getElementById('num2');
var num3Input = document.getElementById('num3');
var operatorSelect = document.getElementById('operator');
var calculationDiv = document.getElementById('calculation');

function generateRandomNumber(digits) {
    var min = Math.pow(10, digits - 1);
    var max = Math.pow(10, digits) - 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateCalculation() {
    calculationDiv.innerHTML = '';
    var num1Digits = parseInt(num1Input.value);
    var num2Digits = parseInt(num2Input.value);

    var operator = operatorSelect.value;

    while (true) {
        var num1 = generateRandomNumber(num1Digits);
        var num2 = generateRandomNumber(num2Digits);

        if (operator == "+" || operator == "*") {
            break;
        }

        if (operator == "-") {
            if (num1 > num2) {
                break;
            }
        }

        if (operator == "/" && num2 === 1) {
            continue;
        }

        if (operator == "/") {
            if (num1 % num2 == 0) {
                break;
            }
        }
    }

    var calculationText = num1 + '\n' + operator + ' ' + num2;
    var newCalculation = document.createElement("div");
    var hrElement = document.createElement("hr");
    newCalculation.innerText = calculationText;
    newCalculation.appendChild(hrElement);
    calculationDiv.appendChild(newCalculation);
}

document.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        checkAnswer();
    }
});

function closeKiemtra() {
    document.getElementById('options').style.display = 'block';
    document.getElementById('scoreboardId').style.display = 'none';
    document.getElementById('start').style.display = 'none';
    document.getElementById('correct').innerText = 0;
    document.getElementById('incorrect').innerText = 0;
}

document.getElementById('setting').addEventListener('click', function () {
    closeKiemtra();
});

function showPopup(id) {
    var popup = document.getElementById(id);
    popup.style.display = "block";
    setTimeout(function () {
        popup.style.display = "none";
    }, 2000);
}

function checkAnswer() {
    var result = parseInt(document.getElementById('result').value);
    var num1 = parseInt(calculationDiv.innerText.split('\n')[0]);
    var num2 = parseInt(calculationDiv.innerText.split('\n')[1].split(' ')[1]);
    var operator = calculationDiv.innerText.split('\n')[1].split(' ')[0];
    var correctAnswer = eval(num1 + operator + num2);

    if (result === correctAnswer) {
        showPopup("popup-correct");
        incrementCorrectScore();
    } else {
        showPopup("popup-incorrect");
        incrementIncorrectScore();
    }

    var num3Digits = document.getElementById('socau').innerText;
    var socau = parseInt(num3Digits.split('/')[0]);
    socau += 1;

    if (socau > parseInt(num3Digits.split('/')[1])) {
        alert("Kết thúc bài kiểm tra\nBạn được: " + parseInt(document.getElementById('correct').innerText) + "/" + parseInt(num3Digits.split('/')[1]) + " điểm!");
        closeKiemtra();
    } else {
        document.getElementById('socau').innerText = socau + "/" + num3Digits.split('/')[1];
        generateCalculation();
        document.getElementById('result').value = '';
    }
}

function incrementCorrectScore() {
    var score = parseInt(document.getElementById('correct').innerText);
    document.getElementById('correct').innerText = score + 1;
}

function incrementIncorrectScore() {
    var score = parseInt(document.getElementById('incorrect').innerText);
    document.getElementById('incorrect').innerText = score + 1;
}

function start() {
    var num1Digits = parseInt(num1Input.value);
    var num2Digits = parseInt(num2Input.value);
    var num3Digits = parseInt(num3Input.value);
    var operator = operatorSelect.value;

    if ((num1Digits < 1 || num1Digits > 9) || (num2Digits < 1 || num2Digits > 9)) {
        alert("Vui lòng nhập số chữ số từ 1 đến 9");
        return;
    }

    if (num3Digits < 1 || num3Digits > 50) {
        alert("Vui lòng nhập số câu hỏi từ 1 đến 50");
        return;
    }

    if (operator == "-" && num1Digits < num2Digits) {
        alert("Phép trừ bạn cài đặt không hợp lệ\nVui lòng chọn số chữ số của số thứ nhất lớn hơn hoặc bằng số chữ số của số thứ hai");
        return;
    }

    if (operator == "/" && num1Digits < num2Digits) {
        alert("Phép chia bạn cài đặt không hợp lệ\nVui lòng chọn số chữ số của số thứ nhất lớn hơn hoặc bằng số chữ số của số thứ hai");
        return;
    }

    generateCalculation();
    document.getElementById('result').value = '';
    document.getElementById('scoreboardId').style.display = 'block';
    document.getElementById('options').style.display = 'none';
    document.getElementById('start').style.display = 'block';
    document.getElementById('socau').innerText = "1/" + num3Digits;
}
