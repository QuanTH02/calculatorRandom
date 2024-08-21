var num1Input = document.getElementById('num1');
var num2Input = document.getElementById('num2');
var num3Input = document.getElementById('num3');
var operatorSelect = document.getElementById('operator');
// var calculationDiv = document.getElementById('calculation');
var divCal = document.getElementById('divCal');
// var resultInput = document.getElementById('result');
var divStart = document.getElementById('start');
var numberGen1, numberGen2, chooseOperator;

function generateRandomNumber(digits) {
    var min = Math.pow(10, digits - 1);
    var max = Math.pow(10, digits) - 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomNumberDivide(digits, num2) {
    var min = Math.pow(10, digits - 1);
    var max = Math.pow(10, digits) - 1;
    var minDivided = min / num2;
    var maxDivided = max / num2;

    var randomDivided = Math.random() * (maxDivided - minDivided) + minDivided;
    var result = Math.floor(randomDivided);

    // console.log("Min: " + minDivided);
    // console.log("Max: " + maxDivided);
    // console.log("Random: " + randomDivided);
    // console.log("Result: " + result);

    return result;
}

function quanNum(num) {
    var num = parseInt(num);
    var quan = 0;

    while (num > 0) {
        num = Math.floor(num / 10);
        quan += 1;
    }

    return quan;
}

function checkAnswerNormal(num1, num2, operator) {

}

function checkAnswerMultiply(num1, num2) {
    var quanNum1 = quanNum(num1);
    var quanNum2 = quanNum(num2);
    var resultMulti = num1 * num2;
    var quanResultMulti = quanNum(resultMulti);
    var tichrieng = [];

    // Tính giá trị của từng tích riêng
    for (let i = 0; i < quanNum2; i++) {
        var tich = num1 * Math.floor(num2 / Math.pow(10, quanNum2 - i - 1));
        tichrieng.push(tich);
        num2 = num2 % Math.pow(10, quanNum2 - i - 1);
    }

    tichrieng.reverse();
    tichrieng.push(resultMulti);

    var arrTichRieng = [];
    for (let i = 0; i <= quanNum2; i++) {
        arrTichRieng.push(i + 1);
        arrTichRieng[i + 1] = [];

        let numberArr = Array.from(String(tichrieng[i]), Number);
        numberArr.reverse();
        // console.log(numberArr);
        let arr = new Array(quanResultMulti).fill('');

        for (let j = 1; j <= quanResultMulti; j++) {
            if (numberArr[j - 1] != undefined) {
                // console.log(j-1);
                // console.log(numberArr[j-1]);
                if (i != quanNum2) {
                    arr[quanResultMulti - i - j] = String(numberArr[j - 1]);
                } else {
                    arr[j - 1] = String(numberArr[j - 1]);
                }
            }

        }

        arrTichRieng[i + 1] = arr;

        if (i == quanNum2) {
            arrTichRieng[i + 1].reverse();
        }
    }
    // console.log(arrTichRieng);

    // 
    var arrTichRiengInp = [];
    if (quanNum2 > 1) {
        for (let i = 1; i <= quanNum2 + 1; i++) {
            arrTichRiengInp.push(i);
            arrTichRiengInp[i] = [];
            for (let j = quanResultMulti; j >= 1; j--) {
                // console.log(document.getElementById('inp_line_' + i + '_' + j).value);
                arrTichRiengInp[i].push(document.getElementById('inp_line_' + i + '_' + j).value);
            }
        }
    } else {
        for (let i = 1; i <= quanNum2; i++) {
            arrTichRiengInp.push(i);
            arrTichRiengInp[i] = [];
            for (let j = 1; j <= quanResultMulti; j++) {
                // console.log(document.getElementById('inp_line_' + i + '_' + j).value);
                arrTichRiengInp[i].push(document.getElementById('inp_line_' + i + '_' + j).value);
            }
        }
    }


    for (let i = 1; i <= quanNum2 + 1; i++) {
        if (JSON.stringify(arrTichRieng[i]) != JSON.stringify(arrTichRiengInp[i])) {
            return 0;
        }
    }
    return 1;
}

function calculationOperatorMultiply(num1, num2, operator) {
    var quanNum1 = quanNum(num1);
    var quanNum2 = quanNum(num2);
    var resultMulti = num1 * num2;
    var quanResultMulti = quanNum(resultMulti);
    var number1 = num1;
    var number2 = num2;

    // Tạo phần tử div bao ngoài
    const divTableMulti = document.createElement('div');
    divTableMulti.className = 'divTableMulti';

    // Tạo phần tử table
    const table = document.createElement('table');
    // table.style.width = '100%';
    table.style.borderCollapse = 'collapse';
    divTableMulti.appendChild(table);

    // Tạo hàng đầu tiên
    let tr = document.createElement('tr');
    let th = document.createElement('th');
    th.setAttribute('rowspan', 2);
    th.textContent = 'x';
    tr.appendChild(th);

    for (let i = 0; i < quanResultMulti - quanNum1; i++) {
        th = document.createElement('th');
        tr.appendChild(th);
    }

    for (let i = 0; i < quanNum1; i++) {
        th = document.createElement('th');
        th.textContent = Math.floor(num1 / Math.pow(10, quanNum1 - i - 1));
        num1 = num1 % Math.pow(10, quanNum1 - i - 1);
        tr.appendChild(th);
    }

    table.appendChild(tr);

    // Tạo hàng thứ hai với class border_bot_multi
    tr = document.createElement('tr');
    tr.className = 'border_bot_multi';

    for (let i = 0; i < quanResultMulti - quanNum2; i++) {
        th = document.createElement('th');
        if (quanNum2 > 1) {
            th.style.borderBottom = '2px solid black';
        }
        tr.appendChild(th);
    }

    for (let i = 0; i < quanNum2; i++) {
        th = document.createElement('th');
        th.textContent = Math.floor(num2 / Math.pow(10, quanNum2 - i - 1));
        num2 = num2 % Math.pow(10, quanNum2 - i - 1);
        if (quanNum2 > 1) {
            th.style.borderBottom = '2px solid black';
        }
        tr.appendChild(th);
    }

    table.appendChild(tr);

    // Tạo hàng trống với height 5px
    tr = document.createElement('tr');
    let td = document.createElement('td');
    td.style.height = '5px';
    tr.appendChild(td);
    table.appendChild(tr);


    // ***************************************************************************************
    // ***************************************************************************************
    // ***************************************************************************************
    // Tích riêng
    var idInputTichRieng = 1;
    var quanNum2Copy = quanNum2;
    if (quanNum2Copy > 1) {
        // Tạo hàng với dấu cộng và các ô input
        tr = document.createElement('tr');
        td = document.createElement('td');
        td.setAttribute('rowspan', quanNum2Copy * 2 - 1);
        td.textContent = '+';
        tr.appendChild(td);

        for (let i = 0; i < quanResultMulti; i++) {
            td = document.createElement('td');
            const input = document.createElement('input');
            input.className = 'inp_on_table';
            input.type = 'text';
            input.id = 'inp_line_' + idInputTichRieng + '_' + (quanResultMulti - i);
            input.maxLength = 1;
            td.appendChild(input);
            tr.appendChild(td);
        }
        idInputTichRieng += 1;
        table.appendChild(tr);

        while (quanNum2Copy > 1) {
            // Tạo hàng trống thứ hai với height 5px
            tr = document.createElement('tr');
            td = document.createElement('td');
            td.style.height = '5px';
            tr.appendChild(td);
            table.appendChild(tr);

            // Tạo hàng với các ô input khác
            tr = document.createElement('tr');

            for (let i = 0; i < quanResultMulti; i++) {
                td = document.createElement('td');
                const input = document.createElement('input');
                input.className = 'inp_on_table';
                input.type = 'text';
                input.id = 'inp_line_' + idInputTichRieng + '_' + (quanResultMulti - i);
                input.maxLength = 1;
                td.appendChild(input);
                tr.appendChild(td);
            }
            idInputTichRieng += 1;
            table.appendChild(tr);
            quanNum2Copy -= 1;
        }
    }

    // ***************************************************************************************
    // ***************************************************************************************
    // ***************************************************************************************
    // Kết quả
    // Tạo hàng với các ô có class td_border_bot_multi
    tr = document.createElement('tr');
    td = document.createElement('td');
    td.setAttribute('rowspan', 3);
    tr.appendChild(td);

    for (let i = 0; i < quanResultMulti; i++) {
        td = document.createElement('td');
        td.className = 'td_border_bot_multi';
        tr.appendChild(td);
    }

    table.appendChild(tr);

    // Tạo hàng trống cuối cùng với height 5px
    tr = document.createElement('tr');
    td = document.createElement('td');
    td.style.height = '5px';
    tr.appendChild(td);
    table.appendChild(tr);

    // Tạo hàng với các ô input khác và class inp_on_table1
    tr = document.createElement('tr');

    for (let i = 0; i < quanResultMulti; i++) {
        td = document.createElement('td');
        const input = document.createElement('input');
        input.className = 'inp_on_table1';
        input.type = 'text';
        input.id = 'inp_line_' + idInputTichRieng + '_' + (quanResultMulti - i);
        input.maxLength = 1;
        td.appendChild(input);
        tr.appendChild(td);
    }

    table.appendChild(tr);

    document.getElementById("divTableMulti").innerHTML = '';
    document.getElementById("divTableMulti").appendChild(divTableMulti);

    if (quanNum2 > 1) {
        document.addEventListener('input', function (event) {
            var thisId = event.target.id;
            var numEnd = parseInt(thisId.charAt(thisId.length - 1));

            if (thisId.includes('inp_line_')) {
                if (event.inputType !== 'deleteContentBackward' && event.inputType !== 'deleteContentForward') {
                    if (numEnd !== quanResultMulti) {
                        document.getElementById(thisId.slice(0, -1) + (numEnd + 1)).focus();
                    }
                }
            }
        });
    }


    document.addEventListener('keydown', function (event) {
        if (event.code === 'Space') {
            checkAnswerMultiply(number1, number2);
        }
    });
}

function calculationOperatorNormal(num1, num2, operator) {
    // Tạo phần tử div bao ngoài
    const divTableMulti = document.createElement('div');
    divTableMulti.className = 'divTableMulti';
    divTableMulti.style.marginTop = "5%";

    // Tạo phần tử table
    const table = document.createElement('table');
    // table.style.width = '100%';
    table.style.borderCollapse = 'collapse';
    table.className = 'table_normal';
    divTableMulti.appendChild(table);

    // Tạo hàng đầu tiên
    let tr = document.createElement('tr');
    let th = document.createElement('th');
    th.setAttribute('rowspan', 2);
    th.textContent = '+';
    tr.appendChild(th);

    th = document.createElement('th');
    th.textContent = num1;


    tr.appendChild(th);

    table.appendChild(tr);

    // Tạo hàng thứ hai với class border_bot_multi
    tr = document.createElement('tr');
    tr.className = 'border_bot_multi';


    th = document.createElement('th');
    th.textContent = num2;
    th.style.borderBottom = '2px solid black';

    tr.appendChild(th);

    table.appendChild(tr);

    // Tạo hàng trống với height 5px
    tr = document.createElement('tr');
    let td = document.createElement('td');
    td.style.height = '5px';

    tr.appendChild(td);
    table.appendChild(tr);

    // document.getElementById("divTableMulti").innerHTML = '';
    document.getElementById("divTableMulti").appendChild(divTableMulti);

    var doDaiGachChan = table.offsetWidth;

    // Kết quả
    tr = document.createElement('tr');
    tr.appendChild(td);
    td = document.createElement('td');

    const input = document.createElement('input');
    input.className = 'inp_on_table_normal';
    input.type = 'text';
    input.id = 'result';
    input.style.width = doDaiGachChan + 'px';

    // console.log(doDaiGachChan);

    td.appendChild(input);
    tr.appendChild(td);
    table.appendChild(tr);
}

function generateCalculation() {
    // calculationDiv.innerHTML = '';
    // divCal.style.width = "160px";
    // resultInput.style.width = "150px";
    var num1Digits = parseInt(num1Input.value);
    var num2Digits = parseInt(num2Input.value);

    var operator = operatorSelect.value;

    chooseOperator = operator;

    while (true) {
        var num1 = generateRandomNumber(num1Digits);
        var num2 = generateRandomNumber(num2Digits);

        numberGen1 = num1;
        numberGen2 = num2;

        if (operator == "*") {
            // document.getElementById("calcu").style.display = 'none';
            calculationOperatorMultiply(num1, num2, operator);
            return;
        } else {
            if (operator == "+") {
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
                var num = generateRandomNumberDivide(num1Digits, num2);
                while (num === 0) {
                    num = generateRandomNumberDivide(num1Digits, num2);
                }

                num1 = num2 * num;

                if (quanNum(num1) != num1Digits || num1 == num2)
                    continue;
                break;
            }
        }
    }
    document.getElementById("divTableMulti").innerHTML = '';
    calculationOperatorNormal(num1, num2, operator);
    // document.getElementById("calcu").style.display = 'block';

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
    // var result = parseInt(document.getElementById('result').value);
    var correctAnswer = eval(numberGen1 + chooseOperator + numberGen2);

    if (chooseOperator == "+" || chooseOperator == "-" || chooseOperator == "/") {
        if (result === correctAnswer) {
            showPopup("popup-correct");
            incrementCorrectScore();
        } else {
            showPopup("popup-incorrect");
            incrementIncorrectScore();
        }
    } else {
        var checkMulti = checkAnswerMultiply(numberGen1, numberGen2);

        if (checkMulti === 1) {
            showPopup("popup-correct");
            incrementCorrectScore();
        } else {
            showPopup("popup-incorrect");
            incrementIncorrectScore();
        }
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
        // document.getElementById('result').value = '';
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
    // if (document.getElementById('result').value)
    //     document.getElementById('result').value = '';
    document.getElementById('scoreboardId').style.display = 'block';
    document.getElementById('options').style.display = 'none';
    document.getElementById('start').style.display = 'block';
    document.getElementById('socau').innerText = "1/" + num3Digits;
}

//Test
generateCalculation();