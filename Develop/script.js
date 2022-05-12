//remove before submitting, this hides the header because it takes up so much damn space while testing
$("header").toggle(false);


function createTimeBlock(counter){
    $(".container").append("<div class='row time-block' id='time-slot-" + counter + "'" + "></div>");
    $("#time-slot-"+counter).append("<div class='hour col-1'></div>");
    $("#time-slot-"+counter).append("<div class='textarea future col-10'></div>");
    $("#time-slot-"+counter).append("<div class='saveBtn col-1'><i class='fas fa-save'></i></div>")
}


function generateTimeBlocks(slots) {
    i = slots
    for (i = 0; i < 5; i++) {
        var counterClock = i;
        createTimeBlock(i);
    }
}

