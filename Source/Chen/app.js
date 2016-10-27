$(document).ready(
    function() {
        $.getJSON(
            "http://127.0.0.1:8081/Dog",
            function(response) {
                var intro = response["WikiInfo"][0]["intro"];
                var imageUri = response["FlickrImageUri"][0]["uri"];
                
                $("#result").replaceWith(
                    "<div id = 'result'>" +
                    "<img src='" +
                    imageUri +
                    "' style = \"padding-left:1em;padding-top:1em;\">" +
                    "<p style = \"font-size:1.5em;padding-left:1em;padding-top:2em;padding-bottom:1em;\"><b><u>Dog</u></b></p>" +
                    "<p align='justify' style = \"padding-left:1em;padding-right:1em;\">" +
                    intro +
                    "</p>" +
                    "</div>"
                );
            }
        );
    }
);