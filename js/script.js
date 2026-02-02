function openFeatures(){
var allElems=document.querySelectorAll(".elem")
var fullElemPage=document.querySelectorAll('.fullElem')
var fullElemPageBackBtn=document.querySelectorAll('.fullElem .back')

allElems.forEach(function(elem){           //targets all elem 
    elem.addEventListener("click",function(){
        fullElemPage[elem.id].style.display="block";  //jump to task
    })
}) 

fullElemPageBackBtn.forEach(function(back){
    back.addEventListener('click',function(){
        fullElemPage[back.id].style.display= "none";
    })
})
}
openFeatures()

let form = document.querySelectorAll('.addtask form')  
let taskInput=document.querySelectorAll(".addTask from task-input")
let taskDetailsInput=document.querySelectorAll('.addTask from Textarea')
let taskCheckbox= document.querySelectorAll('.addTask form #check')

form.addEventListener('submit',function(e){
    e.preventDefault()   // as forms reload the page so to prevent this action we write prevent default function of the form 
    console.log(taskInput.value);
    console.log(taskDetailsInput.value); 
    console.log(taskCheckbox.checked);
})