
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
        const orderTD = document.createElement('td');
        orderTD.id = `orderTD${i}`;
        orderTR.appendChild(orderTD);
    }
};