//remove before submitting, this hides the header because it takes up so much damn space while testing
// $("header").toggle(false);

var todayDate = moment().format("dddd, MMMM Do");
$("#currentDay").text(todayDate) //sets the header text to display the current date

/*I set these as global variables in case further development needed to change
what business hours are */
var startOfWorkDay = 9;
var endOfWordDay = 17;
var workDayHours = (endOfWordDay-startOfWorkDay)+1;

//this adds the planner sections to the DOM
function createTimeBlock(counter){
    let writeTime = counter+startOfWorkDay; //take loop counter and convert to us as the start of the businessday
    let writeTimeParse = moment(writeTime,"h").format("h A");
    $(".container").append("<div class='row time-block' id='time-slot-" + counter + "'" + "></div>");
    $("#time-slot-"+counter).append("<div " + "class='hour col-1'>" + writeTimeParse +"</div>");
    $("#time-slot-"+counter).append("<div "+"class='textarea col-10' " + "data-hour ='"+ writeTime +"'></div>");
    $("#time-slot-"+counter).append("<div class='saveBtn col-1'><i class='fas fa-save'></i></div>")
}

//Run the createTimeBlock function as many hours needed for a business day
function generateTimeBlocks(num) {
    for (i = 0; i < num; i++) {
        createTimeBlock(i);
    }}

generateTimeBlocks(workDayHours);

//this checks the current hour and changes the styling of each planner line if it is past,present or future
function checkTime(){
    var currentHour = moment().hour()
    // currentHour = 21; // this is here for testing different times manually
    var timeBlocks = document.querySelectorAll('div.textarea') //grabs all the centerboxes of the planner
    for (let i=0;i<timeBlocks.length;i++){
        var currentBlock = timeBlocks[i].dataset.hour
        console.log(currentBlock)
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
