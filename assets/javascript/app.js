$(document).ready(function () {
    consoleLog(moment().format('MMMM Do YYYY, h:mm:ss a')+" | This stylesheet is obviously a parody");
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyCaSM_rUIdz5YcjlBo0xvUq4v3FUXrULaY",
        authDomain: "trainschedule-d6fed.firebaseapp.com",
        databaseURL: "https://trainschedule-d6fed.firebaseio.com",
        projectId: "trainschedule-d6fed",
        storageBucket: "trainschedule-d6fed.appspot.com",
        messagingSenderId: "1087967563326"
    };
    firebase.initializeApp(config);
    var database = firebase.database();
    //////////////////////////////////////////////////////////
    function consoleLog(textorvar) {
        console.log(`%c
        ███████╗██╗   ██╗██████╗ ██████╗    ███╗   ███╗███████╗███╗   ███╗███████╗  
        ██╔════╝██║   ██║██╔══██╗██╔══██╗   ████╗ ████║██╔════╝████╗ ████║██╔════╝  
        ███████╗██║   ██║██████╔╝██████╔╝   ██╔████╔██║█████╗  ██╔████╔██║█████╗    
        ╚════██║██║   ██║██╔═══╝ ██╔══██╗   ██║╚██╔╝██║██╔══╝  ██║╚██╔╝██║██╔══╝    
        ███████║╚██████╔╝██║     ██║  ██║   ██║ ╚═╝ ██║███████╗██║ ╚═╝ ██║███████╗  
        ╚══════╝ ╚═════╝ ╚═╝     ╚═╝  ╚═╝   ╚═╝     ╚═╝╚══════╝╚═╝     ╚═╝╚══════╝         
        `, 'background: #c20000; color: #fff');
        console.log(textorvar);
    }
    ///////////////////////////////////////////////////////////
    var table = $("#tableFill");
    var empty = $(".empty");
    $("#buttonInput").on("click", function (e) {
        e.preventDefault();
        var firstTrainTime = $("#trainNameInput").val().trim();
        var trainDestination = $("#destinationInput").val().trim();
        var timeMoment = moment($("#firstTrainTimeInput").val().trim(), "HH:mm A").format("hh:mm A");
        var trainFrequency = Number($("#frequencyInput").val().trim());
        var dummyVars = { nameOfTrain: firstTrainTime, destination: trainDestination, trainTime: timeMoment, frequency: trainFrequency }
        database.ref().push(dummyVars);
       // Clears input fields
       $("#trainNameInput").val("");
       $("#destinationInput").val("");
       $("#frequencyInput").val("");
       $("#firstTrainTimeInput").val("");
    });
       function generateToTable() {
        database.ref().on("child_added", function (snap) {

            var firstTrainTime = snap.val().nameOfTrain;
            var trainDestination = snap.val().destination;
            var trainTime = snap.val().trainTime;
            var trainFrequency = snap.val().frequency;
            var frequencyInput = trainFrequency;
            var firstTime = trainTime;
            var firstTimeFix = moment(firstTime, "h:mm A").subtract(10, "years");
            var currenttime = moment();
            var timeDifference = moment().diff(moment(firstTimeFix), "minutes");
            var timeRemaining = timeDifference % frequencyInput;
            var minutesRemaining = frequencyInput - timeRemaining;
            var dummyVars = moment().add(minutesRemaining, "minutes").format("h:mm A");
            table.append("<tr class='empty'><th>" + firstTrainTime + "</th><th>" + trainDestination + "</th><th>" + trainFrequency + "</th><th>" + dummyVars + "</th><th>" + minutesRemaining + "</th>")
        });
    }
         table.empty();
    generateToTable();

        /***
         *   ██╗             ██╗          ██╗             ██╗
         *     ██╔          ██╔╝          ╚██╗           ██╔╝
         *       ██╔        ██║ ████╗████╗ ██║          ██╔╝ 
         *         ██╔      ██║ ╚═══╝╚═══╝ ██║         ██╔╝  
         *          ███████╗╚██╗ ███████╗ ██╔╝███████╗██╔╝   
         *          ╚══════╝ ╚═╝ ╚══════╝ ╚═╝ ╚══════╝╚═╝    
         *     Hey person reading this code. Heres an ascii guy.                        
         */

    });
