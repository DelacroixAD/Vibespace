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