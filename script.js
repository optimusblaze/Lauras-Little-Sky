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

let historicalSkyDataLoaded = false;


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
    document.getElementById(
        "historicalSkyCanvas"
    );

const historicalSkyTitle =
    document.getElementById(
        "historicalSkyTitle"
    );

const historicalSkyDate =
    document.getElementById(
        "historicalSkyDate"
    );

const historicalSkyStatus =
    document.getElementById(
        "historicalSkyStatus"
    );

const closeHistoricalSky =
    document.getElementById(
        "closeHistoricalSky"
    );


/* =========================================================
   COUNTER
========================================================= */

totalCount.textContent =
    TOTAL_STARS;


/* =========================================================
   BACKGROUND STARS
========================================================= */

function createBackgroundStars() {

    const background =
        document.getElementById(
            "background"
        );

    for (
        let i = 0;
        i < 120;
        i++
    ) {

        const star =
            document.createElement(
                "div"
            );

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

        background.appendChild(
            star
        );
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

    memories.forEach(
        (memory, index) => {

            const star =
                document.createElement(
                    "div"
                );

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

                    discoverStar(
                        index,
                        star
                    );

                }
            );

            document.body.appendChild(
                star
            );

            memoryStars.push(
                star
            );
        }
    );
}


/* =========================================================
   DISCOVER STAR
========================================================= */

function discoverStar(
    index,
    star
) {

    if (!gameStarted) {
        return;
    }

    if (finalRevealStarted) {
        return;
    }


    /* -----------------------------------------------------
       ALREADY DISCOVERED
    ----------------------------------------------------- */

    if (
        discoveredStars.has(index)
    ) {

        showMemory(
            memories[index]
        );

        if (
            memories[index].skyDate
        ) {

            setTimeout(
                () => {

                    showHistoricalSky(
                        memories[index].skyDate,
                        index
                    );

                },
                500
            );

        }

        return;
    }


    /* -----------------------------------------------------
       FIRST DISCOVERY
    ----------------------------------------------------- */

    discoveredStars.add(
        index
    );

    foundStars++;

    foundCount.textContent =
        foundStars;

    star.classList.add(
        "discovered"
    );

    star.style.transform =
        "scale(2.6)";

    star.style.boxShadow =
        "0 0 12px rgba(255,255,255,1), " +
        "0 0 30px rgba(255,240,150,1), " +
        "0 0 60px rgba(255,210,80,.9), " +
        "0 0 90px rgba(255,210,80,.5)";


    /* -----------------------------------------------------
       SHOW MEMORY
    ----------------------------------------------------- */

    showMemory(
        memories[index]
    );


    /* -----------------------------------------------------
       SHOW HISTORICAL SKY
    ----------------------------------------------------- */

    if (
        memories[index].skyDate
    ) {

        setTimeout(
            () => {

                showHistoricalSky(
                    memories[index].skyDate,
                    index
                );

            },
            500
        );

    }


    /* -----------------------------------------------------
       LAST STAR
    ----------------------------------------------------- */

    if (
        foundStars === TOTAL_STARS
    ) {

        setTimeout(
            () => {

                closeMemoryPanel();

                closeHistoricalSkyPanel();

                setTimeout(
                    beginFinalReveal,
                    1200
                );

            },
            3000
        );

    }

}


/* =========================================================
   SHOW MEMORY
========================================================= */

function showMemory(
    memory
) {

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

    console.log(
        "Loading historical sky data..."
    );

    try {

        const starsResponse =
            await fetch(
                "data/hip_stars.json",
                {
                    cache: "no-cache"
                }
            );


        if (!starsResponse.ok) {

            throw new Error(
                `hip_stars.json returned HTTP ${starsResponse.status}`
            );

        }


        const starsData =
            await starsResponse.json();


        if (
            !Array.isArray(starsData)
        ) {

            throw new Error(
                "hip_stars.json is not an array"
            );

        }


        window.HIP_STARS =
            starsData;


        const linesResponse =
            await fetch(
                "data/hip_constellation_lines.json",
                {
                    cache: "no-cache"
                }
            );


        if (!linesResponse.ok) {

            throw new Error(
                `hip_constellation_lines.json returned HTTP ${linesResponse.status}`
            );

        }


        const linesData =
            await linesResponse.json();


        if (
            !Array.isArray(linesData)
        ) {

            throw new Error(
                "hip_constellation_lines.json is not an array"
            );

        }


        window.HIP_CONSTELLATION_LINES =
            linesData;


        historicalSkyDataLoaded =
            true;


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

        historicalSkyDataLoaded =
            false;

        console.error(
            "Historical sky data failed to load:",
            error
        );

    }

}


/* =========================================================
   SHOW HISTORICAL SKY
========================================================= */

async function showHistoricalSky(
    date,
    memoryIndex
) {

    historicalSkyTitle.textContent =
        "The sky above us";

    historicalSkyDate.textContent =
        date;

    historicalSkyStatus.textContent =
        "Looking back at the stars...";


    historicalSky.classList.add(
        "visible"
    );


    /*
        Wait for the browser to actually
        display the panel before measuring
        and drawing the canvas.
    */

    await new Promise(
        resolve => {

            requestAnimationFrame(
                () => {

                    requestAnimationFrame(
                        resolve
                    );

                }
            );

        }
    );


    /*
        If the data has not finished loading,
        wait for it.
    */

    if (
        !historicalSkyDataLoaded
    ) {

        historicalSkyStatus.textContent =
            "Preparing the stars...";


        /*
            Usually the data is already loaded,
            but this gives us a safety net.
        */

        await loadHistoricalSkyData();

    }


    if (
        historicalSkyDataLoaded
    ) {

        historicalSkyStatus.textContent =
            "The stars from above";


        drawHistoricalSky(
            memoryIndex
        );

    }
    else {

        historicalSkyStatus.textContent =
            "The stars could not be loaded.";

    }

}


/* =========================================================
   SET CANVAS SIZE
========================================================= */

function resizeHistoricalSkyCanvas() {

    const canvas =
        historicalSkyCanvas;

    if (!canvas) {
        return null;
    }


    const width =
        window.innerWidth;

    const height =
        window.innerHeight;

    const dpr =
        Math.min(
            window.devicePixelRatio || 1,
            2
        );


    /*
        Set the actual drawing resolution.
    */

    canvas.width =
        Math.floor(
            width * dpr
        );

    canvas.height =
        Math.floor(
            height * dpr
        );


    /*
        Keep CSS dimensions at normal
        screen size.
    */

    canvas.style.width =
        width + "px";

    canvas.style.height =
        height + "px";


    const ctx =
        canvas.getContext(
            "2d"
        );


    /*
        Reset the transform every time
        so repeated redraws do not
        multiply the scale.
    */

    ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
    );


    return {
        ctx,
        width,
        height,
        dpr
    };

}


/* =========================================================
   DRAW HISTORICAL SKY
========================================================= */

function drawHistoricalSky(
    memoryIndex
) {

    const canvasInfo =
        resizeHistoricalSkyCanvas();


    if (!canvasInfo) {
        return;
    }


    const {
        ctx,
        width,
        height
    } = canvasInfo;


    /*
        Clear everything.
    */

    ctx.clearRect(
        0,
        0,
        width,
        height
    );


    /* =====================================================
       SKY BACKGROUND
    ===================================================== */

    const gradient =
        ctx.createRadialGradient(
            width / 2,
            height * 0.45,
            10,
            width / 2,
            height * 0.45,
            Math.max(
                width,
                height
            ) * 0.8
        );


    gradient.addColorStop(
        0,
        "#172d58"
    );

    gradient.addColorStop(
        0.35,
        "#0b1734"
    );

    gradient.addColorStop(
        0.7,
        "#050b20"
    );

    gradient.addColorStop(
        1,
        "#01030b"
    );


    ctx.fillStyle =
        gradient;


    ctx.fillRect(
        0,
        0,
        width,
        height
    );


    /* =====================================================
       REAL HIPPARCOS STARS
    ===================================================== */

    const stars =
        window.HIP_STARS || [];


    console.log(
        "Drawing historical sky.",
        "Stars:",
        stars.length
    );


    if (
        stars.length > 0
    ) {

        stars.forEach(
            star => {

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
                    RA is normally in hours.

                    Convert:

                    0h  -> left
                    24h -> right
                */

                let normalisedRA =
                    ra % 24;

                if (
                    normalisedRA < 0
                ) {

                    normalisedRA += 24;

                }


                const x =
                    (
                        normalisedRA /
                        24
                    ) * width;


                /*
                    DEC:

                    +90 = top
                    0   = middle
                    -90 = bottom
                */

                const y =
                    (
                        (90 - dec) /
                        180
                    ) * height;


                /*
                    Bright stars get bigger
                    and brighter.
                */

                const brightness =
                    Math.max(
                        0.35,
                        Math.min(
                            4.5,
                            6.5 - magnitude
                        )
                    );


                const radius =
                    Math.max(
                        0.35,
                        brightness * 0.55
                    );


                const alpha =
                    Math.max(
                        0.18,
                        Math.min(
                            0.95,
                            0.25 +
                            brightness * 0.13
                        )
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
                    `rgba(
                        255,
                        248,
                        225,
                        ${alpha}
                    )`;


                ctx.shadowBlur =
                    Math.min(
                        10,
                        brightness * 2
                    );


                ctx.shadowColor =
                    "rgba(255,235,170,0.8)";


                ctx.fill();

            }
        );

    }


    /*
        Turn off shadows before drawing
        the constellation.
    */

    ctx.shadowBlur = 0;


    /* =====================================================
       REAL CONSTELLATION CONNECTIONS
    ===================================================== */

    drawRealConstellationLines(
        ctx,
        width,
        height
    );


    /* =====================================================
       MEMORY CONSTELLATION
    ===================================================== */

    drawMemoryConstellation(
        ctx,
        memoryIndex,
        width,
        height
    );


    ctx.shadowBlur = 0;

}


/* =========================================================
   DRAW REAL CONSTELLATION CONNECTIONS
========================================================= */

function drawRealConstellationLines(
    ctx,
    width,
    height
) {

    const lines =
        window.HIP_CONSTELLATION_LINES || [];


    if (
        lines.length === 0
    ) {

        return;

    }


    /*
        Build a lookup table.

        This supports common formats such as:

        {
            "hip1": 123,
            "hip2": 456
        }

        or:

        {
            "from": 123,
            "to": 456
        }

        or arrays:

        [123, 456]
    */

    const starLookup =
        new Map();


    window.HIP_STARS.forEach(
        star => {

            const hip =
                star.hip ??
                star.HIP ??
                star.id ??
                star.HIP_ID ??
                star.hip_id;

            if (
                hip !== undefined
            ) {

                starLookup.set(
                    String(hip),
                    star
                );

            }

        }
    );


    ctx.save();


    ctx.strokeStyle =
        "rgba(150,180,230,0.10)";

    ctx.lineWidth = 0.6;

    ctx.shadowBlur = 0;


    lines.forEach(
        line => {

            let firstId;
            let secondId;


            if (
                Array.isArray(line)
            ) {

                firstId =
                    line[0];

                secondId =
                    line[1];

            }
            else {

                firstId =
                    line.hip1 ??
                    line.from ??
                    line.start ??
                    line.a ??
                    line.star1;

                secondId =
                    line.hip2 ??
                    line.to ??
                    line.end ??
                    line.b ??
                    line.star2;

            }


            if (
                firstId === undefined ||
                secondId === undefined
            ) {

                return;

            }


            const firstStar =
                starLookup.get(
                    String(firstId)
                );

            const secondStar =
                starLookup.get(
                    String(secondId)
                );


            if (
                !firstStar ||
                !secondStar
            ) {

                return;

            }


            const ra1 =
                Number(
                    firstStar.ra ??
                    firstStar.RA ??
                    firstStar.right_ascension
                );

            const dec1 =
                Number(
                    firstStar.dec ??
                    firstStar.DEC ??
                    firstStar.declination
                );

            const ra2 =
                Number(
                    secondStar.ra ??
                    secondStar.RA ??
                    secondStar.right_ascension
                );

            const dec2 =
                Number(
                    secondStar.dec ??
                    secondStar.DEC ??
                    secondStar.declination
                );


            if (
                !Number.isFinite(ra1) ||
                !Number.isFinite(dec1) ||
                !Number.isFinite(ra2) ||
                !Number.isFinite(dec2)
            ) {

                return;

            }


            const x1 =
                (
                    ((ra1 % 24) + 24) % 24
                    / 24
                ) * width;


            const y1 =
                (
                    (90 - dec1) /
                    180
                ) * height;


            const x2 =
                (
                    ((ra2 % 24) + 24) % 24
                    / 24
                ) * width;


            const y2 =
                (
                    (90 - dec2) /
                    180
                ) * height;


            ctx.beginPath();

            ctx.moveTo(
                x1,
                y1
            );

            ctx.lineTo(
                x2,
                y2
            );

            ctx.stroke();

        }
    );


    ctx.restore();

}


/* =========================================================
   DRAW MEMORY CONSTELLATION
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
        pattern.map(
            point => {

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

            }
        );


    /* =====================================================
       LINES
    ===================================================== */

    ctx.save();


    ctx.beginPath();


    points.forEach(
        (point, index) => {

            if (
                index === 0
            ) {

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

        }
    );


    ctx.strokeStyle =
        "rgba(255,240,170,0.65)";

    ctx.lineWidth = 1.5;

    ctx.shadowBlur = 10;

    ctx.shadowColor =
        "rgba(255,220,120,0.65)";


    ctx.stroke();


    /* =====================================================
       CONSTELLATION STARS
    ===================================================== */

    points.forEach(
        point => {

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


            ctx.shadowBlur = 16;

            ctx.shadowColor =
                "rgba(255,220,120,1)";


            ctx.fill();

        }
    );


    ctx.restore();

}


/* =========================================================
   RESIZE HISTORICAL SKY
========================================================= */

window.addEventListener(
    "resize",
    () => {

        if (
            historicalSky.classList.contains(
                "visible"
            )
        ) {

            const visibleMemory =
                findVisibleHistoricalMemory();


            drawHistoricalSky(
                visibleMemory
            );

        }

    }
);


/* =========================================================
   FIND CURRENT HISTORICAL MEMORY
========================================================= */

function findVisibleHistoricalMemory() {

    /*
        The historical sky is only opened
        from a memory containing skyDate.

        Find the most recently discovered
        matching memory.
    */

    for (
        let i = memories.length - 1;
        i >= 0;
        i--
    ) {

        if (
            discoveredStars.has(i) &&
            memories[i].skyDate
        ) {

            return i;

        }

    }


    return 0;

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

function showSpecialSky(
    title,
    text
) {

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

    if (
        finalRevealStarted
    ) {

        return;

    }


    finalRevealStarted =
        true;


    counter.classList.remove(
        "visible"
    );


    memoryStars.forEach(
        (
            star,
            index
        ) => {

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

const lauraCoordinates = [

    /* L */

    [12, 28],
    [12, 34],
    [12, 40],
    [12, 46],
    [12, 52],
    [18, 52],


    /* A */

    [25, 52],
    [27, 45],
    [29, 38],
    [31, 31],
    [33, 38],
    [35, 45],
    [37, 52],

    [27.5, 43],
    [34.5, 43],


    /* U */

    [44, 28],
    [44, 36],
    [44, 44],
    [46, 50],
    [50, 52],
    [54, 50],
    [56, 44],
    [56, 36],
    [56, 28],


    /* R */

    [63, 52],
    [63, 28],
    [69, 28],
    [73, 31],
    [73, 36],
    [69, 40],
    [63, 40],

    [68, 42],
    [73, 52],


    /* A */

    [81, 52],
    [83, 45],
    [85, 38],
    [87, 31],
    [89, 38],
    [91, 45],
    [93, 52],

    [83.5, 43],
    [90.5, 43]

];


const lauraConnections = [

    /* L */

    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
    [4, 5],


    /* A */

    [6, 7],
    [7, 8],
    [8, 9],
    [9, 10],
    [10, 11],
    [11, 12],

    [13, 14],


    /* U */

    [15, 16],
    [16, 17],
    [17, 18],
    [18, 19],
    [19, 20],
    [20, 21],
    [21, 22],
    [22, 23],


    /* R */

    [24, 25],
    [25, 26],
    [26, 27],
    [27, 28],
    [28, 29],
    [29, 30],

    [29, 31],
    [31, 32],


    /* A */

    [33, 34],
    [34, 35],
    [35, 36],
    [36, 37],
    [37, 38],
    [38, 39],

    [40, 41]

];


/* =========================================================
   CREATE LAURA CONSTELLATION
========================================================= */

function createLauraConstellation() {

    const finalStars = [];


    lauraCoordinates.forEach(
        (
            coordinate,
            index
        ) => {

            const star =
                document.createElement(
                    "div"
                );


            star.className =
                "final-star";


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


            setTimeout(
                () => {

                    star.style.left =
                        coordinate[0] + "%";


                    star.style.top =
                        coordinate[1] + "%";


                    star.classList.add(
                        "arrived"
                    );

                },
                100 +
                index * 55
            );

        }
    );


    setTimeout(
        () => {

            drawLauraLines(
                finalStars
            );

        },
        3800
    );


    setTimeout(
        () => {

            finalMessage.classList.add(
                "visible"
            );

        },
        5200
    );

}


/* =========================================================
   DRAW LAURA LINES
========================================================= */

function drawLauraLines(
    stars
) {

    lauraConnections.forEach(
        (
            connection,
            index
        ) => {

            const starA =
                stars[
                    connection[0]
                ];


            const starB =
                stars[
                    connection[1]
                ];


            if (
                !starA ||
                !starB
            ) {

                return;

            }


            setTimeout(
                () => {

                    drawLineBetween(
                        starA,
                        starB
                    );

                },
                index * 80
            );

        }
    );


    setTimeout(
        () => {

            stars.forEach(
                star => {

                    star.classList.add(
                        "name-complete"
                    );

                }
            );

        },
        lauraConnections.length *
            80 +
            1000
    );

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


    requestAnimationFrame(
        () => {

            line.classList.add(
                "visible"
            );

        }
    );

}


/* =========================================================
   INITIALISE
========================================================= */

createBackgroundStars();

createMemoryStars();

loadHistoricalSkyData();
