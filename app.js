"use strict";

const addMoreImgBtn = document.querySelector(".main__button");
const navButtons = document.querySelectorAll(".nav__btn");
const showAllbtn = document.querySelectorAll(".nav__btn")[0];
const mediaQuery = window.matchMedia("(max-width: 490px)");
const section = document.querySelector("section");
const width =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
const memoizationMobileObj = {};
const memoizationDesktopObj = {};
const url = "http://www.splashbase.co/api/v1/images/search?query=tree";

const getPictures = () => document.querySelectorAll("picture");
const getImages = () => document.querySelectorAll("img");
const createDiv = () => document.createElement('div');
const createImage = () => document.createElement('img');
const createPic = () => document.createElement('picture');
const createSpan = () => document.createElement('span');

showAllbtn.classList.add('btn-colors-inverse');

function mobileView() {
    const pictures = Array.from(getPictures());

    memoizationMobileObj[pictures.length - 6] = {
        gridRowStart: "3",
        gridRowEnd: "4"
    };
    memoizationMobileObj[pictures.length - 2] = {
        gridRowStart: "7",
        gridRowEnd: "8"
    };
    memoizationMobileObj[pictures.length - 3] = {
        gridRowStart: "5",
        gridRowEnd: "7"
    };
    memoizationMobileObj[pictures.length - 1] = {
        gridRowStart: "8",
        gridRowEnd: "10"
    };

    if (pictures.length > 10) {
        memoizationMobileObj[pictures.length - 6] = {
            gridRowStart: String(Number(memoizationMobileObj[pictures.length - 16].gridRowStart) + 9),
            gridRowEnd: String(Number(memoizationMobileObj[pictures.length - 16].gridRowEnd) + 9)
        };
        memoizationMobileObj[pictures.length - 2] = {
            gridRowStart: String(Number(memoizationMobileObj[pictures.length - 12].gridRowStart) + 9),
            gridRowEnd: String(Number(memoizationMobileObj[pictures.length - 12].gridRowEnd) + 9)
        };
        memoizationMobileObj[pictures.length - 3] = {
            gridRowStart: String(Number(memoizationMobileObj[pictures.length - 13].gridRowStart) + 9),
            gridRowEnd: String(Number(memoizationMobileObj[pictures.length - 13].gridRowEnd) + 9)
        };
        memoizationMobileObj[pictures.length - 1] = {
            gridRowStart: String(Number(memoizationMobileObj[pictures.length - 11].gridRowStart) + 9),
            gridRowEnd: String(Number(memoizationMobileObj[pictures.length - 11].gridRowEnd) + 9)
        };
    }
}

function desktopView() {
    const pictures = Array.from(getPictures());
    memoizationDesktopObj[pictures.length - 6] = {
        gridRowStart: "2",
        gridRowEnd: "3",
        gridColumnStart: "1",
        gridColumnEnd: "3"
    };
    memoizationDesktopObj[pictures.length - 2] = {
        gridRowStart: "3",
        gridRowEnd: "4",
        gridColumnStart: "2",
        gridColumnEnd: "4"
    };
    if (pictures.length > 10) {
        memoizationDesktopObj[pictures.length - 6] = {
            gridRowStart: String(Number(memoizationDesktopObj[pictures.length - 16].gridRowStart) + 3),
            gridRowEnd: String(Number(memoizationDesktopObj[pictures.length - 16].gridRowEnd) + 3),
            gridColumnStart: String(Number(memoizationDesktopObj[pictures.length - 16].gridColumnStart)),
            gridColumnEnd: String(Number(memoizationDesktopObj[pictures.length - 16].gridColumnEnd))
        };
        memoizationDesktopObj[pictures.length - 2] = {
            gridRowStart: String(Number(memoizationDesktopObj[pictures.length - 12].gridRowStart) + 3),
            gridRowEnd: String(Number(memoizationDesktopObj[pictures.length - 12].gridRowEnd) + 3),
            gridColumnStart: String(Number(memoizationDesktopObj[pictures.length - 12].gridColumnStart)),
            gridColumnEnd: String(Number(memoizationDesktopObj[pictures.length - 12].gridColumnEnd))
        };
    }
}

function changeView(mediaQuery) {
    if (mediaQuery.matches) {
        const imgBlock = getImages();
        const colStart = "1";
        const colEnd = "3";
        mobileView();
        imgBlock.forEach((img, i) => {
            let parent = img.parentNode;
            for (let key in memoizationMobileObj) {
                if (i === Number(key)) {
                    parent.style.gridRowStart = memoizationMobileObj[i].gridRowStart;
                    parent.style.gridRowEnd = memoizationMobileObj[i].gridRowEnd;
                    parent.style.gridColumnStart = colStart;
                    parent.style.gridColumnEnd = colEnd;
                }
                if (i === Number(key)) {
                    parent.style.gridRowStart = memoizationMobileObj[i].gridRowStart;
                    parent.style.gridRowEnd = memoizationMobileObj[i].gridRowEnd;
                    parent.style.gridColumnStart = colStart;
                    parent.style.gridColumnEnd = colEnd;
                }
            }
            const doubleSizeIndex = [Number(i + "0") + 4] || [Number(i + "0") + 8];
            const xxlIndex = Number(i + "0") + 7 || [Number(i + "0") + 9];
            if (imgBlock[doubleSizeIndex]) {
                imgBlock[Number(i + "0") + 4].classList.add("double-size");
                imgBlock[Number(i + "0") + 8].classList.add("double-size");
            }
            if (imgBlock[xxlIndex]) {
                imgBlock[Number(i + "0") + 7].classList.add("xxl");
                imgBlock[Number(i + "0") + 9].classList.add("xxl");
            }
        });
    } else {
        const imgBlock = getImages();
        desktopView();
        imgBlock.forEach((img, i) => {
            const parent = imgBlock[i].parentNode;
            for (let key in memoizationDesktopObj) {
                if (i === Number(key)) {
                    parent.style.gridRowStart = memoizationDesktopObj[i].gridRowStart;
                    parent.style.gridRowEnd = memoizationDesktopObj[i].gridRowEnd;
                    parent.style.gridColumnStart =
                        memoizationDesktopObj[i].gridColumnStart;
                    parent.style.gridColumnEnd = memoizationDesktopObj[i].gridColumnEnd;
                    imgBlock[Number(key)].classList.add("double-size");
                }
                if (img.classList.contains("xxl")) {
                    parent.removeAttribute("style");
                    img.classList.remove("xxl");
                }
            }
        });
    }
}
window.addEventListener("resize", () => {
    changeView(mediaQuery);
});

async function getData(url) {
    const arrOfPictures = getPictures().length;
    const response = await fetch(url);
    const json = await response.json();
    if (arrOfPictures > json.images.length) {
        return [...json.images.slice(0, json.images.length)];
    }
    if (arrOfPictures > 0) {
        return [...json.images.slice(0, arrOfPictures + 10)];
    }
    return json.images.slice(0, 10);
}

async function createPicture() {
    const fetchData = await getData(url);
    if (getPictures().length > fetchData.length){
        addMoreImgBtn.disabled = true;
        return;
    }
    for (let i = 0; i < 10; i++) {
        const pic = createPic();
        const img = createImage();
        section.appendChild(pic);
        pic.appendChild(img);
    }
}

(async () => {
    const fetchData = await getData(url);
    await createPicture();
    const pictures = getPictures();
    const imgBlock = getImages();
    fetchData.forEach((img, i) => {
        imgBlock[i].setAttribute("src", fetchData[i].url);
        imgBlock[i].setAttribute("site", fetchData[i].site);
        imgBlock[i].setAttribute("alt", `${fetchData[i].site} picture`);
        imgBlock[i].setAttribute("large_url", `${fetchData[i].large_url}`);
        imgBlock[i].classList.add("images");
    });
    desktopView();
    mobileView();
    changeView(mediaQuery);
    section.style.display = "grid";

    pictures.forEach(pic => {
        pic.addEventListener("mouseenter", () => {
            pic.style.cursor = "pointer";
            hover(pic);
        });
    });
    pictures.forEach(pic => {
        pic.addEventListener("mouseleave", () => {
            pic.style.cursor = "initial";
            unHover(pic);
        });
    });
    pictures.forEach(pic => {
        pic.addEventListener("click", () => {
            openLargeImage(pic);
        });
    });
})();

addMoreImgBtn.addEventListener("click", () => {
    (async function addMoreImages() {
        const fetchData = await getData(url);
        await createPicture();
        desktopView();
        mobileView();
        const imgBlock = getImages();
        fetchData.forEach((img, i) => {
            imgBlock[i].setAttribute("src", fetchData[i].url);
            imgBlock[i].setAttribute("site", fetchData[i].site);
            imgBlock[i].setAttribute("alt", `${fetchData[i].site} picture`);
            imgBlock[i].setAttribute("large_url", `${fetchData[i].large_url}`);
        });
        changeView(mediaQuery);
        if (Array.from(navButtons)[0].getAttribute("state")) {
            const activeBtn = Array.from(navButtons).filter(
                it => it.getAttribute("state") === "active"
            )[0].textContent;
            if (activeBtn !== "show all") {
                const blockImages = document.querySelectorAll("img");
                blockImages.forEach(img => {
                    if (img.getAttribute("site") !== activeBtn) {
                        const wrapper = img.parentNode;
                        const parent = wrapper.parentNode;
                        wrapper.style.display = "none";
                        parent.style.display = "grid";
                        width > 490
                            ? (parent.style.gridTemplateRows =
                                "repeat(auto-fill,minmax(210px,330px)")
                            : (parent.style.gridTemplateRows = "repeat(auto-fill,210px)");
                    }
                });
            }
        }
        addEffects();
    })();
});

function addEffects() {
    getPictures().forEach(pic => {
        pic.addEventListener("mouseenter", () => {
            pic.style.cursor = "pointer";
            hover(pic);
        });
    });
    getPictures().forEach(pic => {
        pic.addEventListener("mouseleave", () => {
            pic.style.cursor = "initial";
            unHover(pic);
        });
    });
    getPictures().forEach(pic => {
        pic.addEventListener("click", () => {
            openLargeImage(pic);
        });
    });
}

function filterSiteImg(btn) {
    const blockImages = getImages();
    blockImages.forEach(img => {
        if (img.getAttribute("site") !== btn) {
            const wrapper = img.parentNode;
            const parent = wrapper.parentNode;
            wrapper.style.display = 'none';
            parent.style.display = 'grid';
            width > 490
                ? (parent.style.gridTemplateRows =
                    "repeat(auto-fill,minmax(210px,330px)")
                : (parent.style.gridTemplateRows = "repeat(auto-fill,210px)");
        }
    });
}

navButtons.forEach((btn, i) => {
    btn.addEventListener("click", function () {
        const blockImages = getImages();
        blockImages.forEach(img => {
            const wrapper = img.parentNode;
            const parent = wrapper.parentNode;
            img.style.display = "grid";
            wrapper.style.display = "grid";
            parent.style.display = "grid";
        });
        filterSiteImg(btn.textContent);
        navButtons.forEach(bt => {
            bt.classList.remove('btn-colors-inverse');
            bt.classList.add('btn-colors');
            bt.setAttribute("state", "unactivated");
        });
        btn.classList.remove('btn-colors');
        btn.classList.add('btn-colors-inverse');
        btn.setAttribute("state", "active");
        if (i === 0) {
            navButtons.forEach(bt => {
                bt.classList.remove('btn-colors-inverse');
                bt.classList.add('btn-colors');
            });
            btn.classList.remove('btn-colors');
            btn.classList.add('btn-colors-inverse');
            blockImages.forEach(img => {
                const parent = img.parentNode;
                parent.style.display = "grid";
            });
        }
    })
});

function hover(wrapper) {
    const div = createDiv();
    const siteTag = createDiv();
    const img = wrapper.querySelector("img");
    img.classList.add('hover-effect');
    wrapper.appendChild(div);
    wrapper.appendChild(siteTag);
    wrapper.style.display = "grid";
    img.classList.add("img-hover");
    div.classList.add("div-bg");
    siteTag.classList.add("site-tag");
    siteTag.textContent = `#${img.getAttribute("site")}`;
    if (mediaQuery.matches) {
        if (img.classList.contains("xxl")) {
            div.classList.add("div-bg-mobile-xxl");
            siteTag.classList.add("site-tag-mobile-xxl");
        }

        if (img.classList.contains("double-size")) {
            div.classList.add("div-bg-mobile-double-size");
            siteTag.classList.add("site-tag-mobile-double-size");
        }
    } else {
        if (img.classList.contains("double-size")) {
            div.classList.add("div-bg-double-size");
            siteTag.classList.add("site-tag-double-size");
        }
    }
}

function unHover(parent) {
    const div = parent.querySelector(".div-bg");
    const siteTag = parent.querySelector(".site-tag");
    parent.removeChild(div);
    parent.removeChild(siteTag);
    parent.style.display = "grid";
}

function openLargeImage(pic) {
    const wrapper = createDiv(),
        close = createSpan(),
        img = createImage(),
        body = document.querySelector("body"),
        mainImg = pic.querySelector("img");
    img.setAttribute("src", mainImg.getAttribute("src"));
    img.classList.add("large-img");
    close.classList.add("close");
    close.textContent = "x";
    wrapper.classList.add("large-size");
    body.appendChild(wrapper);
    wrapper.appendChild(close);
    wrapper.appendChild(img);
    close.addEventListener("click", closeLargeImage);
    function closeLargeImage() {
        body.removeChild(wrapper);
    }
}
