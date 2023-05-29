let countSpan = document.querySelector(".count .full-count")
let countmain = document.querySelector(".count .main-count")
let bUlletsContainer = document.querySelector(".bullets")
let myBUlletsSpan = document.querySelector(".bullets .spans")
let quizArea = document.querySelector(".quiz-area")
let answerArea = document.querySelector(".answer-area")
let button = document.querySelector(".submit-button")
let reslutContainer = document.querySelector(".results")
let countDown = document.querySelector(".count-down")
let reset = document.querySelector(".reset")
let passwordInput = document.getElementById("password")

// SET
let mainCount = 0;
countmain.innerHTML = mainCount + 1
let rightAnswer = 0;
let wrongAnswer = 0
let Time_Duration = 35
// alert("Are You Ready For Exam")
function getquestions() {

    let Myreq = new XMLHttpRequest()
    Myreq.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {

            let Myquestions = JSON.parse(this.responseText);
            let countQues = Myquestions.length
            creatBullets(countQues)

            addQuestionData(Myquestions[mainCount], countQues)

            // Time Duration
            timeDuration(Time_Duration, countQues)

            button.onclick = function () {

                let theRightAnswer = Myquestions[mainCount].write_answer;

                mainCount++;
                countmain.innerHTML = mainCount + 1

                getAnswer(theRightAnswer, countQues)

                quizArea.innerHTML = "";
                answerArea.innerHTML = "";

                addQuestionData(Myquestions[mainCount], countQues);


                handleBullets()

                showResult(countQues)


                // Time Duration
                clearInterval(countIntervel);
                timeDuration(Time_Duration, countQues)




            }


        }

    }
    Myreq.open("GET", "quetions.json", true);
    Myreq.send();
}
getquestions()
function creatBullets(num) {
    countSpan.innerHTML = num
    for (let i = 0; i < num; i++) {
        let span = document.createElement("span")
        if (i === 0) {
            span.className = "active";
        }
        myBUlletsSpan.appendChild(span)
    }
}
function addQuestionData(obj, count) {
    if (mainCount < count) {
        let questionTitle = document.createElement("h2")
        let questionText = document.createTextNode(obj.title)
        questionTitle.appendChild(questionText)


        quizArea.appendChild(questionTitle)
        let num = obj.number

        for (let i = 1; i <= num; i++) {


            if (obj.number <= 2) {
                answerArea.classList.add("buttons")
                Time_Duration = 30

                let mainDiv = document.createElement("div")
                mainDiv.className = "button"
                let button = document.createElement("button")
                button.className = "button"
                button.dataset.answer = obj[`answer_${i}`]
                button.name = "question"
                let buttonText = document.createTextNode(obj[`answer_${i}`])
                button.appendChild(buttonText)
                button.htmlFor = `answer_${i}`
                mainDiv.appendChild(button)

                answerArea.appendChild(mainDiv)
                let mainbutton = document.querySelectorAll("button.button")
                mainbutton.forEach((e) => {
                    e.onclick = () => {
                        mainbutton.forEach((button) => {
                            button.classList.remove("active")
                        })
                        e.classList.add("active")
                    }
                })

            } else {
                answerArea.classList.remove("buttons")
                let mainDiv = document.createElement("div")
                mainDiv.className = "answer"
                let radioBtn = document.createElement("input")
                // Create Radio
                radioBtn.name = "question"
                radioBtn.type = "radio"
                radioBtn.id = `answer_${i}`
                radioBtn.dataset.answer = obj[`answer_${i}`]

                // Create Label
                let label = document.createElement("label")
                let labelText = document.createTextNode(obj[`answer_${i}`])
                label.appendChild(labelText)
                label.htmlFor = `answer_${i}`

                // Append Element To Main Dive

                mainDiv.appendChild(radioBtn)
                mainDiv.appendChild(label)

                // Append Element To Main Dive
                answerArea.appendChild(mainDiv)
                console.log(obj.number)
            }

        }
    }
}


function getAnswer(rAnswer, count) {
    let answer = document.getElementsByName("question")
    let question_new = document.getElementsByClassName('ques')
    let checkedAnswer;
    for (let i = 0; i < answer.length; i++) {
        if (answer[i].checked) {
            checkedAnswer = answer[i].dataset.answer

            console.log(answer[i].parentElement)


        }
        if (answer[i].classList.contains("active")) {
            checkedAnswer = answer[i].dataset.answer
        }
    }


    if (rAnswer === checkedAnswer) {


        rightAnswer++

    } else {

        console.log(`Your Answer Is FAlse => [${checkedAnswer}] ---------- True Anser Is =>[ ${rAnswer} ]   ---- Question Count Is ${mainCount}`)
        wrongAnswer++
    }
}

function handleBullets() {
    let bulletSpan = document.querySelectorAll(".bullets .spans span")
    let arryOfSpans = Array.from(bulletSpan)

    arryOfSpans.forEach((span, index) => {
        if (mainCount === index) {
            span.className = "active"
        }
    })
}


let password = window.localStorage.getItem("code")

function showResult(count) {
    let theRueslt;
    if (mainCount === count) {
        quizArea.remove()
        answerArea.remove()
        button.remove()
        bUlletsContainer.remove()
        reslutContainer.classList.add("result")
        if (rightAnswer > (count / 2) && rightAnswer < count) {
            theRueslt = `<span class="good">Good Your Reslut Is</span> ${rightAnswer} <span class="from">From</span> ${count}`
        } else if (rightAnswer === count) {
            theRueslt = `<span class="perfect">Perfect Your Reslut Is</span> ${rightAnswer} <span class="from">From</span> ${count}`
        } else {
            theRueslt = `<span class="bad">Bad Your Reslut Is</span> ${rightAnswer} <span class="from">From</span> ${count}`
        }

        reslutContainer.innerHTML = theRueslt;
        console.log(rightAnswer)


        window.localStorage.setItem(password, rightAnswer)
        // console.log(password)

    }

}




function timeDuration(duration, count) {
    if (mainCount < count) {
        let menutis, seconds;

        countIntervel = setInterval(function () {
            menutis = parseInt(duration / 60)
            seconds = parseInt(duration % 60)

            menutis = menutis < 10 ? `0${menutis}` : menutis;
            seconds = seconds < 10 ? `0${seconds}` : seconds;

            countDown.innerHTML = `${menutis}:${seconds}`

            if (--duration < 0) {
                clearInterval(countIntervel);
                button.click()
            }
        }, 1000)
    }
}

// window.addEventListener("beforeunload", () => {
//     event.preventDefault();
//     event.returnValue = "Sure";
// }
// )


// window.onload = () => {
//     if (window.localStorage.getItem(password)) {
//         // alert(`your do this before and your result is [ ${window.localStorage.getItem(password)} ]`)
//         window.location.replace("../sign/sign.html")

//     } else {
//         console.log("Hi")
//     }
// }
