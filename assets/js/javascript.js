$(function () {
    var animals = ["dog", "cat", "frog", "horse", "cow", "moose", "bird", "skunk", "fish", "turtle", "molerat", "gopher", "hamster"]
    var gifPlaying = true;

    function renderButton() {
        animals.forEach(function makeButton(animal) {
            name = animal;
            var $button = $("<button>")
                .addClass("animal")
                .attr("data-name", animal)
                .text(animal);
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
            + "&limit=10"
        $.ajax({
            url: queryUrl,
            method: "GET"
        }).then(function (response) {
            console.log(response)

            $("#gifArea").html("")
            response.data.forEach(function (gif) {
                var still = gif.images.fixed_height_still.url
                var gif = gif.images.fixed_height.url
                $("#gifArea").append("<img class='gifImage' src='" + still + "' "
                    + " data-still='" + still + "' "
                    + " data-animate='" + gif + "' "
                    + " data-state='still'>")
            })

        })
    }

    $(".gifImage").on('click', function controlGif() {
    })


    $("#animalInput").on("click", function addAnimal() {
        event.preventDefault();
        var animal = $("#userInput").val()
        animals.push(animal)
        $("#buttonArea").html("")
        renderButton();
        $("#userInput").val("")
    })

    renderButton();

    $(document).on("click", ".animal", getGifs)



})