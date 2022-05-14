//---This grabs and sets the header date
var todayDate = moment().format("dddd, MMMM Do");
$("#currentDay").text(todayDate) 


//---These are global variables in case further development needs to change what business hours are---//
var startOfWorkDay = 9;
var endOfWordDay = 17;
var workDayHours = (endOfWordDay-startOfWorkDay)+1;

//---this adds the planner sections to the DOM---//
function createTimeBlock(counter){
    let writeTime = counter+startOfWorkDay; //take loop counter and convert to us as the start of the businessday
    let writeTimeParse = moment(writeTime,"h").format("h A");
    $(".container").append("<div class='row time-block' id='time-slot-" + counter + "'" + "></div>");
    $("#time-slot-"+counter).append("<div " + "class='hour col-1'>" + writeTimeParse +"</div>");
    $("#time-slot-"+counter).append("<div "+"class='textarea col-10 text-box-" + counter +"' " + "data-hour ='"+ writeTime +"'></div>");
    $("#time-slot-"+counter).append("<div class='save-box-" + counter + " saveBtn col-1'" + "data-hour ='"+ writeTime +"'><i class='fas fa-save mt-4'></i></div>")
}

function generateTimeBlocks(num) {
    for (i = 0; i < num; i++) {
        createTimeBlock(i);
    }}

generateTimeBlocks(workDayHours);

//---this checks the current hour and changes the styling of each planner line if it is past,present or future
function checkTime(){
    var currentHour = moment().hour()
    var timeBlocks = document.querySelectorAll('div.textarea') //grabs all the centerboxes of the planner
    for (let i=0;i<timeBlocks.length;i++){
        var currentBlock = timeBlocks[i].dataset.hour
        if(currentBlock > currentHour){
            timeBlocks[i].classList.add("future");
        }
        else if(currentBlock < currentHour){
            timeBlocks[i].classList.add("past");
        }
        else{timeBlocks[i].classList.add("present")}
}}

checkTime(); //initial time check
setInterval(checkTime,1217) //check the current time every 1.217 seconds and


//---Edit and Save Tasks in Planner---//
//EventListener for description box
$(document).on("click", ".textarea",editTask)

//function for adding input to timeslot description
function editTask(){
var borrowedClasses = $(this).attr('class')
var currentText = $(this).text()
if($(this).is(':empty')){
    $(this).append('<textarea class="'+ borrowedClasses + '" type:text></textarea>')
    $('textarea').focus()
}
else if (currentText){
    $(this).empty()
    $(this).append('<textarea class="'+ borrowedClasses + '" type:text>'+ currentText + '</textarea>')
    $('textarea').focus()
}
else{return}
}
//Event Listener for Save Buton
$(document).on("click", ".saveBtn",saveTask)

//Save button function (including write to LocalStorage)
function saveTask(){
    var saveBoxClasses = $(this).attr('class').split(" ")
    var saveBoxNumber = parseInt(saveBoxClasses[0].substr(9))
    var neighborTextArea = "textarea.text-box-"+saveBoxNumber
    var neighborDescription = "div.text-box-"+saveBoxNumber
    var adjText = $(neighborTextArea).val()
    if(!adjText){return}
    $(neighborDescription).text(adjText)
    localStorage.setItem("line-save-"+saveBoxNumber,adjText + " day:" + moment().format("YYYYMMDD"))
}

//---load local storage on page ready---//
$(document).ready(readLocalStorage)
function readLocalStorage(){
    for(i=0;i<24;i++){
        var pull = localStorage.getItem('line-save-'+i)
        if(pull){
            var saveDate = pull.split("day:");
            var todayDate = moment().format("YYYYMMDD");
            if(saveDate[1] === todayDate){
            $("div.text-box-"+i).text(saveDate[0])}
            else{localStorage.removeItem('line-save-'+i)}
        }
    }
}
