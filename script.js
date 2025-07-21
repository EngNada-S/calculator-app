let body = document.body;
let mode = document.querySelector(".mode");
let modeSwitch = document.querySelector(".circle");
let display = document.querySelector(".display input");
let calcButtons = document.querySelectorAll("form div:not(.display) input");
let specialCharacters = ["%", "*", "/", "+", "-", "="];
let output = "";

modeSwitch.addEventListener("click", (e) => {
    if (body.classList.contains("dark-mode")) {
        mode.style.backgroundImage = "url(imgs/lightmode.webp)";
        e.currentTarget.style.transform = "translateX(25px)";
        body.classList.remove("dark-mode");
    } else {
        mode.style.backgroundImage = "url(imgs/darkmode.webp)";
        e.currentTarget.style.transform = "translateX(-1px)";
        body.classList.add("dark-mode");
    }
})

calcButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
        let eleValue = e.target.value;
        calculate(eleValue);
    })
})

// keyboard support
window.addEventListener("keydown", function (e) {
    let key = e.key;
    // numbers
    if (!isNaN(key) || key === ".") {
        calculate(key);
    }
    //operations
    else if (specialCharacters.includes(key)) {
        calculate(key);
    }
    // Enter = equal
    else if (key === "Enter" || key === "=") {
        calculate("=");
    }
    // Backspace = delete one character
    else if (key === "Backspace") {
        calculate("DE");
    }
    // Escape = Delete All
    else if (key === "Escape") {
        calculate("AC");
    }
});

function calculate(btnValue) {
    if (btnValue == "=" && output != "") {
        try {
            output = eval(output.replace(/%/g, "/100"));
        } catch (e) {
            display.value = "Error";
            display.style.color = "red";
            setTimeout(() => {
                output = "";
                display.value = "";
            }, 1000);
            return;
        }
    } else if (btnValue == "AC") {
        output = "";
    } else if (btnValue == "DE") {
        output = output.toString().slice(0, -1);
    } else {
        if (output == "" && specialCharacters.includes(btnValue)) return;
        let lastChar = output[output.length - 1];
        if (specialCharacters.includes(btnValue) && specialCharacters.includes(lastChar)) {
            output = output.slice(0, -1) + btnValue;
        } else {
            output += btnValue;
        }
    }
    display.value = output;
}