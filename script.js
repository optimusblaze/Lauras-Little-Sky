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

const historicalSkyLocation =
    document.getElementById("historicalSkyLocation");

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
            (1.5 + Math.random() * 4) + "s"
        );

        star.style.animationDelay =
            (Math.random() * 4) + "s";

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
   MEMORY CONSTELLATIONS
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
            7 + Math.random() * 86;

        const y =
            8 + Math.random() * 70;

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

    /*
       IMPORTANT:
       We no longer permanently block discovered stars.

       This means Laura can click a star again later
       to reread its memory.
    */

    discoveredStars.add(index);

    if (!star.classList.contains("discovered")) {

        foundStars++;

        foundCount.textContent =
            foundStars;

        star.classList.add("discovered");

    }

    star.style.transform =
        "scale(2.6)";

    star.style.boxShadow =
        "0 0 12px rgba(255,255,255,1)," +
        "0 0 30px rgba(255,240,150,1)," +
        "0 0 60px rgba(255,210,80,.9)," +
        "0 0 90px rgba(255,210,80,.5)";


    showMemory(memories[index]);


    /*
       Show real historical sky
       if this memory has a date.
    */

    if (memories[index].skyDate) {

        setTimeout(() => {

            showHistoricalSky(
                memories[index].skyDate,
                index
            );

        }, 700);

    }


    /*
       LAST STAR
    */

    if (
        foundStars === TOTAL_STARS &&
        !finalRevealStarted
    ) {

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
   DATE PARSER
========================================================= */

function parseSkyDate(dateString) {

    /*
       Default time:
       10:00 PM

       This is what we use for memories where
       only the date is supplied.
    */

    const parts =
        dateString.match(
            /(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})/
        );

    if (!parts) {

        return new Date(
            "2026-06-11T22:00:00"
        );

    }

    const day =
        Number(parts[1]);

    const monthName =
        parts[2];

    const year =
        Number(parts[3]);


    const months = {

        January: 0,
        February: 1,
        March: 2,
        April: 3,
        May: 4,
        June: 5,
        July: 6,
        August: 7,
        September: 8,
        October: 9,
        November: 10,
        December: 11

    };


    return new Date(
        year,
        months[monthName],
        day,
        22,
        0,
        0
    );
}


/* =========================================================
   JULIAN DATE
========================================================= */

function getJulianDate(date) {

    return (
        date.getTime() / 86400000
    ) + 2440587.5;

}


/* =========================================================
   GREENWICH SIDEREAL TIME
========================================================= */

function getGMST(date) {

    const JD =
        getJulianDate(date);

    const T =
        (JD - 2451545.0) / 36525;


    let gmst =
        280.46061837 +
        360.98564736629 *
        (JD - 2451545.0) +
        0.000387933 * T * T -
        (T * T * T) / 38710000;


    gmst =
        ((gmst % 360) + 360) % 360;


    return gmst;

}


/* =========================================================
   LOCAL SIDEREAL TIME
========================================================= */

function getLST(date, longitude) {

    let lst =
        getGMST(date) +
        longitude;


    lst =
        ((lst % 360) + 360) % 360;


    return lst;

}


/* =========================================================
   RA / DEC → ALT / AZ
========================================================= */

function raDecToAltAz(
    raHours,
    decDegrees,
    date,
    latitude,
    longitude
) {

    const lst =
        getLST(date, longitude);


    const raDegrees =
        raHours * 15;


    let hourAngle =
        lst - raDegrees;


    hourAngle =
        ((hourAngle + 180) % 360) - 180;


    const H =
        hourAngle * Math.PI / 180;

    const dec =
        decDegrees * Math.PI / 180;

    const lat =
        latitude * Math.PI / 180;


    const sinAlt =
        Math.sin(dec) *
        Math.sin(lat) +

        Math.cos(dec) *
        Math.cos(lat) *
        Math.cos(H);


    const altitude =
        Math.asin(
            Math.max(
                -1,
                Math.min(1, sinAlt)
            )
        );


    const azimuth =
        Math.atan2(

            -Math.sin(H) *
            Math.cos(dec),

            Math.sin(dec) *
            Math.cos(lat) -

            Math.cos(dec) *
            Math.sin(lat) *
            Math.cos(H)

        );


    let az =
        azimuth * 180 / Math.PI;


    az =
        (az + 360) % 360;


    return {

        altitude:
            altitude * 180 / Math.PI,

        azimuth:
            az

    };

}


/* =========================================================
   SHOW HISTORICAL SKY
========================================================= */

function showHistoricalSky(
    dateString,
    memoryIndex
) {

    historicalSkyTitle.textContent =
        "The sky above us";


    historicalSkyDate.textContent =
        `${dateString} · 10:00 PM`;


    historicalSkyLocation.textContent =
        "Dundee, Scotland";


    historicalSky.classList.add(
        "visible"
    );


    drawHistoricalSky(
        dateString,
        memoryIndex
    );

}


/* =========================================================
   DRAW HISTORICAL SKY
========================================================= */

function drawHistoricalSky(
    dateString,
    memoryIndex
) {

    const canvas =
        historicalSkyCanvas;

    const ctx =
        canvas.getContext("2d");


    const dpr =
        window.devicePixelRatio || 1;


    const width =
        window.innerWidth;

    const height =
        window.innerHeight;


    canvas.width =
        width * dpr;

    canvas.height =
        height * dpr;


    ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
    );


    /*
       Dundee coordinates.

       Latitude:
       56.4620 N

       Longitude:
       2.9707 W
       = -2.9707
    */

    const latitude =
        56.4620;

    const longitude =
        -2.9707;


    const date =
        parseSkyDate(dateString);


    /* =====================================================
       SKY BACKGROUND
    ====================================================== */

    const gradient =
        ctx.createRadialGradient(

            width * 0.5,
            height * 0.35,
            0,

            width * 0.5,
            height * 0.45,
            Math.max(
                width,
                height
            )

        );


    gradient.addColorStop(
        0,
        "#162a5a"
    );

    gradient.addColorStop(
        0.45,
        "#0b1737"
    );

    gradient.addColorStop(
        1,
        "#020611"
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
       SUBTLE MILKY WAY GLOW
    ====================================================== */

    ctx.save();

    ctx.globalAlpha =
        0.055;

    ctx.translate(
        width * 0.5,
        height * 0.5
    );

    ctx.rotate(
        -0.35
    );


    const milkyWay =
        ctx.createLinearGradient(
            -width,
            0,
            width,
            0
        );


    milkyWay.addColorStop(
        0,
        "transparent"
    );

    milkyWay.addColorStop(
        0.5,
        "rgba(180,200,255,0.9)"
    );

    milkyWay.addColorStop(
        1,
        "transparent"
    );


    ctx.fillStyle =
        milkyWay;


    ctx.fillRect(
        -width,
        -height * 0.18,
        width * 2,
        height * 0.36
    );


    ctx.restore();


    /* =====================================================
       SKY PROJECTION

       We imagine Laura is lying back and looking upward.

       Zenith = centre of screen.

       Horizon = near the bottom.

       This is NOT a giant circular star chart.
    ====================================================== */


    const centreX =
        width * 0.5;

    const centreY =
        height * 0.46;


    const skyRadius =
        Math.min(
            width * 0.72,
            height * 0.88
        );


    const stars =
        window.HIP_STARS || [];


    /*
       Sort stars by magnitude so brighter stars
       are drawn last and remain visible.
    */

    const visibleStars =
        [];


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


        const horizontal =
            raDecToAltAz(
                ra,
                dec,
                date,
                latitude,
                longitude
            );


        /*
           Only draw stars above the horizon.

           A little below the horizon is allowed
           near the bottom edge for a natural fade.
        */

        if (
            horizontal.altitude < -8
        ) {

            return;

        }


        const altitudeRadians =
            horizontal.altitude *
            Math.PI / 180;


        const azimuthRadians =
            horizontal.azimuth *
            Math.PI / 180;


        /*
           Projection:

           Zenith is centre.

           North = upward.

           East = right.

           South = down.

           West = left.
        */

        const distance =
            skyRadius *
            Math.cos(
                altitudeRadians
            );


        let x =
            centreX +
            Math.sin(
                azimuthRadians
            ) *
            distance;


        let y =
            centreY -
            Math.cos(
                azimuthRadians
            ) *
            distance;


        /*
           Push the lowest stars slightly down
           so the screen feels like a view of the sky.
        */

        const edgeFade =
            Math.max(
                0,
                Math.min(
                    1,
                    (horizontal.altitude + 5) / 25
                )
            );


        if (
            x < -30 ||
            x > width + 30 ||
            y < -30 ||
            y > height + 30
        ) {

            return;

        }


        visibleStars.push({

            x,
            y,
            magnitude,
            altitude:
                horizontal.altitude,
            alpha:
                edgeFade

        });

    });


    visibleStars.sort(
        (a, b) =>
            b.magnitude -
            a.magnitude
    );


    /* =====================================================
       DRAW REAL STARS
    ====================================================== */

    visibleStars.forEach(star => {

        /*
           Magnitude:

           Lower number = brighter.

           This keeps the important stars
           noticeably brighter.
        */

        const brightness =
            Math.max(
                0.12,
                Math.min(
                    1,
                    1.35 -
                    (star.magnitude / 6)
                )
            );


        const radius =
            Math.max(
                0.45,
                Math.min(
                    3.8,
                    0.65 +
                    brightness * 2.4
                )
            );


        ctx.beginPath();

        ctx.arc(
            star.x,
            star.y,
            radius,
            0,
            Math.PI * 2
        );


        ctx.fillStyle =
            `rgba(
                255,
                248,
                220,
                ${Math.min(
                    1,
                    brightness *
                    star.alpha
                )}
            )`;


        ctx.shadowBlur =
            brightness * 8;


        ctx.shadowColor =
            "rgba(255,240,190,0.9)";


        ctx.fill();


        /*
           Very bright stars get a tiny glow cross.
        */

        if (
            star.magnitude <= 1.5
        ) {

            ctx.globalAlpha =
                0.45 * star.alpha;

            ctx.strokeStyle =
                "rgba(255,245,205,0.8)";

            ctx.lineWidth =
                0.5;


            ctx.beginPath();

            ctx.moveTo(
                star.x - 5,
                star.y
            );

            ctx.lineTo(
                star.x + 5,
                star.y
            );

            ctx.moveTo(
                star.x,
                star.y - 5
            );

            ctx.lineTo(
                star.x,
                star.y + 5
            );

            ctx.stroke();

            ctx.globalAlpha =
                1;

        }

    });


    ctx.shadowBlur =
        0;


    /* =====================================================
       VERY SUBTLE HORIZON FADE

       No circle.
       No compass.
       No pizza slice.
    ====================================================== */

    const horizonGradient =
        ctx.createLinearGradient(
            0,
            height * 0.78,
            0,
            height
        );


    horizonGradient.addColorStop(
        0,
        "rgba(2,6,18,0)"
    );

    horizonGradient.addColorStop(
        1,
        "rgba(1,3,10,0.75)"
    );


    ctx.fillStyle =
        horizonGradient;


    ctx.fillRect(
        0,
        height * 0.78,
        width,
        height * 0.22
    );

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
   REDRAW HISTORICAL SKY ON RESIZE
========================================================= */

window.addEventListener(
    "resize",
    () => {

        if (
            historicalSky.classList.contains(
                "visible"
            )
        ) {

            /*
               Find the currently displayed
               historical memory.

               The first dated memory is used
               as a safe fallback.
            */

            const datedMemory =
                memories.find(
                    memory =>
                        memory.skyDate
                );


            if (datedMemory) {

                drawHistoricalSky(
                    datedMemory.skyDate,
                    0
                );

            }

        }

    }
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

        gameStarted =
            true;


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


    finalRevealStarted =
        true;


    /*
       IMPORTANT:

       This stops the original background
       stars from rapidly flashing while
       LAURA is forming.
    */

    document.body.classList.add(
        "final-reveal"
    );


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
        (coordinate, index) => {

            const star =
                document.createElement("div");


            star.className =
                "final-star";


            /*
               Random starting location.
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
               Move into LAURA.
            */

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
                100 + index * 55
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
        (connection, index) => {

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
