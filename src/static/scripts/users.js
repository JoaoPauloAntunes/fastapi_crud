$(function (event) {
    const user = {
        "email": "joao@gmail.com",
        "password": "joao_pwd"
    };

    $(".btn-read").click(function (event) {
        console.log("READ");


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

        $.ajax({
            url: `${userRoute}/`,
            method: "POST",
            data: {
                "email": "test@gmail.com",
                "password": "test_pass"
            }
        }).done(function (response) {
            console.log(response);
            console.log(response.data);
            console.log(response.data.user);
            console.log(response.data.user.email);
        });
    });

    $(".btn-remove").click(function (event) {
        console.log("REMOVE");


    });
});