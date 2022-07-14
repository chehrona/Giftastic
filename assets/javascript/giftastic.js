$(document).ready(function () {
    let generatesButtons = function () {
        let topic = $("#field").val();
        let topicButton = $("<button class='buttons'></button>");
        topicButton.html(topic);
        $("#recent").append(topicButton);
    }
    $("#icon").on("click", function () {
        generatesButtons();
    });

    $("#field").keypress(function (e) {
        if (e.keyCode == "13") {
            generatesButtons();
        }
    });

    $("#recent").on("click", ".buttons", function(e) {
        e.preventDefault();
        let topicName = $(".buttons").html();
        console.log(topicName)
        let queryURL = "https://api.giphy.com/v1/gifs/search?api_key=UUSaDH41ckMZMAeSwLYQNmBtdqSDj9lZ&q=" + topicName + "&limit=&offset=&rating=g&lang=en";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
        })
    });

})