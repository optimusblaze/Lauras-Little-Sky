/* =========================================================
   BASIC VARIABLES
========================================================= */

const TOTAL_STARS = 30;

let foundStars = 0;
let gameStarted = false;
let finalRevealStarted = false;

const discoveredStars = new Set();
const memoryStars = [];


/* =========================================================
   HISTORICAL SKY DATA
========================================================= */

window.HIP_STARS = [];
window.HIP_CONSTELLATION_LINES = [];


/* =========================================================
   DOM ELEMENTS
========================================================= */

const intro =
    document.getElementById("intro");

const startButton =
    document.getElementById("startButton");

const counter =
    document.getElementById("counter");

const foundCount =
    document.getElementById("foundCount");

const totalCount =
    document.getElementById("totalCount");

const memoryPanel =
    document.getElementById("memoryPanel");

const memoryText =
    document.getElementById("memoryText");

const closeMemory =
    document.getElementById("closeMemory");

const specialSky =
    document.getElementById("specialSky");

const specialTitle =
    document.getElementById("specialTitle");

const specialText =
    document.getElementById("specialText");

const closeSky =
    document.getElementById("closeSky");

const finalMessage =
    document.getElementById("finalMessage");

const historicalSky =
    document.getElementById("historicalSky");

const historicalSkyCanvas =
    document.getElementById("historicalSkyCanvas");

const historicalSkyTitle =
    document.getElementById("historicalSkyTitle");

const historicalSkyDate =
    document.getElementById("historicalSkyDate");

const closeHistoricalSky =
    document.getElementById("closeHistoricalSky");


/* =========================================================
   COUNTER
========================================================= */

totalCount.textContent = TOTAL_STARS;


/* =========================================================
   BACKGROUND STARS
========================================================= */

function createBackgroundStars() {

    const background =
        document.getElementById("background");

    for (let i = 0; i < 120; i++) {

        const star =
            document.createElement("div");

        star.className =
            "background-star";

        star.style.left =
            Math.random() * 100 + "%";

        star.style.top =
            Math.random() * 100 + "%";

        star.style.setProperty(
            "--duration",
            (
                1.5 +
                Math.random() * 4
            ) + "s"
        );

        star.style.animationDelay =
            (
                Math.random() * 4
            ) + "s";

        background.appendChild(star);
    }
}


/* =========================================================
   MEMORY DATA
========================================================= */

const memories = [

    {
        message:
            "The first date. Quayside Bar & Grill in Dundee, then going to watch Michael, snuggled up together.",
        type: "date",
        skyDate: "11 June 2026"
    },

    {
        message:
            "I like the little world we seem to have created.",
        type: "normal"
    },

    {
        message:
            "Doss = Great Tits!",
        type: "normal"
    },

    {
        message:
            "The way we can laugh so hard together that absolutely nothing else seems important.",
        type: "normal"
    },

    {
        message:
            "Your eyes. I could genuinely get lost in them.",
        type: "normal"
    },

    {
        message:
            "You moving my hair out of my face. Such a tiny thing, but I notice it every time.",
        type: "normal"
    },

    {
        message:
            "You remember the little things about me. More than you probably realise.",
        type: "normal"
    },

    {
        message:
            "You have so much patience with me, even when I am being very much me.",
        type: "normal"
    },

    {
        message:
            "I’m looking forward to getting to know everything about you.",
        type: "normal"
    },

    {
        message:
            "I want to get to know all your little habits, stories and strange ways of doing things.",
        type: "normal"
    },

    {
        message:
            "St Andrews. One of those places that is now attached to a Laura memory.",
        type: "normal"
    },

    {
        message:
            "Lunch in Arbroath.",
        type: "normal"
    },

    {
        message:
            "Costco and lunch in Aberdeen. Somehow even that became such a cute date.",
        type: "normal"
    },

    {
        message:
            "The blanket fort. The Little Mermaid. Bubbles. Fish. A crab. Completely ridiculous, and completely us.",
        type: "normal"
    },

    {
        message:
            "Your bum is unreal. This star was contractually obligated to mention it.",
        type: "normal"
    },

    {
        message:
            "You said, 'So I'm yours ok...' and I don't think I forgot that one.",
        type: "normal"
    },

    {
        message:
            "You said you are never going to get rid of me if I keep being cute. I said that's the aim. I'm still rather fond of that conversation.",
        type: "normal"
    },

    {
        message:
            "Pretty face, dangerous smile, excellent company.",
        type: "normal"
    },

    {
        message:
            "You replied that you don't want to be without me in your life. That one stayed with me.",
        type: "normal"
    },

    {
        message:
            "January 18th. Your day.",
        type: "birthday",
        skyDate: "18 January 1989"
    },

    {
        message:
            "18 January 1989. The day Laura arrived in the world.",
        type: "normal"
    },

    {
        message:
            "You have no business being this hot.",
        type: "normal"
    },

    {
        message:
            "You’re becoming one of my favourite people to make memories with.",
        type: "normal"
    },

    {
        message:
            "The little moments with you seem to stick around.",
        type: "normal"
    },

    {
        message:
            "You make me laugh. A lot. Sometimes at things that probably shouldn't be that funny.",
        type: "normal"
    },

    {
        message:
            "Remember when I hit a pigeon with the A4?",
        type: "normal"
    },

    {
        message:
            "You are remarkably easy to miss when you're not around.",
        type: "normal"
    },

    {
        message:
            "I like discovering the person behind all the little things I already know about you.",
        type: "normal"
    },

    {
        message:
            "There are already places, dates, words and tiny moments that make me think of you.",
        type: "normal"
    },

    {
        message:
            "And this is only the beginning of the things I get to remember.",
        type: "normal"
    }

];


/* =========================================================
   30 DIFFERENT CONSTELLATION PATTERNS
========================================================= */

const memoryConstellations = [

    [[0, 0], [20, 5], [40, 0], [60, 8], [80, 0]],

    [[0, 10], [15, 0], [30, 12], [45, 2], [60, 14], [80, 3]],

    [[0, 0], [15, 20], [30, 0], [45, 20], [60, 0]],

    [[0, 15], [15, 0], [30, 15], [45, 0], [60, 15]],

    [[0, 0], [10, 18], [20, 0], [30, 18], [40, 0]],

    [[0, 0], [20, 0], [40, 15], [20, 30], [0, 30]],

    [[0, 0], [20, 10], [40, 0], [60, 10], [80, 0], [40, 30]],

    [[0, 15], [15, 0], [30, 15], [45, 0], [60, 15], [30, 30]],

    [[0, 20], [10, 0], [20, 20], [30, 0], [40, 20]],

    [[0, 0], [15, 15], [30, 0], [45, 15], [60, 0], [75, 15]],

    [[0, 20], [15, 0], [30, 20], [45, 0], [60, 20]],

    [[0, 0], [10, 20], [20, 0], [30, 20], [40, 0], [50, 20]],

    [[0, 0], [20, 15], [40, 0], [20, 30], [60, 30]],

    [[0, 0], [20, 20], [40, 0], [60, 20], [80, 0]],

    [[0, 15], [15, 0], [30, 15], [45, 30], [60, 15], [75, 0]],

    [[0, 0], [20, 20], [40, 0], [60, 20], [80, 0], [40, 35]],

    [[0, 20], [15, 0], [30, 20], [45, 0], [60, 20], [30, 40]],

    [[0, 0], [10, 25], [20, 5], [30, 30], [40, 10], [50, 35]],

    [[0, 30], [15, 10], [30, 30], [45, 10], [60, 30], [75, 10]],

    [[0, 0], [10, 20], [25, 0], [40, 20], [55, 0], [70, 20]],

    [[0, 20], [15, 0], [30, 20], [45, 0], [60, 20], [75, 0]],

    [[0, 0], [15, 25], [30, 5], [45, 30], [60, 10], [75, 35]],

    [[0, 10], [15, 30], [30, 0], [45, 30], [60, 10], [75, 30]],

    [[0, 0], [20, 15], [40, 5], [60, 25], [80, 0]],

    [[0, 25], [15, 0], [30, 25], [45, 0], [60, 25], [75, 0]],

    [[0, 0], [15, 15], [30, 30], [45, 15], [60, 0]],

    [[0, 20], [20, 0], [40, 20], [60, 0], [80, 20]],

    [[0, 0], [20, 30], [40, 0], [60, 30], [80, 0]],

    [[0, 15], [15, 0], [30, 15], [45, 0], [60, 15], [75, 0]],

    [[0, 0], [15, 25], [30, 5], [45, 30], [60, 10], [75, 35]]

];


/* =========================================================
   CREATE MEMORY STARS
========================================================= */

function createMemoryStars() {

    memories.forEach((memory, index) => {

        const star =
            document.createElement("div");

        star.className =
            "memory-star";

        const x =
            7 +
            Math.random() * 86;

        const y =
            8 +
            Math.random() * 66;

        star.style.left =
            x + "%";

        star.style.top =
            y + "%";

        star.dataset.index =
            index;

        star.addEventListener(
            "click",
            () => {
                discoverStar(index, star);
            }
        );

        document.body.appendChild(star);

        memoryStars.push(star);
    });
}


/* =========================================================
   DISCOVER STAR
========================================================= */

function discoverStar(index, star) {

    if (!gameStarted) {
        return;
    }

    if (finalRevealStarted) {
        return;
    }

    // If this star has already been discovered,
    // simply reopen its memory instead of counting it again.
    if (discoveredStars.has(index)) {

        showMemory(memories[index]);

        // If this memory has a historical sky,
        // allow her to view that again too.
        if (memories[index].skyDate) {
            setTimeout(() => {
                showHistoricalSky(
                    memories[index].skyDate,
                    index
                );
            }, 700);
        }

        return;
    }

    // -----------------------------------------------------
    // FIRST TIME DISCOVERING THIS STAR
    // -----------------------------------------------------

    discoveredStars.add(index);

    foundStars++;

    foundCount.textContent = foundStars;

    // Make the discovered star glow
    star.classList.add("discovered");

    star.style.transform = "scale(2.6)";

    star.style.boxShadow =
        "0 0 12px rgba(255,255,255,1), " +
        "0 0 30px rgba(255,240,150,1), " +
        "0 0 60px rgba(255,210,80,.9), " +
        "0 0 90px rgba(255,210,80,.5)";

    // Show the memory
    showMemory(memories[index]);

    // -----------------------------------------------------
    // SHOW HISTORICAL SKY WHERE DATE EXISTS
    // -----------------------------------------------------

    if (memories[index].skyDate) {

        setTimeout(() => {

            showHistoricalSky(
                memories[index].skyDate,
                index
            );

        }, 700);
    }

    // -----------------------------------------------------
    // LAST STAR
    // -----------------------------------------------------

    if (foundStars === TOTAL_STARS) {

        setTimeout(() => {

            closeMemoryPanel();
            closeHistoricalSkyPanel();

            setTimeout(
                beginFinalReveal,
                1200
            );

        }, 3000);
    }
}

/* =========================================================
   SHOW MEMORY
========================================================= */

function showMemory(memory) {

    memoryText.textContent =
        memory.message;

    memoryPanel.classList.add(
        "visible"
    );
}


/* =========================================================
   CLOSE MEMORY
========================================================= */

function closeMemoryPanel() {

    memoryPanel.classList.remove(
        "visible"
    );
}

closeMemory.addEventListener(
    "click",
    closeMemoryPanel
);


/* =========================================================
   HISTORICAL SKY DATA LOADER
========================================================= */

async function loadHistoricalSkyData() {

    try {

        const starsResponse =
            await fetch(
                "data/hip_stars.json"
            );

        if (!starsResponse.ok) {

            throw new Error(
                "Could not load hip_stars.json"
            );
        }

        window.HIP_STARS =
            await starsResponse.json();


        const linesResponse =
            await fetch(
                "data/hip_constellation_lines.json"
            );

        if (!linesResponse.ok) {

            throw new Error(
                "Could not load hip_constellation_lines.json"
            );
        }

        window.HIP_CONSTELLATION_LINES =
            await linesResponse.json();


        console.log(
            "Historical sky data loaded."
        );

        console.log(
            `Stars: ${window.HIP_STARS.length}`
        );

        console.log(
            `Constellation connections: ${window.HIP_CONSTELLATION_LINES.length}`
        );

    }

    catch (error) {

        console.error(
            "Historical sky data failed to load:",
            error
        );
    }
}


/* =========================================================
   SHOW HISTORICAL SKY
========================================================= */

function showHistoricalSky(date, memoryIndex) {

    historicalSkyTitle.textContent =
        "The sky above us";

    historicalSkyDate.textContent =
        date;

    historicalSky.classList.add(
        "visible"
    );

    drawHistoricalSky(
        memoryIndex
    );
}


/* =========================================================
   DRAW HISTORICAL SKY
========================================================= */

function drawHistoricalSky(memoryIndex) {

    const canvas =
        historicalSkyCanvas;

    const ctx =
        canvas.getContext("2d");

    const width =
        canvas.width =
        window.innerWidth *
        window.devicePixelRatio;

    const height =
        canvas.height =
        window.innerHeight *
        window.devicePixelRatio;

    ctx.scale(
        window.devicePixelRatio,
        window.devicePixelRatio
    );

    const screenWidth =
        window.innerWidth;

    const screenHeight =
        window.innerHeight;


    /* -----------------------------------------------------
       DARK SKY
    ----------------------------------------------------- */

    const gradient =
        ctx.createRadialGradient(
            screenWidth / 2,
            screenHeight / 2,
            20,
            screenWidth / 2,
            screenHeight / 2,
            screenWidth
        );

    gradient.addColorStop(
        0,
        "rgba(25,45,90,0.85)"
    );

    gradient.addColorStop(
        1,
        "rgba(2,5,18,0.98)"
    );

    ctx.fillStyle =
        gradient;

    ctx.fillRect(
        0,
        0,
        screenWidth,
        screenHeight
    );


    /* -----------------------------------------------------
       USE REAL HIPPARCOS STAR DATA
    ----------------------------------------------------- */

    const stars =
        window.HIP_STARS || [];


    if (stars.length > 0) {

        stars.forEach(star => {

            const ra =
                Number(
                    star.ra ??
                    star.RA ??
                    star.right_ascension ??
                    0
                );

            const dec =
                Number(
                    star.dec ??
                    star.DEC ??
                    star.declination ??
                    0
                );

            const magnitude =
                Number(
                    star.mag ??
                    star.magnitude ??
                    star.vmag ??
                    5
                );

            if (
                !Number.isFinite(ra) ||
                !Number.isFinite(dec)
            ) {
                return;
            }


            /*
                Convert RA / DEC into a simple
                celestial projection.

                This preserves the actual
                star positions contained
                in the JSON data.
            */

            const x =
                (
                    ((ra % 24) / 24) *
                    screenWidth
                );

            const y =
                (
                    (90 - dec) /
                    180 *
                    screenHeight
                );


            const brightness =
                Math.max(
                    0.7,
                    Math.min(
                        4,
                        5.5 - magnitude
                    )
                );

            const radius =
                Math.max(
                    0.45,
                    brightness * 0.45
                );


            ctx.beginPath();

            ctx.arc(
                x,
                y,
                radius,
                0,
                Math.PI * 2
            );

            ctx.fillStyle =
                `rgba(255,248,220,${Math.min(
                    1,
                    0.35 +
                    brightness * 0.14
                )})`;

            ctx.shadowBlur =
                brightness * 2;

            ctx.shadowColor =
                "rgba(255,235,170,0.8)";

            ctx.fill();

        });

    }


    /* -----------------------------------------------------
       DRAW ONE OF 30 UNIQUE MEMORY CONSTELLATIONS
    ----------------------------------------------------- */

    drawMemoryConstellation(
        ctx,
        memoryIndex,
        screenWidth,
        screenHeight
    );


    ctx.shadowBlur = 0;
}


/* =========================================================
   DRAW UNIQUE MEMORY CONSTELLATION
========================================================= */

function drawMemoryConstellation(
    ctx,
    memoryIndex,
    width,
    height
) {

    const pattern =
        memoryConstellations[
        memoryIndex %
        memoryConstellations.length
        ];

    const startX =
        width * 0.25;

    const startY =
        height * 0.35;

    const scaleX =
        width * 0.006;

    const scaleY =
        height * 0.006;


    const points =
        pattern.map(point => {

            return {
                x:
                    startX +
                    point[0] *
                    scaleX,

                y:
                    startY +
                    point[1] *
                    scaleY
            };

        });


    /* -----------------------------------------------------
       LINES
    ----------------------------------------------------- */

    ctx.beginPath();

    points.forEach((point, index) => {

        if (index === 0) {

            ctx.moveTo(
                point.x,
                point.y
            );

        }
        else {

            ctx.lineTo(
                point.x,
                point.y
            );

        }

    });

    ctx.strokeStyle =
        "rgba(255,240,170,0.55)";

    ctx.lineWidth =
        1;

    ctx.shadowBlur =
        8;

    ctx.shadowColor =
        "rgba(255,220,120,0.45)";

    ctx.stroke();


    /* -----------------------------------------------------
       CONSTELLATION STARS
    ----------------------------------------------------- */

    points.forEach(point => {

        ctx.beginPath();

        ctx.arc(
            point.x,
            point.y,
            3,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            "#fff8d5";

        ctx.shadowBlur =
            15;

        ctx.shadowColor =
            "rgba(255,220,120,1)";

        ctx.fill();

    });
}


/* =========================================================
   CLOSE HISTORICAL SKY
========================================================= */

function closeHistoricalSkyPanel() {

    historicalSky.classList.remove(
        "visible"
    );
}

closeHistoricalSky.addEventListener(
    "click",
    closeHistoricalSkyPanel
);


/* =========================================================
   SPECIAL SKY
========================================================= */

function showSpecialSky(title, text) {

    specialTitle.textContent =
        title;

    specialText.textContent =
        text;

    specialSky.classList.add(
        "visible"
    );
}

closeSky.addEventListener(
    "click",
    () => {

        specialSky.classList.remove(
            "visible"
        );

    }
);


/* =========================================================
   START
========================================================= */

startButton.addEventListener(
    "click",
    () => {

        gameStarted = true;

        intro.classList.add(
            "hidden"
        );

        counter.classList.add(
            "visible"
        );


        memoryStars.forEach(
            star => {

                star.classList.add(
                    "active"
                );

            }
        );

    }
);


/* =========================================================
   FINAL REVEAL
========================================================= */

function beginFinalReveal() {

    if (finalRevealStarted) {
        return;
    }

    finalRevealStarted = true;


    counter.classList.remove(
        "visible"
    );


    memoryStars.forEach(
        (star, index) => {

            const angle =
                (
                    index /
                    memoryStars.length
                ) *
                Math.PI *
                2;

            const distance =
                15 +
                Math.random() * 18;

            const newX =
                50 +
                Math.cos(angle) *
                distance;

            const newY =
                50 +
                Math.sin(angle) *
                distance;

            star.style.left =
                newX + "%";

            star.style.top =
                newY + "%";

            star.style.opacity =
                "0.25";

            star.style.transform =
                "scale(.6)";

            star.style.pointerEvents =
                "none";

        }
    );


    setTimeout(
        createLauraConstellation,
        1800
    );
}


/* =========================================================
   LAURA CONSTELLATION
========================================================= */

/*
    These are NEW stars.
    They are deliberately independent
    from the 30 memory stars.

    The coordinates form:

        L   A   U   R   A
*/

const lauraCoordinates = [

    /* =========================
       L
    ========================= */

    [12, 28],
    [12, 34],
    [12, 40],
    [12, 46],
    [12, 52],
    [18, 52],


    /* =========================
       A
    ========================= */

    [25, 52],
    [27, 45],
    [29, 38],
    [31, 31],
    [33, 38],
    [35, 45],
    [37, 52],

    /* A crossbar */

    [27.5, 43],
    [34.5, 43],


    /* =========================
       U
    ========================= */

    [44, 28],
    [44, 36],
    [44, 44],
    [46, 50],
    [50, 52],
    [54, 50],
    [56, 44],
    [56, 36],
    [56, 28],


    /* =========================
       R
    ========================= */

    [63, 52],
    [63, 28],
    [69, 28],
    [73, 31],
    [73, 36],
    [69, 40],
    [63, 40],

    /* R diagonal leg */

    [68, 42],
    [73, 52],


    /* =========================
       A
    ========================= */

    [81, 52],
    [83, 45],
    [85, 38],
    [87, 31],
    [89, 38],
    [91, 45],
    [93, 52],

    /* A crossbar */

    [83.5, 43],
    [90.5, 43]

];


/* =========================================================
   CONSTELLATION CONNECTIONS
========================================================= */

const lauraConnections = [

    /* =========================
       L
    ========================= */

    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
    [4, 5],


    /* =========================
       A
    ========================= */

    [6, 7],
    [7, 8],
    [8, 9],
    [9, 10],
    [10, 11],
    [11, 12],

    /* Crossbar */

    [13, 14],


    /* =========================
       U
    ========================= */

    [15, 16],
    [16, 17],
    [17, 18],
    [18, 19],
    [19, 20],
    [20, 21],
    [21, 22],
    [22, 23],


    /* =========================
       R
    ========================= */

    [24, 25],
    [25, 26],
    [26, 27],
    [27, 28],
    [28, 29],
    [29, 30],

    /* Corrected R diagonal */

    [29, 31],
    [31, 32],


    /* =========================
       A
    ========================= */

    [33, 34],
    [34, 35],
    [35, 36],
    [36, 37],
    [37, 38],
    [38, 39],

    /* Crossbar */

    [40, 41]

];


/* =========================================================
   CREATE LAURA CONSTELLATION
========================================================= */

function createLauraConstellation() {

    const finalStars = [];


    /*
        Create every star at a random
        location first.
    */

    lauraCoordinates.forEach(
        (coordinate, index) => {

            const star =
                document.createElement("div");

            star.className =
                "final-star";


            /*
                Random starting position.
            */

            star.style.left =
                (
                    5 +
                    Math.random() * 90
                ) + "%";

            star.style.top =
                (
                    5 +
                    Math.random() * 90
                ) + "%";

            document.body.appendChild(
                star
            );

            finalStars.push(
                star
            );


            /*
                Slowly move the star
                into its LAURA position.
            */

            setTimeout(() => {

                star.style.left =
                    coordinate[0] + "%";

                star.style.top =
                    coordinate[1] + "%";

                star.classList.add(
                    "arrived"
                );

            }, 100 + index * 55);

        }
    );


    /*
        Wait for the stars to arrive,
        then start drawing the lines.
    */

    setTimeout(() => {

        drawLauraLines(
            finalStars
        );

    }, 3800);


    /*
        Finally reveal the message.
    */

    setTimeout(() => {

        finalMessage.classList.add(
            "visible"
        );

    }, 5200);

}


/* =========================================================
   DRAW LAURA LINES
========================================================= */

function drawLauraLines(stars) {

    lauraConnections.forEach(
        (connection, index) => {

            const starA =
                stars[
                connection[0]
                ];

            const starB =
                stars[
                connection[1]
                ];

            if (!starA || !starB) {
                return;
            }


            /*
                Draw each line slightly
                after the previous one.
            */

            setTimeout(() => {

                drawLineBetween(
                    starA,
                    starB
                );

            }, index * 80);

        }
    );


    /*
        Once all lines are drawn,
        make the whole name glow.
    */

    setTimeout(() => {

        stars.forEach(
            star => {

                star.classList.add(
                    "name-complete"
                );

            }
        );

    }, lauraConnections.length * 80 + 1000);

}


/* =========================================================
   DRAW LINE BETWEEN TWO STARS
========================================================= */

function drawLineBetween(
    starA,
    starB
) {

    const rectA =
        starA.getBoundingClientRect();

    const rectB =
        starB.getBoundingClientRect();


    const x1 =
        rectA.left +
        rectA.width / 2;

    const y1 =
        rectA.top +
        rectA.height / 2;

    const x2 =
        rectB.left +
        rectB.width / 2;

    const y2 =
        rectB.top +
        rectB.height / 2;


    const dx =
        x2 - x1;

    const dy =
        y2 - y1;


    const distance =
        Math.sqrt(
            dx * dx +
            dy * dy
        );


    const angle =
        Math.atan2(
            dy,
            dx
        ) *
        180 /
        Math.PI;


    const line =
        document.createElement(
            "div"
        );

    line.className =
        "final-line";

    line.style.left =
        x1 + "px";

    line.style.top =
        y1 + "px";

    line.style.width =
        distance + "px";

    line.style.transform =
        `rotate(${angle}deg)`;


    document.body.appendChild(
        line
    );


    /*
        Trigger the CSS opacity
        transition.
    */

    requestAnimationFrame(() => {

        line.classList.add(
            "visible"
        );

    });

}


/* =========================================================
   INITIALISE
========================================================= */

createBackgroundStars();

createMemoryStars();

loadHistoricalSkyData();