$(document).ready(function () {
    var time = moment();
    console.log(time)

    
    $(function () {
        $('[data-toggle="popover"]').popover()
      })
      
    // date and time in header, time is on interval so it displays live time
    var datehead = $("<h5>").text(time.format("dddd, MMMM Do YYYY"));
    $("#thetime").append(datehead);

    var timehead = $("<h6>").text(time.format("h:mm:ss a"));
    timehead.attr('id', 'theclock');
    $("#thetime").append(timehead);

    function clockTick() {
        time = moment();
        $("#theclock").text(time.format("h:mm:ss a"));
    }

    clockTick();
    setInterval(clockTick, 1000);


    //colorchange mechanism for past, present and future time blocks
    function colorchange() {
        time = moment();
        timePlus = moment().add(1, "H");
        var compareTime = (time.format("H"));
        var comparePlus = (timePlus.format("H"))

        $(".timeblock").each(function () {
            if ($(this).data("time") == compareTime) {
                $(this).addClass("presentColor");
            }
            else if ($(this).data("time") == comparePlus) {
                $(this).addClass("imminentColor");
            }
            else if ($(this).data("time") > comparePlus) {
                $(this).addClass("futureColor");
            }
            else {
                $(this).addClass("pastColor");
            }
        });
    };
    colorchange();

    
    $(".timeblock").each(function () {
        let blockNumber = $(this).data("time");
        let count = 0;
        let thisHour = $(".theHour" + blockNumber).text();

        for (i = 0; i < 4; i++) {
            let compareTime = (time.format("H"));
            count++;
            let storedTask = localStorage.getItem(blockNumber + "event" + count);
            if (storedTask == null ) {
                return; 
            }
            else 
            storedTask = (storedTask) ? JSON.parse(storedTask) : {};
            let left = "#leftUl" + blockNumber;
            let right = "#rightUl" + blockNumber;
            let leftCount = $(left).children().length;
            let rightCount = $(right).children().length;
            let displayTask = $("<li></li>")
            displayTask.text(storedTask.task)
            if (rightCount >= 2) {
                return;
            } else if (leftCount >= 2) {
                $(right).append(displayTask);
            } else {
                $(left).append(displayTask)
            }
            
            if ( blockNumber == compareTime) {
            $(".thisHour").text(thisHour);    
            $("#displayEvent" + count).text(storedTask.task)
            $("#exactTime" + count).text(storedTask.exactTime)
            $("#displayDetails" + count).text(storedTask.details)
            }
        }

        
        

    });


    $(".addEvent").click(function () {
        let eventTime = ($(this).data("time"));
        let thisData = JSON.stringify(eventTime);
        let timeBlock = $(this).parent().parent(); 
        let blockData = ($(timeBlock.data("time")));
        console.log(blockData)

        $("#submit").one('click', function () {
            let task = $("#eventName").val();
            let exactTime = $("#exactTime").val();
            let details = $("#details").val();
            let left = "#leftUl" + thisData;
            let right = "#rightUl" + thisData;
            let leftCount = $(left).children().length;
            let rightCount = $(right).children().length;
            let displayTask = $("<li></li>")
            displayTask.text(task)
            if (rightCount >= 2) {
                alert("Your too busy this hour...")
            } else if (leftCount >= 2) {
                $(right).append(displayTask);
            } else {
                $(left).append(displayTask)
            }
            
            
            let count = $(timeBlock).find('li').length
            displayTask.attr('id', thisData + "li" + count);
            let storage = {
                'task': task,
                'exactTime': exactTime,
                'details': details
            }
            
            localStorage.setItem(thisData + ("event") + count, JSON.stringify(storage));
            $("#eventName").val("");
            $("#exactTime").val("");
            $("#details").val("");
            $('#eventEnterModal').modal('toggle');
            
        });
        
        
    });

    $("#9li1").click(function () {
        $(this).editable({
            url: '/post',
            type: 'text',
            title: 'Enter username',
            success: function (response, newValue) {
                userModel.set('username', newValue);
                confirm.log(response) 
            }
        });
    });


});