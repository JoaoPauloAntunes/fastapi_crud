$(function (event) {
    const user = {
        "name": "João Paulo",
        "email": "joao@gmail.com",
        "password": "joao_pwd"
    };

    $(".btn-read").click(function (event) {
        console.log("READ");

        //************************************************************************************* */
        // READ with path params
        const email = "debora@gmail.com";

        // work!
        /* fetch(`/users/${email}`, {
            method: 'GET'
        }).then((response) => {
            return response.json().then(function (response) {
                console.log(response);
            });
        }); */

        // work!
        $.get(`/users/${email}`).done(function (data) {
            console.log(data);
        });


        //************************************************************************************* */
        // READ with query params
        const skip = 1;
        const limit = 2;

        // work!
        // doesn't work by passing data through query params
        /* fetch(`/users/`, {
            method: 'GET'
        }).then((response) => {
            return response.json().then(function (response) {
                console.log(response);
            });
        }); */

        // work!
        /* $.get(`/users/`).done(function (data) {
            console.log(data);
        }); */


        // work!
        /* $.get(`/users/`, { "skip": skip, "limit": limit }).done(function (data) {
            console.log(data);
        }); */
        

        // work!
        /* $.get(`/users/`, { "skip": skip }).done(function (data) {
            console.log(data);
        }); */

        // work!
        /* $.get(`/users/`, { "limit": limit }).done(function (data) {
            console.log(data);
        }); */
        

        ///////////////////////////////////////////////////////////////////////////////
        // Using AJAX

        // work!
        /* $.ajax({
            url: `/users/`,     // request route here
            method: 'GET',                                  // request HTTP method ("POST", "GET", "PUT" e "DELETE"?)
            dataType: 'json',                               // response data type
            success: function (data, textStatus, jqXHR) {   // function that is called if the request succeeds
                console.log(data);
                console.log(textStatus);
                console.log(jqXHR);
            },
        }); */

        // work!
        /* $.ajax({
            url: `/users/?skip=${skip}&limit=${limit}`,     // request route here
            method: 'GET',                                  // request HTTP method ("POST", "GET", "PUT" e "DELETE"?)
            dataType: 'json',                               // response data type
            success: function (data, textStatus, jqXHR) {   // function that is called if the request succeeds
                console.log(data);
                console.log(textStatus);
                console.log(jqXHR);
            },
        }); */
    });

    $(".btn-create").click(function (event) {
        console.log("CREATE");

        // work!
        /* fetch("/users/", {
            method: 'POST',
            body: JSON.stringify(user),
        }).then((response) => {
            return response.json().then(function (response) {
                console.log(response);
            });
        }); */

        // work!
        // JSON.stringify() is required! The data must be sent in String JSON format!
        /* $.post("/users/", JSON.stringify(user)).done(function (data) {
            console.log(data);
            console.log(data.email);
        }); */


        ///////////////////////////////////////////////////////////////////////////////
        // Using AJAX

        // work!
        /* $.ajax({
            url: '/users/',                                 // request route here
            method: 'POST',                                 // request HTTP method ("POST", "GET", "PUT" e "DELETE"?)
            contentType: 'application/json',                // request content type
            data: JSON.stringify(user),                     // request data
            dataType: 'json',                               // response data type
            success: function (data, textStatus, jqXHR) {   // function that is called if the request succeeds
                console.log(data);
                console.log(data.email);

                console.log(textStatus);
                console.log(jqXHR);
            },
        }); */
    });

    $(".btn-update").click(function (event) {
        console.log("UPDATE");

        const email = "laise@gmail.com";
        const new_user = {
            "id": 3,
            "name": "Carol",
            "email": "carol@gmail.com",
            "is_active": true,
            "items": []
        };

        // doesn't work! Error: "Method Not Allowed"
        /* fetch(`/users/`, {
            method: 'PUT',
            body: JSON.stringify(new_user)
        }).then((response) => {
            return response.json().then(function (response) {
                console.log(response);
            });
        }); */

        // work!
        $.put(`/users/${email}`, JSON.stringify(new_user), function (response) {
            console.log(response);
        });
    });

    $(".btn-delete").click(function (event) {
        console.log("DELETE");

        const email = "laise@gmail.com";
        // const email = "debora@gmail.com";

        // work!
        $.delete(`/users/${email}`, false, function (response) {
            console.log(response);
        });
    });

    $("form").submit(function (event) {
        event.preventDefault();

        const profilePicture = document.getElementById("profile_picture").files[0];
        console.log(profilePicture);

        var formData = new FormData();
        formData.append('profile_picture', profilePicture);

        // work!
        fetch("/users/profile_picture", {
            method: 'POST',
            body: formData,
        }).then((response) => {
            return response.json().then(function (data) {
                console.log(data);
            })
        });

        /* $.ajax({
            url: '/users/profile_picture',                  // request route here
            method: 'POST',                                 // request HTTP method ("POST", "GET", "PUT" e "DELETE"?)
            contentType: 'application/json',                // request content type
            data: JSON.stringify(profilePicture),           // request data
            dataType: 'json',                               // response data type
            success: function (data, textStatus, jqXHR) {   // function that is called if the request succeeds
                console.log(data);
                console.log(textStatus);
                console.log(jqXHR);
            },
        }); */

       /*  $.post("/users/profile_picture", JSON.stringify(profilePicture)).done(function (data) {
            console.log(data);
        }); */
 

        /*var reader = new FileReader();
        reader.onloadend = function ()
        {
            dataToBeSent = reader.result.split("base64,")[1];
            console.log(dataToBeSent);
            $.post("/users/profile_picture", { "data" : dataToBeSent });
        }
        reader.readAsDataURL(profilePicture); */


        /* console.log(profilePicture.name);
        console.log(profilePicture.size);
        console.log(profilePicture.type);

        var formData = new FormData();
        formData.append('file', profilePicture);

        var xhr = new XMLHttpRequest();

        // Open
        xhr.open("POST", "/users/profile_picture");

        // Set headers
        xhr.setRequestHeader("Cache-Control", "no-cache");
        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        xhr.setRequestHeader("Content-Type", "multipart/form-data");
        xhr.setRequestHeader("X-File-Name", profilePicture.name);
        xhr.setRequestHeader("X-File-Size", profilePicture.size);
        xhr.setRequestHeader("X-File-Type", profilePicture.type);

        // Send
        xhr.send(formData); */

        /* var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (this.status == 200) {
                console.log("ok");
            }
        }
        xhr.open("POST", "/users/profile_picture", true);
        xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        xhr.send(JSON.stringify(profilePicture)); */

        /* formData = new FormData();
        formData.append('file', profilePicture);

        $.ajax({
            url: "/users/profile_picture", // Url to which the request is send
                type: "POST", // Type of request to be send, called as method
                data: formData, // Data sent to server, a set of key/value pairs (i.e. form fields and values)
                processData:false, // To send DOMDocument or non processed data file it is set to false
                contentType: false, // The content type used when sending data to the server.
                cache: false, // To unable request pages to be cached
                success: function(data)   // A function to be called if request succeeds
                {
                    console.log(data);
                }
        }); */

        /* var formData = new FormData();
        formData.append('file', profilePicture, profilePicture.name);
        console.log(formData);

        var xhr = new XMLHttpRequest();
        xhr.open("POST", "/users/profile_picture", true);
        xhr.onload = function () {
            if (xhr.status == 200) {
                console.log("Profile picture uploaded!");
            } else {
                console.log("Profile picture don't uploaded!");
            }
        };
        xhr.send(formData); */

        /* $.ajax({
            url: "/users/profile_picture",
            type: "POST",
            data: formData,
            dataType: 'json',
            processData: false, // tell jQuery not to process the data
            contentType: false, // tell jQuery not to set contentType
            success: function (response) {
                console.log(response);
            }
        }); */
    })
});

// JQuery extension for using the put and delete methods
jQuery.each( [ "put", "delete" ], function( i, method ) {
    jQuery[ method ] = function( url, data, callback, type ) {
        if ( jQuery.isFunction( data ) ) {
            type = type || callback;
            callback = data;
            data = undefined;
        }

        return jQuery.ajax({
            url: url,
            type: method,
            dataType: type,
            data: data,
            success: callback
        });
    };
});
