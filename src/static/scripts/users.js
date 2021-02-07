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

        $.get(`/users/${email}`).done(function (data) {
            console.log(data);
        });


        return;
        //************************************************************************************* */
        // READ with query params
        const skip = 1;
        const limit = 2;

        // work!
        /* $.get(`/users/`).done(function (data) {
            console.log(data);
        }); */

        // work!
        $.get(`/users/`, { "skip": skip, "limit": limit }).done(function (data) {
            console.log(data);
        });

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
        // JSON.stringify() is required! The data must be sent in String JSON format!
        $.post("/users/", JSON.stringify(user)).done(function (data) {
            console.log(data);
            console.log(data.email);
        });


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

    /* $(".btn-send-profile-picture").click(function (event) {

    }) */
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
