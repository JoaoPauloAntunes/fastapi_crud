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

    $("#btn_send_profile_picture").click(function (event) {
        const profilePicture = document.getElementById("profile_picture").files[0];
        console.log(profilePicture);

        var formData = new FormData();
        formData.append('profile_picture', profilePicture);

        // work!
        /* fetch("/users/profile_picture", {
            method: 'POST',
            body: formData,
        }).then((response) => {
            return response.json().then(function (data) {
                console.log(data);
            })
        }); */

        // work!
        $.ajax({
            url: "/users/profile_picture",  // Url to which the request is send
            type: "POST",                   // Type of request to be send, called as method
            data: formData,                 // Data sent to server, a set of key/value pairs (i.e. form fields and values)
            processData:false,              // To send DOMDocument or non processed data file it is set to false
            contentType: false,             // The content type used when sending data to the server.
            cache: false,                   // To unable request pages to be cached
            success: function(data)         // A function to be called if request succeeds
            {
                console.log(data);
            }
        });

        // doesn't work!
        /* var xhr = new XMLHttpRequest();

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

        // doesn't work!
       /*  $.post("/users/profile_picture", JSON.stringify(profilePicture)).done(function (data) {
            console.log(data);
        }); */

        // doesn't work!
        /* $.post("/users/profile_picture", formData).done(function (data) {
            console.log(data);
        }); */
    });

    $(".btn-receive-profile-picture").click(function (event) {
        console.log("RECEIVE PROFILE PICTURE");
        const profilePictureName = "Screenshot from 2021-02-02 11-27-59.png";
    
        fetch(`/users/profile_picture/${profilePictureName}`).then(function (response) {
            return response.blob().then(function (blob) {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                
                a.style.display = 'none';
                a.href = url;
                a.download = profilePictureName;            // the filename you want

                document.body.appendChild(a);
                a.click();

                window.URL.revokeObjectURL(url);
            });
        }).catch(() => alert('Failed to download profile photo'));
    });
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
