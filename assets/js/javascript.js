$(function () {
    var animals = ["dog", "cat", "frog", "horse", "cow", "bird", "skunk", "fish", "turtle", "molerat", "gopher", "hamster"]
    var currentTopic = ""
    var numberOfImages = 10
    function renderButton() {
        animals.forEach(function makeButton(animal) {
            name = animal;
            var $button = $("<button>")
                .addClass("animal")
                .attr("data-name", name)
                .text(name);
            $("#buttonArea").append($button)
        })
    }

    function getGifs() {
        var animal = $(this).attr("data-name")

        var key = "A6kZfOeAwflSh4Truw4K2V9NVzhxJIfw"
        var queryUrl = "http://api.giphy.com/v1/gifs/search?q="
            + animal
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
        getButton.attr("data-name", animal) //allows the api to call more gifs based on current topic. Avoids issue of (this) of getGifs()
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

    $("#animalInput").on("click", function addAnimal() {
        event.preventDefault();
        var animal = $("#userInput").val()
        if (animal === "") {
            //prevents adding empty buttons
        } else {
            animals.push(animal)
            $("#buttonArea").html("")
            renderButton();
            $("#userInput").val("")
        }
    })

    $(document).on("click", ".animal", getGifs)

    renderButton();



})