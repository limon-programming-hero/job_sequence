
const createJobs = document.getElementById("create_btn").addEventListener('click', function () {
    const jobNumber = document.getElementById("job_number").value;

    document.getElementById("input_T").style.display = "block";
    document.getElementById("calculation_hidden").style.display = "none";
    const inputTB = document.getElementById("input_TB");
    inputTB.innerHTML = "";
    inputJobTime(jobNumber, inputTB);
});

const inputJobTime = (jobNumber, inputTB) => {
    for (let i = 1; i <= jobNumber; i++) {
        let InputTR = document.createElement('tr');
        InputTR.innerHTML = `<th scope="row">${i}</th>
    <td><input id="inputTDA${i}" type="text"></td>
    <td><input id="inputTDB${i}" type="text"></td>
    <td><input id="inputTDC${i}" type="text"></td>`;
        inputTB.appendChild(InputTR);
    }
    const calculationBtn = document.getElementById("calculation_btn").addEventListener('click', function () {
        document.getElementById("calculation_hidden").style.display = "block";

        const sequenceTB = document.getElementById("sequence_TB");
        sequenceTB.innerHTML = "";

        sequenceTableMaking(sequenceTB);
    });
}

const sequenceTableMaking = (sequenceTB) => {
    const jobNumber = document.getElementById("job_number").value;

    for (let i = 1; i <= jobNumber; i++) {
        const sequenceTR = document.createElement('tr');
        sequenceTR.innerHTML = `<th scope="row">${i}</th>
    <td id="sequenceTD1${i}"></td>
    <td id="sequenceTD2${i}"></td>`;
        sequenceTB.appendChild(sequenceTR);
    }
    sequenceTableValue(jobNumber);
}

function sequenceTableValue(jobNumber) {
    for (let i = 1; i <= jobNumber; i++) {
        let value1 = document.getElementById(`sequenceTD1${i}`);
        let value2 = document.getElementById(`sequenceTD2${i}`);

        let macTimeA = document.getElementById(`inputTDA${i}`).value;
        let macTimeB = document.getElementById(`inputTDB${i}`).value;
        let macTimeC = document.getElementById(`inputTDC${i}`).value;

        value1.innerText = parseFloat(macTimeA) + parseFloat(macTimeB);
        value2.innerText = parseFloat(macTimeB) + parseFloat(macTimeC);
    }
    const orderTR = document.getElementById("order_TR");
    orderTR.innerHTML = "";
    orderTableMaking(jobNumber, orderTR);
};

const orderTableMaking = (jobNumber, orderTR) => {
    for (let i = 1; i <= jobNumber; i++) {
        let orderTD = document.createElement('td');
        orderTD.id = `orderTD${i}`;
        orderTR.appendChild(orderTD);
    }
    orderValue(jobNumber);
};
const orderValue = (jobNumber) => {
    const sequence1 = [];
    const sequence2 = [];
    for (let i = 1; i <= jobNumber; i++) {
        let text1 = document.getElementById(`sequenceTD1${i}`).innerText;
        let text2 = document.getElementById(`sequenceTD2${i}`).innerText;
        let value1 = parseFloat(text1);
        let value2 = parseFloat(text2);
        sequence1.push(value1);
        sequence2.push(value2);
    }

    for (let j = 1; j <= jobNumber; j++) {
        let min1 = Math.min(...sequence1);
        let min2 = Math.min(...sequence2);
        let max1 = Math.max(...sequence1);
        let max2 = Math.max(...sequence2);

        let min1Index = minIndex(sequence1, min1);
        let min2Index = minIndex(sequence2, min2);

        if (min1 <= min2) {
            for (let i = 1; i <= jobNumber; i++) {
                let orderTDValue = document.getElementById(`orderTD${i}`);
                if (orderTDValue.innerText == "") {
                    orderTDValue.innerText = min1Index + 1;
                    sequence1.splice(min1Index, 1, max1 + 10);
                    sequence2.splice(min1Index, 1, max2 + 10);
                    break;
                }
            }
        }
        else {
            for (let i = jobNumber; i >= 1; i--) {
                let orderTDValue = document.getElementById(`orderTD${i}`);
                if (orderTDValue.innerText == "") {
                    orderTDValue.innerText = min2Index + 1;
                    sequence1.splice(min2Index, 1, max1 + 10);
                    sequence2.splice(min2Index, 1, max2 + 10);
                    break;
                }
            }
        }
    }
}

function minIndex(sequence, min) {
    let indexi = 0;
    for (let i = 1; i <= sequence.length; i++) {
        if (min == sequence[i]) {
            min = sequence[i];
            indexi = i;
        }
    }
    return indexi;
}