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

        // const email = "laise@gmail.com";
        const email = "debora@gmail.com";

        // work!
        $.delete(`/users/${email}`, false, function (response) {
            console.log(response);
        });
    });

    $("#btn_send_profile_photo").click(function (event) {
        const profilePhoto = document.getElementById("profile_photo").files[0];
        console.log(profilePhoto);

        var formData = new FormData();
        formData.append('profile_photo', profilePhoto);

        // work!
        /* fetch("/users/profile_photo", {
            method: 'POST',
            body: formData,
        }).then((response) => {
            return response.json().then(function (data) {
                console.log(data);
            })
        }); */

        // work!
        $.ajax({
            url: "/users/profile_photo/",   // Url to which the request is send
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
        xhr.open("POST", "/users/profile_photo");

        // Set headers
        xhr.setRequestHeader("Cache-Control", "no-cache");
        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        xhr.setRequestHeader("Content-Type", "multipart/form-data");
        xhr.setRequestHeader("X-File-Name", profilePhoto.name);
        xhr.setRequestHeader("X-File-Size", profilePhoto.size);
        xhr.setRequestHeader("X-File-Type", profilePhoto.type);

        // Send
        xhr.send(formData); */

        // doesn't work!
       /*  $.post("/users/profile_photo", JSON.stringify(profilePhoto)).done(function (data) {
            console.log(data);
        }); */

        // doesn't work!
        /* $.post("/users/profile_photo", formData).done(function (data) {
            console.log(data);
        }); */
    });

    $(".btn-receive-profile-photo").click(function (event) {
        console.log("RECEIVE PROFILE PHOTO");
        const profilePhotoName = $("#profile_photo_name").val();
    
        fetch(`/users/profile_photo/${profilePhotoName}`).then(function (response) {
            return response.blob().then(function (blob) {
                if (blob.size <= 21) {
                    alert('Nome da foto de perfil de inválido!');
                    return false;
                }
    
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                
                a.style.display = 'none';
                a.href = url;
                a.download = profilePhotoName;            // the filename you want
    
                document.body.appendChild(a);
                a.click();
    
                window.URL.revokeObjectURL(url);
            });
        })
        .catch(() => alert('Falha ao fazer download da foto!'));
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
