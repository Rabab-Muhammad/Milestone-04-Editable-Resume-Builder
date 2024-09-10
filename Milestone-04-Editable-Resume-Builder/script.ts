
document.getElementById('resumeForm')?.addEventListener('submit',function(event) {
    event.preventDefault();

const profilePictureInput = document.getElementById('profilePicture') as HTMLInputElement

const nameElement = document.getElementById('name') as HTMLInputElement;
const emailElement = document.getElementById('email') as HTMLInputElement;
const contactElement = document.getElementById('contact') as HTMLInputElement;
const educationElement = document.getElementById('education') as HTMLInputElement;
const experienceElement = document.getElementById('experience') as HTMLInputElement;
const skillsElement = document.getElementById('skills') as HTMLInputElement;


if(profilePictureInput && nameElement && emailElement && contactElement && educationElement && experienceElement && skillsElement){
    const name = nameElement.value;
    const email = emailElement.value;
    const contact = contactElement.value;
    const education = educationElement.value;
    const experience = experienceElement.value;
    const skills = skillsElement.value

    const profilePictureFile = profilePictureInput.files?.[0]
    const profilePictureURL = profilePictureFile?URL.createObjectURL(profilePictureFile): "";


const resumeOutput =`
    <h2>Resume</h2>
    ${profilePictureFile? `<img src="${profilePictureURL}" alt ="Profile Picture" class="profilePicture">`: ''}
    <p><strong>Name:</strong> <span id="edit-name" class="editable"> ${name} </span></p>
    <p><strong>Email:</strong> <span id="edit-email" class="editable"> ${email} </span></p>
    <p><strong>Contact:</strong> <span id="edit-contact" class="editable"> ${contact} </span></p>

    <h3>Education</h3>
    <p id="edit-education" class="editable">${education}</p>

    <h3>Experience</h3>
    <p id="edit-experience" class="editable">${experience}</p>

    <h3>Skills</h3>
    <p id="edit-skills" class="editable">${skills}</p>
`;

const resumeOutputElement = document.getElementById('resumeOutput')
if(resumeOutputElement){
    resumeOutputElement.innerHTML = resumeOutput
    initializeEditable();
}
}else{
    console.error('one or more output elements are missing')
}
});

function initializeEditable(){
    const editableElement = document.querySelectorAll('.editable');
    editableElement.forEach(element => {
        element.addEventListener('click',function(){
            const currentElement = element as HTMLElement;
            const currentValue = currentElement.textContent || "" ;

            if(currentElement.tagName === "P" || currentElement.tagName === 'SPAN'){
                const input = document.createElement('input')
                input.type = "text"
                input.value = currentValue
                input.classList.add('editing-input')

                input.addEventListener('blur',function(){
                    currentElement.textContent = input.value;
                    currentElement.style.display = 'inline'
                    input.remove()
                })
                
                currentElement.style.display = 'none'
                currentElement.parentNode?.insertBefore(input, currentElement)
                input.focus()
            }
        })
    })
}