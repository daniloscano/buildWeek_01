const checkbox = document.querySelector('.terms-checkbox');
const proceedBtn = document.querySelector('#proceed_button');

const proceedToExam = () => {
    if (checkbox.checked) {
        proceedBtn.removeAttribute('disabled');
    } else {
        proceedBtn.setAttribute('disabled', 'true');
    }
};

checkbox.addEventListener('click', () => {
    if (checkbox.checked === false) {
        checkbox.setAttribute('checked', 'true');
        proceedToExam();
    } else {
        checkbox.setAttribute('checked', 'false');
        proceedToExam();
    };
});