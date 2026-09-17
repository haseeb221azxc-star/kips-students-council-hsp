document.addEventListener("DOMContentLoaded", function () {

    console.log("KIPS Students Council HSP: app.js loaded successfully.");

    const tabs =
        document.querySelectorAll("[data-community-tab]");

    const panels =
        document.querySelectorAll("[data-community-panel]");


    tabs.forEach(function (tab) {

        tab.addEventListener("click", function () {

            const target =
                tab.getAttribute("data-community-tab");


            tabs.forEach(function (item) {

                item.classList.remove("active");

                item.setAttribute(
                    "aria-selected",
                    "false"
                );

            });


            tab.classList.add("active");

            tab.setAttribute(
                "aria-selected",
                "true"
            );


            panels.forEach(function (panel) {

                panel.hidden =
                    panel.getAttribute(
                        "data-community-panel"
                    ) !== target;

            });

        });

    });


    const createPostButton =
        document.getElementById("createPostButton");

    const postText =
        document.getElementById("postText");


    if (createPostButton && postText) {

        createPostButton.addEventListener(
            "click",
            function () {

                postText.focus();

                postText.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

            }
        );

    }


    const photoButton =
        document.getElementById("postPhotoButton");

    const photoInput =
        document.getElementById("postPhotoInput");


    if (photoButton && photoInput) {

        photoButton.addEventListener(
            "click",
            function () {
                photoInput.click();
            }
        );

    }


    const videoButton =
        document.getElementById("postVideoButton");

    const videoInput =
        document.getElementById("postVideoInput");


    if (videoButton && videoInput) {

        videoButton.addEventListener(
            "click",
            function () {
                videoInput.click();
            }
        );

    }


    const fileButton =
        document.getElementById("postFileButton");

    const fileInput =
        document.getElementById("postFileInput");


    if (fileButton && fileInput) {

        fileButton.addEventListener(
            "click",
            function () {
                fileInput.click();
            }
        );

    }


    const publishButton =
        document.getElementById(
            "publishPostButton"
        );


    const feed =
        document.getElementById(
            "communityFeed"
        );


    if (publishButton && postText && feed) {

        publishButton.addEventListener(
            "click",
            function () {

                const text =
                    postText.value.trim();


                if (!text) {

                    alert(
                        "Write something before posting."
                    );

                    return;
                }


                const post =
                    document.createElement("div");


                post.style.padding = "20px";

                post.style.marginTop = "20px";

                post.style.borderRadius = "18px";

                post.style.background =
                    "rgba(255,255,255,0.06)";


                post.innerHTML = `
                    <strong>Student</strong>
                    <p>${escapeHTML(text)}</p>

                    <button
                        type="button"
                        class="test-like-button"
                    >
                        ❤️ Like <span>0</span>
                    </button>
                `;


                const empty =
                    document.getElementById(
                        "feedEmpty"
                    );


                if (empty) {
                    empty.remove();
                }


                feed.prepend(post);

                postText.value = "";


                const likeButton =
                    post.querySelector(
                        ".test-like-button"
                    );


                likeButton.addEventListener(
                    "click",
                    function () {

                        const number =
                            likeButton.querySelector(
                                "span"
                            );

                        number.textContent =
                            Number(
                                number.textContent
                            ) + 1;

                    }
                );

            }
        );

    }


    const confessionButton =
        document.getElementById(
            "publishConfessionButton"
        );


    const confessionText =
        document.getElementById(
            "confessionText"
        );


    const confessionFeed =
        document.getElementById(
            "confessionFeed"
        );


    if (
        confessionButton &&
        confessionText &&
        confessionFeed
    ) {

        confessionButton.addEventListener(
            "click",
            function () {

                const text =
                    confessionText.value.trim();


                if (!text) {

                    alert(
                        "Write your confession first."
                    );

                    return;
                }


                const confession =
                    document.createElement("div");


                confession.style.padding = "20px";

                confession.style.marginTop = "20px";

                confession.style.borderRadius = "18px";

                confession.style.background =
                    "rgba(255,255,255,0.06)";


                confession.innerHTML = `
                    <strong>🕶️ Anonymous</strong>
                    <p>${escapeHTML(text)}</p>

                    <button
                        type="button"
                        class="confession-like-button"
                    >
                        ❤️ Like <span>0</span>
                    </button>
                `;


                const empty =
                    document.getElementById(
                        "confessionEmpty"
                    );


                if (empty) {
                    empty.remove();
                }


                confessionFeed.prepend(
                    confession
                );


                confessionText.value = "";


                const likeButton =
                    confession.querySelector(
                        ".confession-like-button"
                    );


                likeButton.addEventListener(
                    "click",
                    function () {

                        const number =
                            likeButton.querySelector(
                                "span"
                            );

                        number.textContent =
                            Number(
                                number.textContent
                            ) + 1;

                    }
                );

            }
        );

    }


    const identityInputs =
        document.querySelectorAll(
            'input[name="identity"]'
        );


    const identityPreview =
        document.getElementById(
            "identityPreview"
        );


    identityInputs.forEach(function (input) {

        input.addEventListener(
            "change",
            function () {

                if (!identityPreview) {
                    return;
                }


                if (
                    input.value ===
                    "profile"
                ) {

                    identityPreview.textContent =
                        "👤 My Profile";

                } else {

                    identityPreview.textContent =
                        "🕶️ Anonymous";

                }

            }
        );

    });


    console.log(
        "KIPS Community features initialized."
    );

});


function escapeHTML(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}
