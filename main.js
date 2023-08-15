const body = document.getElementById('body');
const changeThemeBtn = document.getElementById('change-theme')
const input = document.getElementById('input')
const container = document.getElementById('container')
const listBox  = document.getElementById('list-box')
const itemCounter  = document.getElementById('item-counter')
const compeleteBtn  = document.getElementById('completed')
const clearCompleted  = document.getElementById('clearCompleted')
const allBtn  = document.getElementById('all')
const activebth  = document.getElementById('active')

// const dragArea = document.querySelector('.list-box')




new Sortable(container, {
  animation: 150, // Animation duration in milliseconds
  handle: ".list-box", // The handle to grab and drag the items
  ghostClass: "dragged-over", // Class for the ghost element when dragging
 
  
});

// following are the varables
var lists = [];

var useLesList= [];
var secondUselesslist = [];



let _counter = 0;
let _counterText = ' Item left'
var textColor = 'blue'





// the followring are the functions


changeThemeBtn.onclick = function(){ //this is to change the theme
 
    body.classList.toggle('dark')
    if(changeThemeBtn.src.includes('moon')){
        changeThemeBtn.src = 'images/icon-sun.svg'
       
    }else{
        changeThemeBtn.src = 'images/icon-moon.svg' 
        
    }
    
}


  function addtask() { //this adds the item to list it uses update
    const taskText = input.value.trim();
    if (taskText !== "") {
      lists.push([taskText,false])
      useLesList.push([taskText,false])
      secondUselesslist.push([taskText,false])
      lists.reverse()
      input.value = "";
    }
    update()
  };


 function update( ) { //this updates the item
  container.innerHTML = '';
  lists.forEach((tasktexts, indexx) =>{
    const taskDiv = document.createElement("div");
    taskDiv.classList.add('list-box')
    taskDiv.classList.add('pointer')
    // taskDiv.id = 'list-box';
    // taskDiv.setAttribute('draggable','true')
    console.log(taskDiv)
    

    
    taskDiv.innerHTML = '<div> <div id="tick-box" class="circles"><div index= " '+ indexx+ '" id="tick" class="tick active "><img src="images/icon-check.svg" alt=""></div></div> <p isDone="' +tasktexts[1]+ '"  class="paragraph ">'+tasktexts[0]+'</p> </div> <div><img class="remove" src="images/delete-button-svgrepo-com.svg" alt="" data-index="' +indexx+ '"></div>    '
    container.appendChild(taskDiv);
    input.value = "";
    



    const deleteButton = taskDiv.querySelector(".remove");
    deleteButton.addEventListener("click", createDeleteTaskHandler(indexx));
  })


   _counter = lists.length ;
   itemCounter.textContent = _counter + _counterText
 
   const ticks = document.querySelectorAll(".circles");
   const para = document.querySelectorAll(".paragraph");

   ticks.forEach((tick,index)=>{   
      tick.addEventListener('click',()=>{
         tick.firstChild.classList.toggle('active')
         
           if(lists[index][1] == true && useLesList[index][1] == true && secondUselesslist[index][1] == true) {
              lists[index][1] = false;
              useLesList[index][1] = false; 
              secondUselesslist[index][1] = false; 
              para[index].style.color= '';
              para[index].style.textDecoration = 'none'
           }
               else{
                  lists[index][1] = true; 
                  useLesList[index][1] = true; 
                  secondUselesslist[index][1] = true; 
                  para[index].style.color= 'grey'
                  para[index].style.textDecoration = 'line-through'
                  }
                })


            if(lists[index][1] == true && useLesList[index][1] == true && secondUselesslist[index][1] == true){
                tick.firstChild.classList.remove('active')
                para[index].style.color= 'grey'
                para[index].style.textDecoration = 'line-through'
          

             } 
            else{
              tick.firstChild.classList.add('active')
              para[index].style.color= '';
              para[index].style.textDecoration = 'none'
             }
          })
         


          
          
       
          
 }


  function createDeleteTaskHandler(index) { //this is to delete
    return function() {
      
      lists.splice(index, 1);
      useLesList.splice(index, 1);
      secondUselesslist.splice(index, 1);
      update();
    };
  }


  input.addEventListener("keydown", function(event) { //this runs when we press the enter button
    if (event.key === "Enter" || event.keyCode === 13) {
        addtask();
    }
  });


  clearCompleted.onclick = ()=>{ //this clears all the completed tasks

    
    for (let j = 0; j < lists.length +2 ; j++){
       for(i in lists){
            if(lists[i][1] == true){
                 lists.splice(i ,1)
                 update()
                
      }
     
    }
  } 


  for (let j = 0; j < useLesList.length +2 ; j++){
    for(i in useLesList){
         if(useLesList[i][1] == true){
          useLesList.splice(i ,1)
          update()
            
   }
  
 }
} 



for (let j = 0; j < secondUselesslist.length +2 ; j++){
  for(i in secondUselesslist){
       if(secondUselesslist[i][1] == true){
        secondUselesslist.splice(i ,1)
        update()
           
 }
}

} 

}








let completedTasks = []
let activeTask = []
compeleteBtn.addEventListener("click", () => {
  completedTasks = useLesList.filter(task => task[1] === true);
                
                _counterText = ' Completed Item'
              
                compeleteBtn.style.color = textColor;
                activebth.style.color = '';
                allBtn.style.color = '';
                lists = completedTasks;
             
                isAll = true
                update()
             
              
          });







let isAll = false
allBtn.style.color = textColor
allBtn.addEventListener('click', ()=>{

   if(isAll== true){
    _counterText = ' Item left'
    compeleteBtn.style.color = '';
    allBtn.style.color = textColor
    activebth.style.color = '';
    
    lists = activeTask.concat(completedTasks);
   
    
    
   
     isAll = false;
     update()
   
    
    return;


    
   }
   
}
)


activebth.addEventListener('click',()=>{
  activeTask = useLesList.filter(task => task[1] === false);
 
  _counterText = ' Active Item'
  lists = activeTask;
  activebth.style.color = textColor;
  allBtn.style.color = ''
  compeleteBtn.style.color = '';
 

  
  isAll = true;
  update()
})







        


              
