/* =========================================================
   LAURA'S LITTLE SKY
   HISTORICAL SKY DATA LOADER
========================================================= */

window.HIP_STARS = [];

window.HIP_CONSTELLATION_LINES = [];


/* =========================================================
   LOAD REAL HIPPARCOS DATA
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
            `Constellation connections: ${window.HIP_CONSTELLATION_LINES.length
            }`
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
   START
========================================================= */

loadHistoricalSkyData();