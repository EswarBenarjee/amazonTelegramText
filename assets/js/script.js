const myForm = document.querySelector("#myForm");
const msgInput = document.querySelector("#msg");
const messageDiv = document.querySelector("#message");
currentMsg = "";
const copyDiv = document.querySelector("#copy");
const copyIconDiv = document.querySelector("#copyIcon");
const correctDiv = document.querySelector("#correctIcon");

const messageParentDiv = document.querySelector("#messageDiv");
messageParentDiv.style.display = "none";

const fetchMessageDiv = document.querySelector("#fetchMessage");
fetchMessageDiv.style.display = "none";

copyDiv.addEventListener("click", () => {
  navigator.clipboard.writeText(currentMsg);
  copyIconDiv.style.display = "none";
  correctDiv.style.display = "block";
  setTimeout(() => {
    correctDiv.style.display = "none";
    copyIconDiv.style.display = "block";
  }, 1000);
});

const submitting = async (e) => {
  e.preventDefault();

  try {
    let t = msgInput.value.split("out of");

    if (t[0].includes("visit")) {
      t[0] = t[0].split("visit")[0];
    } else if (t[0].includes("Visit")) {
      t[0] = t[0].split("Visit")[0];
    }

    if (t[1].includes("Deal")) {
      t[1] = t[1].split("Deal");
    } else if (t[1].includes("Ends in")) {
      t[1] = t[1].split("Ends in");
    }

    if (t[1][0].includes("questions")) {
      t[1][0] = t[1][0].split("questions")[0];
    } else if (t[1][0].includes("ratings")) {
      t[1][0] = t[1][0].split("ratings")[0];
    }

    t[1][1] = t[1][1].split("M.R.P.: ");

    t[1][1][0] = t[1][1][0].trim().split("%");

    temp = t[1][1][0][1].trim();
    t[1][1][0][1] = " (" + t[1][1][0][0].trim() + "%)";
    t[1][1][0][0] = temp;

    rating = t[0].substring(t[0].length - 8, t[0].length);

    rating = rating.split(" ")[1];
    t[0] = t[0].substring(0, t[0].length - 8);

    text = [t[0], ""];
    text.push(
      "Rating: " + rating + " out of 5 stars " + t[1][0].split("    ")[1].trim()
    );
    text.push("");
    text.push("MRP: " + t[1][1][1]);
    text.push("OFFER: " + t[1][1][0][0] + t[1][1][0][1]);
    text.push("");
    text.push("Grab Fast 😁🔥");

    innerT = "";
    for (let i = 0; i < text.length; i++) {
      innerT += "\n" + text[i];
    }

    currentMsg = innerT;
    messageDiv.innerHTML = innerT;

    messageParentDiv.style.display = "block";

    const data = await fetch(
      `https://api.telegram.org/bot6528232665:AAEtxTZ3wcd55wfyRF_k1muW_5rCiQMKRTA/sendMessage?chat_id=-931737374&text=${innerT}`
    );

    console.log(data);
  } catch (exception) {
    console.log(exception);
  }
};

myForm.addEventListener("submit", submitting);
