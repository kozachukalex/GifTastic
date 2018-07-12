$(function () {
    var topics = ["dog", "ocean", "Futurama", "MTV", "Movie", "hockey", "food", "beer", "bulldog", "car", "flowers", "books"]
    var currentTopic = ""
    var numberOfImages = 10
    function renderButton() {
        topics.forEach(function makeButton(topic) {
            var $button = $("<button>")
                .addClass("topic")
                .attr("data-name", topic)
                .text(topic);
            $("#buttonArea").append($button)
        })
    }

    function getGifs() {
        var topic = $(this).attr("data-name")

        var key = "A6kZfOeAwflSh4Truw4K2V9NVzhxJIfw"
        var queryUrl = "http://api.giphy.com/v1/gifs/search?q="
            + topic
            + "&api_key="
            + key
            + "&limit="
            + numberOfImages
        $.ajax({
            url: queryUrl,
            method: "GET"
        }).then(function (response) {
            $("#gifArea").html("")
            response.data.forEach(function (gif) {
                var still = gif.images.fixed_height_still.url
                var giphy = gif.images.fixed_height.url
                var rating = gif.rating
                var title = gif.title
                title = title.replace("GIF", "")
                rating = rating.toUpperCase()
                var $gifBox = $("<div class='gifBox'>")
                $gifBox.append("<img class='gifImage' src='" + still + "' "
                    + " data-still='" + still + "' "
                    + " data-animate='" + giphy + "' "
                    + " data-state='still'>")
                    .append("<p> Title: " + title)
                    .append("<p> Rated: " + rating);
                $("#gifArea").append($gifBox)
            })

        })
        $("#getButtonHere").html("") //preventing multiple getButtons from appearing
        var getButton = $("<button>")
        getButton.attr("data-name", userTopic) //allows the api to call more gifs based on current topic. Avoids issue of (this) of getGifs()
            .html("Get More Gifs")
        $("#getButtonHere").append(getButton)
    }

    $(document).on('click', ".gifImage", function controlGif() {
        var still = $(this).attr("data-still")
        var animate = $(this).attr("data-animate")
        var state = $(this).attr("data-state")
        if (state === "still") {
            $(this).attr('src', animate)
                .attr("data-state", "animate")
                .css("border-color", "yellow")

        }
        else {
            $(this).attr('src', still)
                .attr("data-state", "still")
                .css("border-color", "black")
        }
    })

    $(document).on("click", "#getMoreGifs", function add() {
        numberOfImages += numberOfImages;
        console.log(numberOfImages)
    })

    $(document).on("click", "#getMoreGifs", getGifs)

    $("#topicInput").on("click", function addTopic() {
        event.preventDefault();
        var userTopic = $("#userInput").val()
        if (userTopic === "") {
            //prevents adding empty buttons
        } else {
            topics.push(userTopic)
            $("#buttonArea").html("")
            renderButton();
            $("#userInput").val("")
        }
    })

    $(document).on("click", ".topic", getGifs)

    renderButton();



})