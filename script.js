// ajax function
async function fetchData() {
    const url = 'https://yesno.wtf/api';
    const options = {
        method: 'GET',
    };
    try {

        // stop displaying the answer
        document.querySelector("#no").style.display = "none";
        document.querySelector("#yes").style.display = "none";

        // get the DOM of gif image
        const gifImg = document.querySelector('img');

        // change gif image before changing to new one
        if(gifImg.getAttribute('src') !== "img/universe.gif") {
            gifImg.setAttribute('src', "img/universe.gif");
        }

        // get new answer and gif
        const response = await fetch(url, options);
        const result = await response.json();

        // start changing gif image
        gifImg.setAttribute('src', result.image);
        
        // check if new gif is completely loaded every interval time
        let checkLoaded = setInterval(() => {
            if (gifImg.complete) {

                // if new gif loaded then display the answer and clear interval function
                if (result.answer === 'no') {
                    document.querySelector("#no").style.display = "block";
                } else {
                    document.querySelector("#yes").style.display = "block";
                }
                clearInterval(checkLoaded);
            }
        }, 10);
    } catch (error) {
        console.error(error);
    }
}

// set event listener on clicking img, answer, and enter key
document.querySelector("img").onclick = function() {
    regenerate();
}
document.querySelector("#yes").onclick = function() {
    regenerate();
}
document.querySelector("#no").onclick = function() {
    regenerate();
}
document.querySelector('input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        regenerate();
    }
});

// regenerate gif after clicking
function regenerate() {
    
    // check if user typed the question
    if(document.querySelector("#textBox").value.length === 0) {
        alert("Type Something!");
    } else {

        // start fetching data and change gif
        fetchData();
    }
}
