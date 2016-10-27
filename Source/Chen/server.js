var express = require('express');
var app = express();
var request = require('request');

app.get(
    '/Dog',
    function(req, res) {
        var result = {
            'WikiInfo': [],
            'FlickrImageUri': []
        };
        
        request(
            "https://en.wikipedia.org/w/api.php?action=query&titles=" + "Dog" + "&redirects=true&prop=extracts&exintro=true&explaintext=true&format=json&callback=?",
            function(error, response, body) {
                if (error) {
                    return console.log('Error:', error);
                }
                if (response.statusCode !== 200) {
                    return console.log('Invalid Status Code Returned:', response.statusCode);
                }
                body = body.substring(5);
                body = body.substring(0, body.length - 1);
                body = JSON.parse(body);
                var ven = body.query.pages;
                for (key in ven) {
                    result.WikiInfo.push(
                        {
                            'intro': ven[key]["extract"]
                        }
                    );
                }
            }
        );
        
        request(
            "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=2ec2303f2f851adc69d5d238f3b76e41&per_page=1&tags=dog&accuracy=1&sort=relevance&extras=url_l&format=json&nojsoncallback=1",
            function(error2, response2, body2) {
                if (error2) {
                    return console.log('Error:', error2);
                }
                if (response2.statusCode !== 200) {
                    return console.log('Invalid Status Code Returned:', response2.statusCode);
                }
                body2 = JSON.parse(body2);
                var imageUri = body2.photos.photo[0].url_l;
                result.FlickrImageUri.push(
                    {
                        'uri': imageUri
                    }
                );
                res.contentType('application/json');
                res.write(JSON.stringify(result));
                res.end();
            }
        );
    }
);

var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port);
});
