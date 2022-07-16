$(document).ready(function () {
    let generatesButtons = function (itemName) {
        let topicButton = $("<button class='buttons' id='" + itemName + "'></button>");
        topicButton.html(itemName.charAt(0).toUpperCase() + itemName.slice(1));
        $("#recent").append(topicButton);
    }

    let topicsArr = ["antibiotic", "experiment", "cell", "photosynthesis", "chemical reaction", "copper", "DNA", "element", "anatomy", "brain", "bacteria", "muscles"];
    // let topic = $("#field").val().toLowerCase();
    for (let i = 0; i < topicsArr.length; i++) {
        topic = topicsArr[i];
        generatesButtons(topic);
    }

    $("#field").on("focus", function () {
        $("#searchIcon").removeClass("fa-beat-fade");
    });

    $("#field").on("blur", function () {
        $("#searchIcon").addClass("fa-beat-fade");
    });


    $("#searchIcon").on("click", function () {
        topic = $("#field").val().toLowerCase();
        if (topicsArr.indexOf(topic) !== -1) {
            $("#" + topic).css({"background-color" : "green", "color": "white", "box-shadow": "3px 3px lightgrey"})
            setTimeout(function () {
                $("#" + topic).css({"background-color" : "#c7ee97", "color": "black", "box-shadow": "2px 2px darkseagreen"})}, 1500);
        } else {
            topicsArr.push(topic);
            generatesButtons(topic);
        }
    });

    $("#field").keypress(function (e) {
        topic = $("#field").val().toLowerCase();
        if (e.keyCode == "13") {
            if (topicsArr.indexOf(topic) !== -1) {
                $("#" + topic).css({"background-color" : "green", "color": "white", "box-shadow": "3px 3px lightgrey"})
                setTimeout(function () {
                    $("#" + topic).css({"background-color" : "#c7ee97", "color": "black", "box-shadow" : "2px 2px darkseagreen"})}, 1500);
            } else {
                topicsArr.push(topic);
                generatesButtons(topic);
            }
        }
    });

    // let gifStatus = "static";
    // let idObj = {};

    $("#recent").on("click", ".buttons", function(e) {
        e.preventDefault();
        let topicName = $(this).text().toLowerCase();
        let queryURL = "https://api.giphy.com/v1/gifs/search?api_key=UUSaDH41ckMZMAeSwLYQNmBtdqSDj9lZ&q=" + topicName + "&limit=10&offset=&rating=g&lang=en";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            for (let i = 0; i < 10; i++) {
                // idObj[response.data[i].id] = i;
        
                let gifImage = $("<img class='image static' data-gif='" + response.data[i].images.original.url + "' data-still='" + response.data[i].images.original_still.url + "' src='" + response.data[i].images.original_still.url + "'>");
                let imageBox = $("<div class='imageBox'></div>");
                let downloadIcon = $("<i class='fa-solid fa-arrow-down icons'></i>");
                let heartIcon = $("<i class='fa-regular fa-heart icons'></i>");
                let rating = $("<p id='rating'> Rating: " + response.data[i].rating + "</p>");
                
                $(imageBox).append(gifImage);
                $(imageBox).append(downloadIcon);
                $(imageBox).append(heartIcon);
                $(imageBox).append(rating);
                $("#page").append(imageBox);
            

            gifImage.on("click", function(e) {
                e.preventDefault();
                let animatedGif = $(this).attr("data-gif");
                let stillImage = $(this).attr("data-still");
                if ($(this).hasClass("static")) {
                    $(this).removeClass("static");
                    $(this).addClass("animated");
                    $(this).attr("src", animatedGif);
                } else {
                    $(this).removeClass("animated");
                    $(this).addClass("static");
                    $(this).attr("src", stillImage);
                }
            })
        }
        })
    
    })

})