document.addEventListener("DOMContentLoaded", () => {

    /* =========================================================
       KIPS STUDENTS COUNCIL HSP
       COMMUNITY FRONTEND
    ========================================================= */


    /* =========================================================
       MOBILE NAVIGATION
    ========================================================= */

    const mobileMenuBtn =
        document.getElementById("mobileMenuBtn");

    const mainNav =
        document.getElementById("mainNav");

    if (mobileMenuBtn && mainNav) {

        mobileMenuBtn.addEventListener("click", () => {

            const isOpen =
                mainNav.classList.toggle("mobile-open");

            mobileMenuBtn.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            mobileMenuBtn.setAttribute(
                "aria-label",
                isOpen
                    ? "Close navigation menu"
                    : "Open navigation menu"
            );

            mobileMenuBtn.textContent =
                isOpen ? "✕" : "☰";
        });


        mainNav.querySelectorAll("a").forEach((link) => {

            link.addEventListener("click", () => {

                mainNav.classList.remove("mobile-open");

                mobileMenuBtn.setAttribute(
                    "aria-expanded",
                    "false"
                );

                mobileMenuBtn.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );

                mobileMenuBtn.textContent = "☰";
            });

        });
    }


    /* =========================================================
       CURRENT YEAR
    ========================================================= */

    document
        .querySelectorAll("[data-current-year]")
        .forEach((element) => {

            element.textContent =
                new Date().getFullYear();

        });


    /* =========================================================
       COMMUNITY ELEMENTS
    ========================================================= */

    const tabs =
        document.querySelectorAll("[data-community-tab]");

    const panels =
        document.querySelectorAll("[data-community-panel]");


    /* =========================================================
       COMMUNITY TAB SWITCHING
    ========================================================= */

    if (tabs.length && panels.length) {

        tabs.forEach((tab) => {

            tab.addEventListener("click", () => {

                const target =
                    tab.dataset.communityTab;


                tabs.forEach((item) => {

                    const active =
                        item === tab;

                    item.classList.toggle(
                        "active",
                        active
                    );

                    item.setAttribute(
                        "aria-selected",
                        String(active)
                    );
                });


                panels.forEach((panel) => {

                    panel.hidden =
                        panel.dataset.communityPanel !== target;

                });


                if (target === "everyone") {

                    const postText =
                        document.getElementById("postText");

                    if (postText) {
                        postText.focus();
                    }

                }

            });

        });

    }


    /* =========================================================
       LOCAL STORAGE HELPERS
    ========================================================= */

    const POSTS_KEY =
        "kips_hsp_community_posts";

    const CONFESSIONS_KEY =
        "kips_hsp_confessions";


    function loadData(key) {

        try {

            const stored =
                localStorage.getItem(key);

            if (!stored) {
                return [];
            }

            const parsed =
                JSON.parse(stored);

            return Array.isArray(parsed)
                ? parsed
                : [];

        } catch (error) {

            console.error(
                "Could not load saved data:",
                error
            );

            return [];
        }
    }


    function saveData(key, data) {

        try {

            localStorage.setItem(
                key,
                JSON.stringify(data)
            );

        } catch (error) {

            console.error(
                "Could not save data:",
                error
            );
        }
    }


    /* =========================================================
       CREATE POST
    ========================================================= */

    const createPostButton =
        document.getElementById("createPostButton");

    const postComposer =
        document.getElementById("postComposer");

    const postText =
        document.getElementById("postText");


    if (createPostButton && postComposer) {

        createPostButton.addEventListener(
            "click",
            () => {

                postComposer.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

                if (postText) {
                    setTimeout(() => {
                        postText.focus();
                    }, 350);
                }

            }
        );

    }


    /* =========================================================
       POST FILE PICKERS
    ========================================================= */

    const postPhotoButton =
        document.getElementById("postPhotoButton");

    const postVideoButton =
        document.getElementById("postVideoButton");

    const postFileButton =
        document.getElementById("postFileButton");

    const postPhotoInput =
        document.getElementById("postPhotoInput");

    const postVideoInput =
        document.getElementById("postVideoInput");

    const postFileInput =
        document.getElementById("postFileInput");

    const postFileName =
        document.getElementById("postFileName");


    if (postPhotoButton && postPhotoInput) {

        postPhotoButton.addEventListener(
            "click",
            () => postPhotoInput.click()
        );

    }


    if (postVideoButton && postVideoInput) {

        postVideoButton.addEventListener(
            "click",
            () => postVideoInput.click()
        );

    }


    if (postFileButton && postFileInput) {

        postFileButton.addEventListener(
            "click",
            () => postFileInput.click()
        );

    }


    function showSelectedFile(input, output) {

        if (!input || !output) {
            return;
        }

        if (!input.files || !input.files.length) {

            output.hidden = true;
            output.textContent = "";

            return;
        }


        const file =
            input.files[0];


        output.textContent =
            `Selected: ${file.name}`;

        output.hidden = false;
    }


    if (postPhotoInput) {

        postPhotoInput.addEventListener(
            "change",
            () => showSelectedFile(
                postPhotoInput,
                postFileName
            )
        );

    }


    if (postVideoInput) {

        postVideoInput.addEventListener(
            "change",
            () => showSelectedFile(
                postVideoInput,
                postFileName
            )
        );

    }


    if (postFileInput) {

        postFileInput.addEventListener(
            "change",
            () => showSelectedFile(
                postFileInput,
                postFileName
            )
        );

    }


    /* =========================================================
       ESCAPE HTML
    ========================================================= */

    function escapeHTML(value) {

        return String(value)
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");
    }


    /* =========================================================
       FORMAT DATE
    ========================================================= */

    function formatDate(timestamp) {

        const date =
            new Date(timestamp);

        return date.toLocaleString(
            undefined,
            {
                dateStyle: "medium",
                timeStyle: "short"
            }
        );
    }


    /* =========================================================
       RENDER COMMUNITY POSTS
    ========================================================= */

    const communityFeed =
        document.getElementById("communityFeed");

    const feedEmpty =
        document.getElementById("feedEmpty");


    function renderPosts() {

        if (!communityFeed) {
            return;
        }


        const posts =
            loadData(POSTS_KEY);


        communityFeed
            .querySelectorAll(".dynamic-post")
            .forEach((post) => post.remove());


        if (!posts.length) {

            if (feedEmpty) {
                feedEmpty.hidden = false;
            }

            return;
        }


        if (feedEmpty) {
            feedEmpty.hidden = true;
        }


        posts.forEach((post) => {

            const article =
                document.createElement("article");

            article.className =
                "dynamic-post";

            article.dataset.postId =
                post.id;


            article.innerHTML = `
                <div class="dynamic-post-header">

                    <div class="dynamic-post-avatar">
                        ?
                    </div>

                    <div class="dynamic-post-author">

                        <strong>
                            Student
                        </strong>

                        <span>
                            ${escapeHTML(
                                formatDate(post.createdAt)
                            )}
                        </span>

                    </div>

                </div>

                <div class="dynamic-post-content">

                    <p>
                        ${escapeHTML(post.text)
                            .replaceAll("\n", "<br>")}
                    </p>

                    ${
                        post.fileName
                            ? `
                                <div class="dynamic-post-file">
                                    📎 ${escapeHTML(
                                        post.fileName
                                    )}
                                </div>
                              `
                            : ""
                    }

                </div>

                <div class="dynamic-post-actions">

                    <button
                        type="button"
                        class="dynamic-action like-post"
                        data-id="${post.id}"
                    >
                        ❤️
                        <span>${post.likes || 0}</span>
                    </button>

                    <button
                        type="button"
                        class="dynamic-action comment-post"
                        data-id="${post.id}"
                    >
                        💬
                        <span>${post.comments || 0}</span>
                    </button>

                    <button
                        type="button"
                        class="dynamic-action repost-post"
                        data-id="${post.id}"
                    >
                        🔁
                        <span>${post.reposts || 0}</span>
                    </button>

                    <button
                        type="button"
                        class="dynamic-action delete-post"
                        data-id="${post.id}"
                    >
                        🗑️
                        <span>Delete</span>
                    </button>

                </div>

                <div
                    class="dynamic-comment-area"
                    data-comment-area="${post.id}"
                    hidden
                >

                    <div class="dynamic-comment-input-wrap">

                        <input
                            type="text"
                            class="dynamic-comment-input"
                            placeholder="Write a comment..."
                            maxlength="500"
                        >

                        <button
                            type="button"
                            class="dynamic-comment-submit"
                            data-id="${post.id}"
                        >
                            Send
                        </button>

                    </div>

                    <div
                        class="dynamic-comments"
                        data-comments="${post.id}"
                    ></div>

                </div>
            `;


            communityFeed.appendChild(article);


            renderComments(post.id);
        });

    }


    /* =========================================================
       CREATE POST
    ========================================================= */

    const publishPostButton =
        document.getElementById(
            "publishPostButton"
        );


    if (publishPostButton) {

        publishPostButton.addEventListener(
            "click",
            () => {

                const text =
                    postText
                        ? postText.value.trim()
                        : "";


                let selectedFile = null;


                if (
                    postPhotoInput &&
                    postPhotoInput.files.length
                ) {

                    selectedFile =
                        postPhotoInput.files[0];

                } else if (
                    postVideoInput &&
                    postVideoInput.files.length
                ) {

                    selectedFile =
                        postVideoInput.files[0];

                } else if (
                    postFileInput &&
                    postFileInput.files.length
                ) {

                    selectedFile =
                        postFileInput.files[0];

                }


                if (!text && !selectedFile) {

                    alert(
                        "Write something or select a file before posting."
                    );

                    if (postText) {
                        postText.focus();
                    }

                    return;
                }


                const posts =
                    loadData(POSTS_KEY);


                const newPost = {

                    id:
                        `${Date.now()}_${Math.random()
                            .toString(36)
                            .slice(2, 9)}`,

                    text:
                        text,

                    fileName:
                        selectedFile
                            ? selectedFile.name
                            : "",

                    likes: 0,

                    comments: 0,

                    reposts: 0,

                    createdAt:
                        new Date().toISOString()
                };


                posts.unshift(newPost);

                saveData(
                    POSTS_KEY,
                    posts
                );


                if (postText) {
                    postText.value = "";
                }


                [
                    postPhotoInput,
                    postVideoInput,
                    postFileInput
                ].forEach((input) => {

                    if (input) {
                        input.value = "";
                    }

                });


                if (postFileName) {

                    postFileName.textContent = "";

                    postFileName.hidden = true;
                }


                renderPosts();


                communityFeed?.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    }


    /* =========================================================
       POST ACTIONS
    ========================================================= */

    if (communityFeed) {

        communityFeed.addEventListener(
            "click",
            (event) => {

                const likeButton =
                    event.target.closest(
                        ".like-post"
                    );

                const repostButton =
                    event.target.closest(
                        ".repost-post"
                    );

                const commentButton =
                    event.target.closest(
                        ".comment-post"
                    );

                const deleteButton =
                    event.target.closest(
                        ".delete-post"
                    );

                const commentSubmit =
                    event.target.closest(
                        ".dynamic-comment-submit"
                    );


                /* LIKE */

                if (likeButton) {

                    updatePostNumber(
                        likeButton.dataset.id,
                        "likes"
                    );

                    return;
                }


                /* REPOST */

                if (repostButton) {

                    updatePostNumber(
                        repostButton.dataset.id,
                        "reposts"
                    );

                    return;
                }


                /* COMMENT OPEN */

                if (commentButton) {

                    const id =
                        commentButton.dataset.id;

                    const area =
                        document.querySelector(
                            `[data-comment-area="${id}"]`
                        );

                    if (area) {

                        area.hidden =
                            !area.hidden;

                        if (!area.hidden) {

                            area.querySelector(
                                ".dynamic-comment-input"
                            )?.focus();

                        }

                    }

                    return;
                }


                /* DELETE */

                if (deleteButton) {

                    const id =
                        deleteButton.dataset.id;


                    const confirmed =
                        confirm(
                            "Delete this post?"
                        );


                    if (!confirmed) {
                        return;
                    }


                    const posts =
                        loadData(POSTS_KEY)
                            .filter(
                                (post) =>
                                    post.id !== id
                            );


                    saveData(
                        POSTS_KEY,
                        posts
                    );


                    renderPosts();

                    return;
                }


                /* COMMENT SUBMIT */

                if (commentSubmit) {

                    const id =
                        commentSubmit.dataset.id;

                    const area =
                        document.querySelector(
                            `[data-comment-area="${id}"]`
                        );

                    if (!area) {
                        return;
                    }


                    const input =
                        area.querySelector(
                            ".dynamic-comment-input"
                        );


                    if (!input) {
                        return;
                    }


                    const text =
                        input.value.trim();


                    if (!text) {
                        return;
                    }


                    const commentsKey =
                        `kips_post_comments_${id}`;


                    const comments =
                        loadData(commentsKey);


                    comments.push({

                        id:
                            Date.now(),

                        text:
                            text,

                        createdAt:
                            new Date().toISOString()
                    });


                    saveData(
                        commentsKey,
                        comments
                    );


                    input.value = "";


                    updatePostNumber(
                        id,
                        "comments"
                    );


                    renderComments(id);

                }

            }
        );

    }


    /* =========================================================
       UPDATE POST NUMBER
    ========================================================= */

    function updatePostNumber(
        id,
        field
    ) {

        const posts =
            loadData(POSTS_KEY);


        const post =
            posts.find(
                (item) =>
                    item.id === id
            );


        if (!post) {
            return;
        }


        post[field] =
            Number(post[field] || 0) + 1;


        saveData(
            POSTS_KEY,
            posts
        );


        renderPosts();

    }


    /* =========================================================
       COMMENTS
    ========================================================= */

    function renderComments(id) {

        const container =
            document.querySelector(
                `[data-comments="${id}"]`
            );


        if (!container) {
            return;
        }


        const comments =
            loadData(
                `kips_post_comments_${id}`
            );


        container.innerHTML = "";


        comments.forEach((comment) => {

            const item =
                document.createElement("div");

            item.className =
                "dynamic-comment";


            item.innerHTML = `
                <strong>Student</strong>
                <p>
                    ${escapeHTML(
                        comment.text
                    )}
                </p>
            `;


            container.appendChild(item);

        });

    }


    /* =========================================================
       CONFESSION FILE PICKERS
    ========================================================= */

    const confessionPhotoButton =
        document.getElementById(
            "confessionPhotoButton"
        );

    const confessionVideoButton =
        document.getElementById(
            "confessionVideoButton"
        );

    const confessionPhotoInput =
        document.getElementById(
            "confessionPhotoInput"
        );

    const confessionVideoInput =
        document.getElementById(
            "confessionVideoInput"
        );

    const confessionFileName =
        document.getElementById(
            "confessionFileName"
        );


    if (
        confessionPhotoButton &&
        confessionPhotoInput
    ) {

        confessionPhotoButton.addEventListener(
            "click",
            () => confessionPhotoInput.click()
        );

    }


    if (
        confessionVideoButton &&
        confessionVideoInput
    ) {

        confessionVideoButton.addEventListener(
            "click",
            () => confessionVideoInput.click()
        );

    }


    if (confessionPhotoInput) {

        confessionPhotoInput.addEventListener(
            "change",
            () => showSelectedFile(
                confessionPhotoInput,
                confessionFileName
            )
        );

    }


    if (confessionVideoInput) {

        confessionVideoInput.addEventListener(
            "change",
            () => showSelectedFile(
                confessionVideoInput,
                confessionFileName
            )
        );

    }


    /* =========================================================
       CONFESSION IDENTITY
    ========================================================= */

    const identityOptions =
        document.querySelectorAll(
            'input[name="identity"]'
        );

    const identityPreview =
        document.getElementById(
            "identityPreview"
        );


    identityOptions.forEach((input) => {

        input.addEventListener(
            "change",
            () => {

                document
                    .querySelectorAll(
                        ".identity-option"
                    )
                    .forEach((option) => {

                        const radio =
                            option.querySelector(
                                'input[name="identity"]'
                            );

                        option.classList.toggle(
                            "selected",
                            radio &&
                            radio.checked
                        );

                    });


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


    /* =========================================================
       CONFESSION PUBLISHING
    ========================================================= */

    const publishConfessionButton =
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

    const confessionEmpty =
        document.getElementById(
            "confessionEmpty"
        );


    if (publishConfessionButton) {

        publishConfessionButton.addEventListener(
            "click",
            () => {

                const text =
                    confessionText
                        ? confessionText.value.trim()
                        : "";


                let selectedFile = null;


                if (
                    confessionPhotoInput &&
                    confessionPhotoInput.files.length
                ) {

                    selectedFile =
                        confessionPhotoInput.files[0];

                } else if (
                    confessionVideoInput &&
                    confessionVideoInput.files.length
                ) {

                    selectedFile =
                        confessionVideoInput.files[0];

                }


                if (!text && !selectedFile) {

                    alert(
                        "Write your confession or add a photo/video first."
                    );

                    if (confessionText) {
                        confessionText.focus();
                    }

                    return;
                }


                const selectedIdentity =
                    document.querySelector(
                        'input[name="identity"]:checked'
                    );


                const identity =
                    selectedIdentity?.value ===
                    "profile"
                        ? "profile"
                        : "anonymous";


                const confessions =
                    loadData(
                        CONFESSIONS_KEY
                    );


                const newConfession = {

                    id:
                        `${Date.now()}_${Math.random()
                            .toString(36)
                            .slice(2, 9)}`,

                    text:
                        text,

                    identity:
                        identity,

                    fileName:
                        selectedFile
                            ? selectedFile.name
                            : "",

                    likes: 0,

                    comments: 0,

                    createdAt:
                        new Date().toISOString()
                };


                confessions.unshift(
                    newConfession
                );


                saveData(
                    CONFESSIONS_KEY,
                    confessions
                );


                if (confessionText) {
                    confessionText.value = "";
                }


                [
                    confessionPhotoInput,
                    confessionVideoInput
                ].forEach((input) => {

                    if (input) {
                        input.value = "";
                    }

                });


                if (confessionFileName) {

                    confessionFileName.textContent =
                        "";

                    confessionFileName.hidden =
                        true;

                }


                renderConfessions();


                confessionFeed?.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    }


    /* =========================================================
       RENDER CONFESSIONS
    ========================================================= */

    function renderConfessions() {

        if (!confessionFeed) {
            return;
        }


        const confessions =
            loadData(
                CONFESSIONS_KEY
            );


        confessionFeed
            .querySelectorAll(
                ".dynamic-confession"
            )
            .forEach(
                (item) => item.remove()
            );


        if (!confessions.length) {

            if (confessionEmpty) {
                confessionEmpty.hidden = false;
            }

            return;
        }


        if (confessionEmpty) {
            confessionEmpty.hidden = true;
        }


        confessions.forEach(
            (confession) => {

                const article =
                    document.createElement(
                        "article"
                    );


                article.className =
                    "dynamic-confession";


                const publicName =
                    confession.identity ===
                    "anonymous"
                        ? "🕶️ Anonymous"
                        : "👤 Student";


                article.innerHTML = `

                    <div class="dynamic-post-header">

                        <div class="dynamic-post-avatar">
                            ${confession.identity === "anonymous"
                                ? "?"
                                : "S"}
                        </div>

                        <div class="dynamic-post-author">

                            <strong>
                                ${publicName}
                            </strong>

                            <span>
                                ${escapeHTML(
                                    formatDate(
                                        confession.createdAt
                                    )
                                )}
                            </span>

                        </div>

                    </div>


                    <div class="dynamic-post-content">

                        <p>
                            ${escapeHTML(
                                confession.text
                            ).replaceAll(
                                "\n",
                                "<br>"
                            )}
                        </p>

                        ${
                            confession.fileName
                                ? `
                                    <div class="dynamic-post-file">
                                        📎 ${escapeHTML(
                                            confession.fileName
                                        )}
                                    </div>
                                  `
                                : ""
                        }

                    </div>


                    <div class="dynamic-post-actions">

                        <button
                            type="button"
                            class="dynamic-action like-confession"
                            data-id="${confession.id}"
                        >
                            ❤️
                            <span>
                                ${confession.likes || 0}
                            </span>
                        </button>

                        <button
                            type="button"
                            class="dynamic-action comment-confession"
                            data-id="${confession.id}"
                        >
                            💬
                            <span>
                                ${confession.comments || 0}
                            </span>
                        </button>

                    </div>

                `;


                confessionFeed.appendChild(
                    article
                );

            }
        );

    }


    /* =========================================================
       CONFESSION ACTIONS
    ========================================================= */

    if (confessionFeed) {

        confessionFeed.addEventListener(
            "click",
            (event) => {

                const likeButton =
                    event.target.closest(
                        ".like-confession"
                    );


                if (likeButton) {

                    const id =
                        likeButton.dataset.id;


                    const confessions =
                        loadData(
                            CONFESSIONS_KEY
                        );


                    const confession =
                        confessions.find(
                            (item) =>
                                item.id === id
                        );


                    if (!confession) {
                        return;
                    }


                    confession.likes =
                        Number(
                            confession.likes || 0
                        ) + 1;


                    saveData(
                        CONFESSIONS_KEY,
                        confessions
                    );


                    renderConfessions();

                }

            }
        );

    }


    /* =========================================================
       INITIAL RENDER
    ========================================================= */

    renderPosts();

    renderConfessions();


    /* =========================================================
       PAGE LOADED
    ========================================================= */

    document.body.classList.add(
        "page-loaded"
    );

});
