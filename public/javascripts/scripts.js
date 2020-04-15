"use strict";

//create actions
$(function () {
    const items = document.querySelectorAll(".item");
    items.length && items.forEach(function (item) {
        item.addEventListener("click", function () {
            $.ajax({
                type: "POST",
                data: JSON.stringify({
                    field: item.id,
                }),
                contentType: "application/json",
                url: "/api/save"
            }).done(function (e) {
                e.ok ? console.log(e.ok) : console.log("error")
            })
        })
    });
})

$(function () {
    const analytic_button = document.querySelector(".to-analytics-button");
    analytic_button.addEventListener("click", function (event) {
        $(location).attr('href', '/analytics');
    })

})

$(function () {
    const home_button = document.querySelector(".back-home-button");
    home_button.addEventListener("click", function (event) {
        $(location).attr('href', '/home');
    })
})


