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


totalCount.textContent =
    TOTAL_STARS;


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

        skyDate:
            "11 June 2026",

        skyTime:
            "22:00",

        skyLocation: {
            name: "Dundee, Scotland",
            latitude: 56.46913,
            longitude: -2.97489
        }
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


    /* =====================================================
       LAURA'S BIRTHDAY
    ===================================================== */

    {
        message:
            "January 18th. Your day.",

        type:
            "birthday",

        skyDate:
            "18 January 1989",

        skyTime:
            "20:16",

        skyLocation: {
            name: "Arbroath, Scotland",
            latitude: 56.563173,
            longitude: -2.587360
        }
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

    memories.forEach(
        (memory, index) => {

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

    if (discoveredStars.has(index)) {

        showMemory(
            memories[index]
        );

        if (
            memories[index].skyDate
        ) {

            setTimeout(
                () => {

                    showHistoricalSky(
                        memories[index]
                    );

                },
                700
            );
        }

        return;
    }


    discoveredStars.add(index);

    foundStars++;

    foundCount.textContent =
        foundStars;


    star.classList.add(
        "discovered"
    );

    star.style.transform =
        "scale(2.6)";

    star.style.boxShadow =
        "0 0 12px rgba(255,255,255,1)," +
        "0 0 30px rgba(255,240,150,1)," +
        "0 0 60px rgba(255,210,80,.9)," +
        "0 0 90px rgba(255,210,80,.5)";


    showMemory(
        memories[index]
    );


    if (
        memories[index].skyDate
    ) {

        setTimeout(
            () => {

                showHistoricalSky(
                    memories[index]
                );

            },
            700
        );
    }


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
   TIMEZONE HANDLING
========================================================= */

/*
    Dundee:
    11 June 2026 is British Summer Time = UTC+1.

    Arbroath:
    18 January 1989 is GMT = UTC+0.

    We deliberately specify the offset ourselves because
    JavaScript's Date object otherwise uses the computer's
    current timezone rather than necessarily the historical
    UK timezone.
*/

function getUTCDateForSky(
    dateString,
    timeString,
    locationName
) {

    let offsetHours = 0;

    if (
        dateString === "11 June 2026"
    ) {

        offsetHours = 1;

    }


    /*
        Convert:

        local time - UTC offset
        -> UTC
    */

    const parts =
        dateString.split(" ");

    const day =
        Number(parts[0]);

    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

    const month =
        monthNames.indexOf(
            parts[1]
        );

    const year =
        Number(parts[2]);


    const timeParts =
        timeString.split(":");

    const hour =
        Number(timeParts[0]);

    const minute =
        Number(timeParts[1]);


    return new Date(
        Date.UTC(
            year,
            month,
            day,
            hour - offsetHours,
            minute,
            0
        )
    );
}


/* =========================================================
   JULIAN DATE
========================================================= */

function julianDate(date) {

    return (
        date.getTime() /
        86400000
    ) +
    2440587.5;
}


/* =========================================================
   JULIAN CENTURIES
========================================================= */

function julianCenturies(jd) {

    return (
        jd - 2451545.0
    ) / 36525.0;
}


/* =========================================================
   GMST
========================================================= */

function calculateGMST(jd) {

    const T =
        julianCenturies(jd);

    let gmst =
        280.46061837 +
        360.98564736629 *
        (jd - 2451545.0) +
        0.000387933 *
        T *
        T -
        (T * T * T) /
        38710000;

    gmst =
        ((gmst % 360) + 360) % 360;

    return gmst;
}


/* =========================================================
   DEG / RAD
========================================================= */

function degToRad(deg) {

    return deg *
        Math.PI /
        180;
}

function radToDeg(rad) {

    return rad *
        180 /
        Math.PI;
}


/* =========================================================
   NORMALISE ANGLE
========================================================= */

function normalizeDegrees(degrees) {

    return (
        (degrees % 360) +
        360
    ) % 360;
}


/* =========================================================
   PROPAGATE HIPPARCOS POSITION
========================================================= */

/*
    Hipparcos positions are given at J1991.25.

    The catalogue supplies:

        RA
        Dec
        proper motion in RA
        proper motion in Dec

    We propagate those positions to the historical
    observation date.

    This is especially useful for the 1989 birthday sky,
    because it means we aren't pretending the catalogue
    position itself is the exact position for every epoch.
*/

function propagateStarPosition(
    star,
    targetDate
) {

    let ra =
        Number(
            star.ra ??
            star.RA ??
            star.right_ascension ??
            star.alpha ??
            star.hip_ra
        );

    let dec =
        Number(
            star.dec ??
            star.DEC ??
            star.declination ??
            star.delta ??
            star.hip_dec
        );


    if (
        !Number.isFinite(ra) ||
        !Number.isFinite(dec)
    ) {

        return null;
    }


    /*
        Try to find proper motion fields.

        Hipparcos normally gives:
            mu_alpha*
            mu_delta

        Units:
            milliarcseconds/year
    */

    const pmRa =
        Number(
            star.pmra ??
            star.pmRA ??
            star.mu_alpha ??
            star.muAlpha ??
            star.mu_ra ??
            star.pm_alpha ??
            0
        );

    const pmDec =
        Number(
            star.pmdec ??
            star.pmDEC ??
            star.mu_delta ??
            star.muDelta ??
            star.mu_dec ??
            star.pm_delta ??
            0
        );


    const targetJD =
        julianDate(
            targetDate
        );

    const targetYear =
        2000 +
        (
            targetJD -
            2451545.0
        ) /
        365.25;


    const yearsSinceHipparcos =
        targetYear -
        1991.25;


    /*
        Convert mas/year to degrees/year.
    */

    const masToDegrees =
        1 /
        3600000;


    /*
        mu_alpha* already contains cos(dec),
        which means:

        dRA = mu_alpha* / cos(dec)
    */

    const cosDec =
        Math.cos(
            degToRad(dec)
        );


    if (
        Math.abs(cosDec) > 0.000001 &&
        Number.isFinite(pmRa)
    ) {

        ra +=
            (
                pmRa *
                masToDegrees *
                yearsSinceHipparcos
            ) /
            cosDec;
    }


    if (
        Number.isFinite(pmDec)
    ) {

        dec +=
            pmDec *
            masToDegrees *
            yearsSinceHipparcos;
    }


    ra =
        normalizeDegrees(ra);

    dec =
        Math.max(
            -90,
            Math.min(
                90,
                dec
            )
        );


    return {
        ra,
        dec
    };
}


/* =========================================================
   EQUATORIAL -> HORIZONTAL
========================================================= */

function equatorialToHorizontal(
    ra,
    dec,
    latitude,
    longitude,
    jd
) {

    const gmst =
        calculateGMST(jd);

    const lst =
        normalizeDegrees(
            gmst +
            longitude
        );

    const hourAngle =
        normalizeDegrees(
            lst - ra
        );

    const H =
        degToRad(
            hourAngle
        );

    const lat =
        degToRad(
            latitude
        );

    const declination =
        degToRad(
            dec
        );


    /*
        Altitude
    */

    const sinAltitude =
        Math.sin(lat) *
        Math.sin(declination) +

        Math.cos(lat) *
        Math.cos(declination) *
        Math.cos(H);


    const altitude =
        Math.asin(
            Math.max(
                -1,
                Math.min(
                    1,
                    sinAltitude
                )
            )
        );


    /*
        Azimuth.

        0° = North
        90° = East
        180° = South
        270° = West
    */

    const azimuth =
        Math.atan2(

            -Math.sin(H),

            Math.tan(declination) *
            Math.cos(lat) -

            Math.sin(lat) *
            Math.cos(H)

        );


    return {

        altitude:
            radToDeg(
                altitude
            ),

        azimuth:
            normalizeDegrees(
                radToDeg(
                    azimuth
                )
            )

    };
}


/* =========================================================
   SKY PROJECTION
========================================================= */

/*
    We use a stereographic-style sky dome.

    Centre:
        Zenith / directly overhead

    Edge:
        Horizon

    Below horizon:
        hidden
*/

function projectSkyPosition(
    altitude,
    azimuth,
    width,
    height
) {

    if (
        altitude <= 0
    ) {

        return null;
    }


    const maxRadius =
        Math.min(
            width,
            height
        ) *
        0.44;


    /*
        Zenith = radius 0
        Horizon = radius maxRadius
    */

    const zenithAngle =
        90 -
        altitude;


    const radius =
        maxRadius *
        (
            zenithAngle /
            90
        );


    const az =
        degToRad(
            azimuth
        );


    const x =
        width / 2 +
        Math.sin(az) *
        radius;


    const y =
        height / 2 -
        Math.cos(az) *
        radius;


    return {
        x,
        y
    };
}


/* =========================================================
   STAR BRIGHTNESS
========================================================= */

function getStarBrightness(
    magnitude
) {

    if (
        !Number.isFinite(
            magnitude
        )
    ) {

        magnitude = 6;
    }


    /*
        Brighter stars have smaller magnitudes.
    */

    return Math.max(
        0.15,
        Math.min(
            1.0,
            1.15 -
            (
                magnitude /
                8
            )
        )
    );
}


/* =========================================================
   DRAW HISTORICAL SKY
========================================================= */

function drawHistoricalSky(
    memory
) {

    const canvas =
        historicalSkyCanvas;

    const ctx =
        canvas.getContext(
            "2d"
        );


    const dpr =
        Math.min(
            window.devicePixelRatio ||
            1,
            2
        );


    const width =
        window.innerWidth;

    const height =
        window.innerHeight;


    canvas.width =
        width *
        dpr;

    canvas.height =
        height *
        dpr;


    canvas.style.width =
        width + "px";

    canvas.style.height =
        height + "px";


    ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
    );


    /* -----------------------------------------------------
       BACKGROUND
    ----------------------------------------------------- */

    const gradient =
        ctx.createRadialGradient(

            width / 2,
            height / 2,
            10,

            width / 2,
            height / 2,
            Math.max(
                width,
                height
            ) * 0.65

        );


    gradient.addColorStop(
        0,
        "#142956"
    );

    gradient.addColorStop(
        0.45,
        "#08132f"
    );

    gradient.addColorStop(
        1,
        "#01030c"
    );


    ctx.fillStyle =
        gradient;

    ctx.fillRect(
        0,
        0,
        width,
        height
    );


    /* -----------------------------------------------------
       SKY CIRCLE
    ----------------------------------------------------- */

    const radius =
        Math.min(
            width,
            height
        ) * 0.44;


    ctx.beginPath();

    ctx.arc(
        width / 2,
        height / 2,
        radius,
        0,
        Math.PI * 2
    );


    ctx.strokeStyle =
        "rgba(255,255,255,0.08)";

    ctx.lineWidth =
        1;

    ctx.stroke();


    /* -----------------------------------------------------
       COMPASS LABELS
    ----------------------------------------------------- */

    drawCompassLabels(
        ctx,
        width,
        height,
        radius
    );


    /* -----------------------------------------------------
       TARGET UTC TIME
    ----------------------------------------------------- */

    const targetDate =
        getUTCDateForSky(
            memory.skyDate,
            memory.skyTime,
            memory.skyLocation.name
        );


    const jd =
        julianDate(
            targetDate
        );


    /* -----------------------------------------------------
       DRAW REAL HIPPARCOS STARS
    ----------------------------------------------------- */

    const stars =
        window.HIP_STARS || [];


    stars.forEach(
        star => {

            const position =
                propagateStarPosition(
                    star,
                    targetDate
                );


            if (!position) {
                return;
            }


            const horizontal =
                equatorialToHorizontal(

                    position.ra,
                    position.dec,

                    memory.skyLocation.latitude,
                    memory.skyLocation.longitude,

                    jd

                );


            /*
                Only show stars above the horizon.
            */

            if (
                horizontal.altitude <= 0
            ) {

                return;
            }


            const projected =
                projectSkyPosition(

                    horizontal.altitude,
                    horizontal.azimuth,

                    width,
                    height

                );


            if (!projected) {
                return;
            }


            const magnitude =
                Number(
                    star.mag ??
                    star.magnitude ??
                    star.vmag ??
                    star.Vmag ??
                    6
                );


            const brightness =
                getStarBrightness(
                    magnitude
                );


            /*
                Make brighter stars larger.
            */

            const radiusStar =
                Math.max(
                    0.6,
                    Math.min(
                        3.2,
                        0.6 +
                        brightness * 2.1
                    )
                );


            ctx.beginPath();

            ctx.arc(

                projected.x,
                projected.y,

                radiusStar,

                0,
                Math.PI * 2

            );


            ctx.fillStyle =
               `rgba(255,248,220,${Math.min(
                  1,
                  window.innerWidth <= 600
                  ? 0.45 + brightness * 0.16
                  : 0.35 + brightness * 0.14
               )})`;
           
           ctx.shadowBlur =
              window.innerWidth <= 600
              ? brightness * 3
              : brightness * 2;

            ctx.shadowColor =
                "rgba(255,235,170,0.9)";


            ctx.fill();

        }
    );


    ctx.shadowBlur = 0;


    /* -----------------------------------------------------
       CONSTELLATION LINES
    ----------------------------------------------------- */

    drawRealConstellationLines(
        ctx,
        targetDate,
        memory.skyLocation,
        width,
        height
    );


    /* -----------------------------------------------------
       MEMORY CONSTELLATION
    ----------------------------------------------------- */

    const memoryIndex =
        memories.indexOf(
            memory
        );


    drawMemoryConstellation(
        ctx,
        memoryIndex,
        width,
        height
    );


    ctx.shadowBlur = 0;
}


/* =========================================================
   COMPASS LABELS
========================================================= */

function drawCompassLabels(
    ctx,
    width,
    height,
    radius
) {

    const labels = [

        {
            text: "N",
            azimuth: 0
        },

        {
            text: "E",
            azimuth: 90
        },

        {
            text: "S",
            azimuth: 180
        },

        {
            text: "W",
            azimuth: 270
        }

    ];


    ctx.save();

    ctx.font =
        "12px Georgia";

    ctx.fillStyle =
        "rgba(255,255,255,0.35)";

    ctx.textAlign =
        "center";

    ctx.textBaseline =
        "middle";


    labels.forEach(
        label => {

            const angle =
                degToRad(
                    label.azimuth
                );


            const x =
                width / 2 +
                Math.sin(angle) *
                (radius + 18);


            const y =
                height / 2 -
                Math.cos(angle) *
                (radius + 18);


            ctx.fillText(
                label.text,
                x,
                y
            );

        }
    );


    ctx.restore();
}


/* =========================================================
   REAL CONSTELLATION LINES
========================================================= */

function getStarId(star) {

    return String(
        star.hip ??
        star.HIP ??
        star.id ??
        star.ID ??
        star.hipId ??
        star.HIP_ID ??
        ""
    );
}


function getLinePair(line) {

    if (
        Array.isArray(line) &&
        line.length >= 2
    ) {

        return [
            String(line[0]),
            String(line[1])
        ];
    }


    if (
        line &&
        typeof line === "object"
    ) {

        const a =
            line.hip1 ??
            line.HIP1 ??
            line.from ??
            line.start ??
            line.a ??
            line[0];

        const b =
            line.hip2 ??
            line.HIP2 ??
            line.to ??
            line.end ??
            line.b ??
            line[1];


        if (
            a !== undefined &&
            b !== undefined
        ) {

            return [
                String(a),
                String(b)
            ];
        }
    }


    return null;
}


function drawRealConstellationLines(
    ctx,
    targetDate,
    location,
    width,
    height
) {

    const stars =
        window.HIP_STARS || [];

    const lines =
        window.HIP_CONSTELLATION_LINES || [];


    if (
        stars.length === 0 ||
        lines.length === 0
    ) {

        return;
    }


    const starPositions =
        new Map();


    /*
        Calculate the screen position of every star
        that can be used by a constellation line.
    */

    const jd =
        julianDate(
            targetDate
        );


    stars.forEach(
        star => {

            const id =
                getStarId(star);

            if (!id) {
                return;
            }


            const position =
                propagateStarPosition(
                    star,
                    targetDate
                );


            if (!position) {
                return;
            }


            const horizontal =
                equatorialToHorizontal(

                    position.ra,
                    position.dec,

                    location.latitude,
                    location.longitude,

                    jd
                );


            if (
                horizontal.altitude <= 0
            ) {

                return;
            }


            const projected =
                projectSkyPosition(

                    horizontal.altitude,
                    horizontal.azimuth,

                    width,
                    height
                );


            if (projected) {

                starPositions.set(
                    id,
                    projected
                );
            }

        }
    );


    ctx.save();

    const isMobile =
    window.innerWidth <= 600;

   ctx.strokeStyle = 
      isMobile
           ? "rgba(255,235,150,0.9)"
           : "rgba(255,240,170,0.55)";
   
   ctx.lineWidth =
       isMobile
           ? 1.8
           : 1;

    ctx.shadowBlur =
        4;

    ctx.shadowColor =
        "rgba(120,160,255,0.25)";


    lines.forEach(
        line => {

            const pair =
                getLinePair(line);

            if (!pair) {
                return;
            }


            const a =
                starPositions.get(
                    pair[0]
                );

            const b =
                starPositions.get(
                    pair[1]
                );


            if (!a || !b) {
                return;
            }


            ctx.beginPath();

            ctx.moveTo(
                a.x,
                a.y
            );

            ctx.lineTo(
                b.x,
                b.y
            );

            ctx.stroke();

        }
    );


    ctx.restore();
}


/* =========================================================
   MEMORY CONSTELLATION
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


    ctx.save();


    /*
        Lines
    */

    ctx.beginPath();


    points.forEach(
        (point, index) => {

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

        }
    );


    ctx.strokeStyle =
        "rgba(255,240,170,0.55)";

    ctx.lineWidth =
        1;

    ctx.shadowBlur =
        8;

    ctx.shadowColor =
        "rgba(255,220,120,0.45)";

    ctx.stroke();


    /*
        Memory constellation stars
    */

    points.forEach(
        point => {

            ctx.beginPath();

            ctx.arc(
               point.x,
               point.y,
               window.innerWidth <= 600
                  ? 4.5
                  : 3,
               0,
               Math.PI * 2
            );

            ctx.fillStyle =
                "#fff8d5";

            ctx.shadowBlur =
               window.innerWidth <= 600
                  ? 25
                  : 15;

            ctx.shadowColor =
                "rgba(255,220,120,1)";

            ctx.fill();

        }
    );


    ctx.restore();
}


/* =========================================================
   SHOW HISTORICAL SKY
========================================================= */

function showHistoricalSky(
    memory
) {

    historicalSkyTitle.textContent =
        "The sky above us";


    historicalSkyDate.textContent =
        `${memory.skyDate} · ${formatSkyTime(memory.skyTime)}`;


    historicalSkyLocation.textContent =
        memory.skyLocation.name;


    historicalSky.classList.add(
        "visible"
    );


    drawHistoricalSky(
        memory
    );
}


/* =========================================================
   FORMAT SKY TIME
========================================================= */

function formatSkyTime(
    time
) {

    const [
        hourString,
        minuteString
    ] =
        time.split(":");


    let hour =
        Number(hourString);

    const minute =
        minuteString;


    const suffix =
        hour >= 12
            ? "PM"
            : "AM";


    hour =
        hour % 12 ||
        12;


    return `${hour}:${minute} ${suffix}`;
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
   REDRAW ON WINDOW RESIZE
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
                Find the memory currently being shown.
            */

            const visibleDate =
                historicalSkyDate.textContent;


            const memory =
                memories.find(
                    item => {

                        if (
                            !item.skyDate
                        ) {

                            return false;
                        }


                        return (
                            visibleDate.includes(
                                item.skyDate
                            )
                        );
                    }
                );


            if (memory) {

                drawHistoricalSky(
                    memory
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


    finalRevealStarted = true;


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
                        coordinate[0] +
                        "%";

                    star.style.top =
                        coordinate[1] +
                        "%";

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
