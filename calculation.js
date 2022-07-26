
const createJobs = document.getElementById("create_btn").addEventListener('click', function () {
    const jobNumberText = document.getElementById("job_number").value;
    const jobNumber = parseFloat(jobNumberText);

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
        let proTimeA = [];
        let proTimeB = [];
        let proTimeC = [];

        for (let i = 1; i <= jobNumber; i++) {
            proTimeA.push(parseFloat(document.getElementById(`inputTDA${i}`).value));
            proTimeB.push(parseFloat(document.getElementById(`inputTDB${i}`).value));
            proTimeC.push(parseFloat(document.getElementById(`inputTDC${i}`).value));
        }
        const minA = Math.min(...proTimeA);
        const maxB = Math.max(...proTimeB);
        const minC = Math.min(...proTimeC);
        if (minA >= maxB || minC >= maxB) {
            document.getElementById("calculation_hidden").style.display = "block";
            document.getElementById("is_or_not").style.display = "block";

            const sequenceTB = document.getElementById("sequence_TB");
            sequenceTB.innerHTML = "";

            sequenceTableMaking(sequenceTB);
        }
        else {
            document.getElementById("is_or_not").style.display = "block";
            document.getElementById("not").style.display = "block";
        }
    });
}

const sequenceTableMaking = (sequenceTB) => {
    const jobNumberText = document.getElementById("job_number").value;
    const jobNumber = parseFloat(jobNumberText);

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

        let min1Index = minIndex(sequence1, min1, sequence2);
        let min2Index = minIndex(sequence2, min2, sequence1);

        if (min1 <= min2) {
            for (let i = 1; i <= jobNumber; i++) {
                let orderTDValue = document.getElementById(`orderTD${i}`);
                if (orderTDValue.innerText == "") {
                    orderTDValue.innerText = min1Index + 1;
                    sequence1.splice(min1Index, 1, max1 + 100);
                    sequence2.splice(min1Index, 1, max2 + 100);
                    break;
                }
            }
        }
        else {
            for (let i = jobNumber; i >= 1; i--) {
                let orderTDValue = document.getElementById(`orderTD${i}`);
                if (orderTDValue.innerText == "") {
                    orderTDValue.innerText = min2Index + 1;
                    sequence1.splice(min2Index, 1, max1 + 100);
                    sequence2.splice(min2Index, 1, max2 + 100);
                    break;
                }
            }
        }
    }
    const InOutTB = document.getElementById("in_out_TB");
    InOutTB.innerHTML = "";
    inOutTableMaking(jobNumber, InOutTB);
}

const inOutTableMaking = (jobNumber, InOutTB) => {
    for (let i = 1; i <= jobNumber; i++) {
        let InOutTR = document.createElement('tr');
        InOutTR.innerHTML = `<th id = "TD${i}" scope="row"></th>
        <td id="in_out_TDAI${i}"></td>
        <td id="in_out_TDAO${i}"></td>
        <td id="in_out_TDBI${i}"></td>
        <td id="in_out_TDBO${i}"></td>
        <td id="in_out_TDCI${i}"></td>
        <td id="in_out_TDCO${i}"></td>`;

        InOutTB.appendChild(InOutTR);
    }
    InOutTableValue(jobNumber);
}

const InOutTableValue = (jobNumber) => {
    for (let i = 1; i <= jobNumber; i++) {
        let TD = document.getElementById(`TD${i}`);
        let TDAI = document.getElementById(`in_out_TDAI${i}`);
        let TDAO = document.getElementById(`in_out_TDAO${i}`);
        let TDBI = document.getElementById(`in_out_TDBI${i}`);
        let TDBO = document.getElementById(`in_out_TDBO${i}`);
        let TDCI = document.getElementById(`in_out_TDCI${i}`);
        let TDCO = document.getElementById(`in_out_TDCO${i}`);

        TD.innerText = document.getElementById(`orderTD${i}`).innerText;
        let order = parseFloat(TD.innerText);

        let TimeA = document.getElementById(`inputTDA${order}`).value;
        let TimeB = document.getElementById(`inputTDB${order}`).value;
        let TimeC = document.getElementById(`inputTDC${order}`).value;

        let parsingTimeA = parseFloat(TimeA);
        let parsingTimeB = parseFloat(TimeB);
        let parsingTimeC = parseFloat(TimeC);


        if (i == 1) {
            TDAI.innerText = 0;
            TDAO.innerText = parsingTimeA;
            TDBI.innerText = parsingTimeA;
            TDBO.innerText = parsingTimeA + parsingTimeB;
            TDCI.innerText = parsingTimeA + parsingTimeB;
            TDCO.innerText = parsingTimeA + parsingTimeB + parsingTimeC;

        }
        else {
            TDAI.innerText = parseFloat(document.getElementById(`in_out_TDAO${i - 1}`).innerText);
            TDAO.innerText = parseFloat(TDAI.innerText) + parsingTimeA;


            if (parseFloat(TDAO.innerText) >= parseFloat(document.getElementById(`in_out_TDBO${i - 1}`).innerText)) {
                TDBI.innerText = parseFloat(TDAO.innerText);
            }
            else {
                TDBI.innerText = parseFloat(document.getElementById(`in_out_TDBO${i - 1}`).innerText);
            }
            TDBO.innerText = parseFloat(TDBI.innerText) + parsingTimeB;


            if (parseFloat(TDBO.innerText) >= parseFloat(document.getElementById(`in_out_TDCO${i - 1}`).innerText)) {
                TDCI.innerText = parseFloat(TDBO.innerText);
            }
            else {
                TDCI.innerText = parseFloat(document.getElementById(`in_out_TDCO${i - 1}`).innerText);
            }
            TDCO.innerText = parseFloat(TDCI.innerText) + parsingTimeC;
        }
    }
    IdealTimeCalculation(jobNumber);
}

const IdealTimeCalculation = (jobNumber) => {
    const ElapsedT = document.getElementById("elapsed_t");
    const IdealA = document.getElementById("ideal_a");
    const IdealB = document.getElementById("ideal_b");
    const IdealC = document.getElementById("ideal_c");

    const elapsedTime = parseFloat(document.getElementById(`in_out_TDCO${jobNumber}`).innerText);

    ElapsedT.innerText = elapsedTime;
    let timeA = 0;
    let timeB = 0;
    let timeC = 0;
    for (let i = 1; i < jobNumber; i++) {
        timeA = timeA + parseFloat(document.getElementById(`in_out_TDAI${i + 1}`).innerText) - parseFloat(document.getElementById(`in_out_TDAO${i}`).innerText);

        timeB = timeB + parseFloat(document.getElementById(`in_out_TDBI${i + 1}`).innerText) - parseFloat(document.getElementById(`in_out_TDBO${i}`).innerText);

        timeC = timeC + parseFloat(document.getElementById(`in_out_TDCI${i + 1}`).innerText) - parseFloat(document.getElementById(`in_out_TDCO${i}`).innerText);
    }
    timeA = timeA + elapsedTime - parseFloat(document.getElementById(`in_out_TDAO${jobNumber}`).innerText);

    timeB = timeB + elapsedTime - parseFloat(document.getElementById(`in_out_TDBO${jobNumber}`).innerText) + parseFloat(document.getElementById(`in_out_TDBI${1}`).innerText);

    timeC = timeC + parseFloat(document.getElementById(`in_out_TDCI${1}`).innerText);

    IdealA.innerText = timeA;
    IdealB.innerText = timeB;
    IdealC.innerText = timeC;

}

function minIndex(sequence, min, seq) {
    let newArray = [];
    let indexi = 0;
    for (let i = 0; i < sequence.length; i++) {
        if (min == sequence[i]) {
            // min = sequence[i];
            newArray.push(i);
        }
    }
    let minAgain = seq[newArray[0]];
    for (let j = 0; j < newArray.length; j++) {
        if (minAgain >= seq[newArray[j]]) {
            minAgain = seq[newArray[j]];
            indexi = newArray[j];
        };
    }
    console.log(indexi);
    return indexi;
}