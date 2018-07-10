$(function () {
    var animals = ["dog", "cat", "frog", "horse", "cow", "moose", "bird", "skunk", "fish", "turtle", "molerat", "gopher", "hamster"]


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
        var queryUrl = "https://api.giphy.com/v1/gifs/search?q="
            + animal
            + "&api_key="
            + key
            + "+&limit=10"
            $.ajax({
                url: queryUrl,
                method: "GET"
              }).then(function(response){
                  $("#gifArea").append(response)
              })
    }


    renderButton();

    $("#animalInput").on("click", function addAnimal() {
        event.preventDefault();
        var animal = $("#userInput").val()
        animals.push(animal)
        $("#buttonArea").html("")
        renderButton();
    })

    $(document).on("click",".animal",getGifs)



})