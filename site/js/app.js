(() => {
    "use strict";
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(webP.height == 2);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = support === true ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    let _slideUp = (target, duration = 500, showmore = 0) => {
        if (!target.classList.contains("_slide")) {
            target.classList.add("_slide");
            target.style.transitionProperty = "height, margin, padding";
            target.style.transitionDuration = duration + "ms";
            target.style.height = `${target.offsetHeight}px`;
            target.offsetHeight;
            target.style.overflow = "hidden";
            target.style.height = showmore ? `${showmore}px` : `0px`;
            target.style.paddingTop = 0;
            target.style.paddingBottom = 0;
            target.style.marginTop = 0;
            target.style.marginBottom = 0;
            window.setTimeout((() => {
                target.hidden = !showmore ? true : false;
                !showmore ? target.style.removeProperty("height") : null;
                target.style.removeProperty("padding-top");
                target.style.removeProperty("padding-bottom");
                target.style.removeProperty("margin-top");
                target.style.removeProperty("margin-bottom");
                !showmore ? target.style.removeProperty("overflow") : null;
                target.style.removeProperty("transition-duration");
                target.style.removeProperty("transition-property");
                target.classList.remove("_slide");
                document.dispatchEvent(new CustomEvent("slideUpDone", {
                    detail: {
                        target
                    }
                }));
            }), duration);
        }
    };
    let _slideDown = (target, duration = 500, showmore = 0) => {
        if (!target.classList.contains("_slide")) {
            target.classList.add("_slide");
            target.hidden = target.hidden ? false : null;
            showmore ? target.style.removeProperty("height") : null;
            let height = target.offsetHeight;
            target.style.overflow = "hidden";
            target.style.height = showmore ? `${showmore}px` : `0px`;
            target.style.paddingTop = 0;
            target.style.paddingBottom = 0;
            target.style.marginTop = 0;
            target.style.marginBottom = 0;
            target.offsetHeight;
            target.style.transitionProperty = "height, margin, padding";
            target.style.transitionDuration = duration + "ms";
            target.style.height = height + "px";
            target.style.removeProperty("padding-top");
            target.style.removeProperty("padding-bottom");
            target.style.removeProperty("margin-top");
            target.style.removeProperty("margin-bottom");
            window.setTimeout((() => {
                target.style.removeProperty("height");
                target.style.removeProperty("overflow");
                target.style.removeProperty("transition-duration");
                target.style.removeProperty("transition-property");
                target.classList.remove("_slide");
                document.dispatchEvent(new CustomEvent("slideDownDone", {
                    detail: {
                        target
                    }
                }));
            }), duration);
        }
    };
    let _slideToggle = (target, duration = 500) => {
        if (target.hidden) return _slideDown(target, duration); else return _slideUp(target, duration);
    };
    function spollers() {
        const spollersArray = document.querySelectorAll("[data-spollers]");
        if (spollersArray.length > 0) {
            document.addEventListener("click", setSpollerAction);
            const spollersRegular = Array.from(spollersArray).filter((function(item, index, self) {
                return !item.dataset.spollers.split(",")[0];
            }));
            if (spollersRegular.length) initSpollers(spollersRegular);
            let mdQueriesArray = dataMediaQueries(spollersArray, "spollers");
            if (mdQueriesArray && mdQueriesArray.length) mdQueriesArray.forEach((mdQueriesItem => {
                mdQueriesItem.matchMedia.addEventListener("change", (function() {
                    initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
                }));
                initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
            }));
            function initSpollers(spollersArray, matchMedia = false) {
                spollersArray.forEach((spollersBlock => {
                    spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
                    if (matchMedia.matches || !matchMedia) {
                        spollersBlock.classList.add("_spoller-init");
                        initSpollerBody(spollersBlock);
                    } else {
                        spollersBlock.classList.remove("_spoller-init");
                        initSpollerBody(spollersBlock, false);
                    }
                }));
            }
            function initSpollerBody(spollersBlock, hideSpollerBody = true) {
                let spollerItems = spollersBlock.querySelectorAll("details");
                if (spollerItems.length) spollerItems.forEach((spollerItem => {
                    let spollerTitle = spollerItem.querySelector("summary");
                    if (hideSpollerBody) {
                        spollerTitle.removeAttribute("tabindex");
                        if (!spollerItem.hasAttribute("data-open")) {
                            spollerItem.open = false;
                            spollerTitle.nextElementSibling.hidden = true;
                        } else {
                            spollerTitle.classList.add("_spoller-active");
                            spollerItem.open = true;
                        }
                    } else {
                        spollerTitle.setAttribute("tabindex", "-1");
                        spollerTitle.classList.remove("_spoller-active");
                        spollerItem.open = true;
                        spollerTitle.nextElementSibling.hidden = false;
                    }
                }));
            }
            function setSpollerAction(e) {
                const el = e.target;
                if (el.closest("summary") && el.closest("[data-spollers]")) {
                    e.preventDefault();
                    if (el.closest("[data-spollers]").classList.contains("_spoller-init")) {
                        const spollerTitle = el.closest("summary");
                        const spollerBlock = spollerTitle.closest("details");
                        const spollersBlock = spollerTitle.closest("[data-spollers]");
                        const oneSpoller = spollersBlock.hasAttribute("data-one-spoller");
                        const scrollSpoller = spollerBlock.hasAttribute("data-spoller-scroll");
                        const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
                        if (!spollersBlock.querySelectorAll("._slide").length) {
                            if (oneSpoller && !spollerBlock.open) hideSpollersBody(spollersBlock);
                            !spollerBlock.open ? spollerBlock.open = true : setTimeout((() => {
                                spollerBlock.open = false;
                            }), spollerSpeed);
                            spollerTitle.classList.toggle("_spoller-active");
                            _slideToggle(spollerTitle.nextElementSibling, spollerSpeed);
                            if (scrollSpoller && spollerTitle.classList.contains("_spoller-active")) {
                                const scrollSpollerValue = spollerBlock.dataset.spollerScroll;
                                const scrollSpollerOffset = +scrollSpollerValue ? +scrollSpollerValue : 0;
                                const scrollSpollerNoHeader = spollerBlock.hasAttribute("data-spoller-scroll-noheader") ? document.querySelector(".header").offsetHeight : 0;
                                window.scrollTo({
                                    top: spollerBlock.offsetTop - (scrollSpollerOffset + scrollSpollerNoHeader),
                                    behavior: "smooth"
                                });
                            }
                        }
                    }
                }
                if (!el.closest("[data-spollers]")) {
                    const spollersClose = document.querySelectorAll("[data-spoller-close]");
                    if (spollersClose.length) spollersClose.forEach((spollerClose => {
                        const spollersBlock = spollerClose.closest("[data-spollers]");
                        const spollerCloseBlock = spollerClose.parentNode;
                        if (spollersBlock.classList.contains("_spoller-init")) {
                            const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
                            spollerClose.classList.remove("_spoller-active");
                            _slideUp(spollerClose.nextElementSibling, spollerSpeed);
                            setTimeout((() => {
                                spollerCloseBlock.open = false;
                            }), spollerSpeed);
                        }
                    }));
                }
            }
            function hideSpollersBody(spollersBlock) {
                const spollerActiveBlock = spollersBlock.querySelector("details[open]");
                if (spollerActiveBlock && !spollersBlock.querySelectorAll("._slide").length) {
                    const spollerActiveTitle = spollerActiveBlock.querySelector("summary");
                    const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
                    spollerActiveTitle.classList.remove("_spoller-active");
                    _slideUp(spollerActiveTitle.nextElementSibling, spollerSpeed);
                    setTimeout((() => {
                        spollerActiveBlock.open = false;
                    }), spollerSpeed);
                }
            }
        }
    }
    function rippleEffect() {
        document.addEventListener("click", (function(e) {
            const targetItem = e.target;
            if (targetItem.closest("[data-ripple]")) {
                const button = targetItem.closest("[data-ripple]");
                const ripple = document.createElement("span");
                const diameter = Math.max(button.clientWidth, button.clientHeight);
                const radius = diameter / 2;
                ripple.style.width = ripple.style.height = `${diameter}px`;
                ripple.style.left = `${e.pageX - (button.getBoundingClientRect().left + scrollX) - radius}px`;
                ripple.style.top = `${e.pageY - (button.getBoundingClientRect().top + scrollY) - radius}px`;
                ripple.classList.add("ripple");
                button.dataset.ripple === "once" && button.querySelector(".ripple") ? button.querySelector(".ripple").remove() : null;
                button.appendChild(ripple);
                const timeOut = getAnimationDuration(ripple);
                setTimeout((() => {
                    ripple ? ripple.remove() : null;
                }), timeOut);
                function getAnimationDuration() {
                    const aDuration = window.getComputedStyle(ripple).animationDuration;
                    return aDuration.includes("ms") ? aDuration.replace("ms", "") : aDuration.replace("s", "") * 1e3;
                }
            }
        }));
    }
    function uniqArray(array) {
        return array.filter((function(item, index, self) {
            return self.indexOf(item) === index;
        }));
    }
    function dataMediaQueries(array, dataSetValue) {
        const media = Array.from(array).filter((function(item, index, self) {
            if (item.dataset[dataSetValue]) return item.dataset[dataSetValue].split(",")[0];
        }));
        if (media.length) {
            const breakpointsArray = [];
            media.forEach((item => {
                const params = item.dataset[dataSetValue];
                const breakpoint = {};
                const paramsArray = params.split(",");
                breakpoint.value = paramsArray[0];
                breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
                breakpoint.item = item;
                breakpointsArray.push(breakpoint);
            }));
            let mdQueries = breakpointsArray.map((function(item) {
                return "(" + item.type + "-width: " + item.value + "px)," + item.value + "," + item.type;
            }));
            mdQueries = uniqArray(mdQueries);
            const mdQueriesArray = [];
            if (mdQueries.length) {
                mdQueries.forEach((breakpoint => {
                    const paramsArray = breakpoint.split(",");
                    const mediaBreakpoint = paramsArray[1];
                    const mediaType = paramsArray[2];
                    const matchMedia = window.matchMedia(paramsArray[0]);
                    const itemsArray = breakpointsArray.filter((function(item) {
                        if (item.value === mediaBreakpoint && item.type === mediaType) return true;
                    }));
                    mdQueriesArray.push({
                        itemsArray,
                        matchMedia
                    });
                }));
                return mdQueriesArray;
            }
        }
    }
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints ? true : false;
    document.querySelectorAll(".benefits__card_info").forEach((element => {
        if (isTouch) element.classList.add("mobile");
    }));
    const coursesCard = document.querySelectorAll(".courses__card");
    coursesCard.forEach((course => {
        let timeoutId, timeoutId2;
        const text = course.querySelector(".courses__card_text");
        const span = text.querySelector("span");
        course.addEventListener("mouseover", (() => {
            text.style.height = "100%";
            text.style.left = "12%";
            timeoutId = setTimeout((() => {
                text.style.width = "140%";
                text.style.left = "-20%";
                span.style.scale = "1.6";
                course.classList.add("hover");
            }), 300);
            timeoutId2 = setTimeout((() => {
                course.classList.add("hover");
            }), 300);
        }));
        course.addEventListener("mouseout", (() => {
            clearTimeout(timeoutId);
            clearTimeout(timeoutId2);
            text.style.height = "74px";
            text.style.width = "calc(100% - 120px)";
            text.style.left = "-15px";
            span.style.scale = "1";
            course.classList.remove("hover");
        }));
        course.addEventListener("click", (event => {
            event.preventDefault();
            const changeLocation = element => {
                element.classList.add("click");
                setTimeout((() => {
                    window.location.href = element.getAttribute("href");
                    setTimeout((() => {
                        element.classList.remove("click");
                        clearTimeout(timeoutId);
                        clearTimeout(timeoutId2);
                        text.style.height = "74px";
                        text.style.width = "calc(100% - 120px)";
                        text.style.left = "-15px";
                        span.style.scale = "1";
                        course.classList.remove("hover");
                    }), 200);
                }), 500);
            };
            if (course.classList.contains("hover") && !isTouch) changeLocation(course); else {
                const interval = setInterval((function() {
                    if (course.classList.contains("hover")) {
                        clearInterval(interval);
                        setTimeout((() => {
                            changeLocation(course);
                        }), 100);
                    }
                }), 200);
            }
        }));
        course.addEventListener("auxclick", (event => {
            event.preventDefault();
            const changeLocation = element => {
                element.classList.add("click");
                setTimeout((() => {
                    window.open(element.getAttribute("href"), "_blank");
                    setTimeout((() => {
                        element.classList.remove("click");
                        clearTimeout(timeoutId);
                        clearTimeout(timeoutId2);
                        text.style.height = "74px";
                        text.style.width = "calc(100% - 120px)";
                        text.style.left = "-15px";
                        span.style.scale = "1";
                        course.classList.remove("hover");
                    }), 100);
                }), 500);
            };
            if (course.classList.contains("hover") && !isTouch) changeLocation(course); else {
                const interval = setInterval((function() {
                    if (course.classList.contains("hover")) {
                        clearInterval(interval);
                        setTimeout((() => {
                            changeLocation(course);
                        }), 100);
                    }
                }), 200);
            }
        }));
    }));
    VANTA.GLOBE({
        el: "#main__background",
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200,
        minWidth: 200,
        scale: 1,
        scaleMobile: 1,
        color: 53685,
        color2: 10526880,
        size: 1.4,
        backgroundColor: 4737096
    });
    gsap.to(".main__content", {
        scrollTrigger: {
            trigger: ".main",
            start: "top top",
            scrub: 1
        },
        yPercent: -20,
        opacity: 0
    });
    gsap.to(".main__background", {
        scrollTrigger: {
            trigger: ".main",
            start: "top top",
            scrub: 1
        },
        yPercent: 10,
        opacity: 0
    });
    gsap.fromTo(".main__perehod_img-1", {
        xPercent: 5.2
    }, {
        scrollTrigger: {
            trigger: ".main",
            start: "top top",
            scrub: 1
        },
        xPercent: 9.5
    });
    gsap.to(".main__perehod_img-2", {
        scrollTrigger: {
            trigger: ".main",
            start: "top top",
            scrub: 1
        },
        xPercent: -18,
        y: 50,
        opacity: .9
    });
    gsap.fromTo(".benefits__block", {
        opacity: 0,
        y: 60
    }, {
        opacity: 1,
        y: 0,
        scrollTrigger: {
            trigger: ".benefits",
            scrub: true,
            start: "-700",
            end: "-300"
        }
    });
    gsap.fromTo(".courses", {
        opacity: 0,
        y: 120
    }, {
        opacity: 1,
        y: 0,
        scrollTrigger: {
            trigger: ".benefits",
            scrub: true,
            start: "bottom bottom",
            end: "260"
        }
    });
    window["FLS"] = true;
    isWebp();
    spollers();
    rippleEffect();
})();