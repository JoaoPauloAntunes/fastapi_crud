$(function (event) {
    const userRoute = "/users";

    $(".btn-read").click(function (event) {
        console.log("READ");

        $.ajax({
            url: `${userRoute}/`,
            method: "GET"
        }).done(function (response) {
            console.log(response);
            console.log(response.data);
            console.log(response.data.users);
            console.log(response.data.users[0]);
            console.log(response.data.users[0].email);
        });

        /* $.ajax({
            url: `${userRoute}/joao`,
            method: "GET"
        }).done(function (response) {
            console.log(response);
            console.log(response.data);
            console.log(response.data.user);
        }); */
    });

    $(".btn-create").click(function (event) {
        console.log("CREATE");

        $.ajax({
            url: `${userRoute}/test/`,
            method: "POST",
            data: {
                "email": "joao",
                "password": "joao_pwd"
            }
        }).done(function (response) {
            console.log(response);
            console.log(response.data);
            console.log(response.data.user);
            console.log(response.data.user.email);
        });
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