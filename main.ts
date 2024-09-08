//* Starting typescript


document.getElementById("resumeform")?.addEventListener("submit", function (event) {
    event.preventDefault();

    //^ GIVING TYPES
    const profilePictureInput = document.getElementById("profilePicture") as HTMLInputElement;
    const nameElement = document.getElementById("name") as HTMLInputElement;
    const emailElement = document.getElementById("email") as HTMLInputElement;
    const phoneElement = document.getElementById("phone") as HTMLInputElement;
    const educationElement = document.getElementById("education") as HTMLInputElement;
    const experienceElement = document.getElementById("experience") as HTMLInputElement;
    const skillElement = document.getElementById("skills") as HTMLInputElement;

    //*  UNIQUE LINK GENERATION SECTION

    const userURL = document.getElementById('user') as HTMLInputElement;


    //* ALL ELEMENT MAIN LOGIC CONDITION
    if (profilePictureInput&&nameElement && emailElement && phoneElement && educationElement && experienceElement && skillElement && userURL) {
      const name = nameElement.value;
      const email = emailElement.value;
      const phone = phoneElement.value;
      const education = educationElement.value;
      const experience = experienceElement.value;
      const skills = skillElement.value;

    //* UNIQUE URL LOGIC
    const user = userURL.value
    const finalUniqueURL =  `resume/${user.replace(/\s+/g , '')}_generatedresume.html`

      //^ profile picture
      const profilePictureFile = profilePictureInput.files?.[0]
      const profilePictureURL = profilePictureFile ? URL.createObjectURL(profilePictureFile) : '' ; 


      //* CREATIGN RESUME OUTPUT

      const resumeOutput = `
        <h2>Resume</h2>
        ${profilePictureURL ?  ` <img src = "${profilePictureURL}" alt= "Profile Picture" class="profilePicture">  `: '' }
        <p style="margin-top: 15px; " ><strong>Name:</strong> <span id="edit-name" class="editable"> ${name} </span></p>
        <p style="margin-top: 5px; "><strong>Email:</strong> <span id="edit-email" class="editable"> ${email}</span></p>
        <p style="margin-top: 5px; "><strong>Phone Number:</strong> <span id="edit-phone" class="editable"> ${phone}</span></p>

        <h3 style="margin-top: 20px; text-decoration: underline;">Education:</h3>
        <p id="edit-education" class="editable"> ${education}</p>

        <h3 style="margin-top: 20px; text-decoration: underline;">Experience:</h3>
        <p id="edit-experience" class="editable" > ${experience}</p>

        <h3 style="margin-top: 20px; text-decoration: underline;">Skills:</h3>
        <p id="edit-skills" class="editable" > ${skills}</p>
        `;

        //* RESUME DONWLOAD LINK

        const resumeDownloadLink = document.createElement('a')
        resumeDownloadLink.href = 'data:text/html;charset=utf-8,' + encodeURIComponent(resumeOutput)
        resumeDownloadLink.download = finalUniqueURL;  //^ recheck
        resumeDownloadLink.textContent = 'Export Your Resume';

      const resumeOutputElement = document.getElementById("resumeOutput");
      if (resumeOutputElement) {
        resumeOutputElement.innerHTML = resumeOutput;
        makeEditable();


        //* resume download link section
        resumeOutputElement.appendChild(resumeDownloadLink)

        resumeOutputElement.style.display = "block"
      }
    } else {
      console.error("one or more output elements are missing ");
    }
  });

//* MAKING EDITABLE FUNCTION

function makeEditable() {
  const editableElement = document.querySelectorAll(".editable");
  editableElement.forEach((element) => {
    element.addEventListener("click", function () {
      const currentElement = element as HTMLElement;
      const currentValue = currentElement.textContent || "";

      //* CONDITION FOR REPLACE CONTENT

      if (currentElement.tagName === "p" || currentElement.tagName === "SPAN") {
        const input = document.createElement("input");
        input.type = "text";
        input.value = currentValue;
        input.classList.add("editing-input");

        input.addEventListener("blur", function () {
          currentElement.textContent = input.value;
          currentElement.style.display = "inline";
          input.remove();
        });

        currentElement.style.display = "none";
        currentElement.parentNode?.insertBefore(input, currentElement);
        input.focus;
      }
    });
  });
}
