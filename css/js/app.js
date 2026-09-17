document.addEventListener("DOMContentLoaded", () => {

    /*
     * ==========================================
     * KIPS STUDENTS COUNCIL HSP
     * Main Frontend JavaScript
     * ==========================================
     */


    /* =========================
       MOBILE NAVIGATION
    ========================== */

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
                isOpen
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


        /*
         * Close the mobile menu when
         * a navigation link is selected.
         */

        const navLinks =
            mainNav.querySelectorAll("a");

        navLinks.forEach((link) => {

            link.addEventListener("click", () => {

                mainNav.classList.remove(
                    "mobile-open"
                );

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


    /* =========================
       CURRENT YEAR
    ========================== */

    const yearElements =
        document.querySelectorAll("[data-current-year]");

    const currentYear =
        new Date().getFullYear();

    yearElements.forEach((element) => {

        element.textContent =
            currentYear;

    });


    /* =========================
       PAGE LOADED
    ========================== */

    document.body.classList.add("page-loaded");

});
