const namePerson = "nathan";

console.log(namePerson);

// Feedback on uploaded file.
const inputElement = document.getElementById("profilePicture");
inputElement.addEventListener("change", handleFiles, false);

function handleFiles() {
    const fileList = this.files; /* now you can work with the file list */
    document.getElementById("fileInfoText").innerHTML =
        "Your upload: " + fileList[0].name;
}

// Resource filetext after uploading.
// https://stackoverflow.com/questions/16505333/get-the-data-of-uploaded-file-in-javascript
// https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications


//Progressive enhancement toggle ----------------------------------------------
const validateRegister = document.querySelector("#profilePicture");
let pictureFeedbackFile = document.querySelector("#profilePicture");
let pictureFeedbackLabel = document.querySelector("#picLabel");

if (validateRegister) {
    console.log("Validated!");
    pictureFeedbackFile.classList.add("hideWebLayout");
    pictureFeedbackLabel.classList.add("pictureLabel");
    pictureFeedbackLabel.classList.add("pictureLabel:hover");
} else {
    console.log("not validated!");
    pictureFeedbackFile.classList.remove("hideWebLayout");
    pictureFeedbackLabel.classList.remove("pictureLabel");
    pictureFeedbackLabel.classList.remove("pictureLabel:hover");

}

// resource Victor B - tech 4 