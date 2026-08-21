import csv
import json
import urllib.request
from pathlib import Path
from io import StringIO


# =========================================================
# LAURA'S LITTLE SKY
# REAL HISTORICAL SKY DATA GENERATOR
# =========================================================
#
# Downloads the published Hipparcos / Stellarium data
# and creates:
#
#   data/hip_stars.json
#   data/hip_constellation_lines.json
#
# The JavaScript application expects:
#
#   hip      = Hipparcos catalogue ID
#   ra       = decimal hours
#   dec      = decimal degrees
#   mag      = apparent magnitude
#
# =========================================================


# =========================================================
# PROJECT PATHS
# =========================================================

PROJECT_DIR = Path(__file__).resolve().parent

DATA_DIR = PROJECT_DIR / "data"

DATA_DIR.mkdir(
    exist_ok=True
)


STARS_OUTPUT = (
    DATA_DIR /
    "hip_stars.json"
)


LINES_OUTPUT = (
    DATA_DIR /
    "hip_constellation_lines.json"
)


# =========================================================
# SOURCE DATA
# =========================================================
#
# These are the published source files used by the
# Hipparcos Planetarium Data project.
#
# If the project changes its hosting location in future,
# only these URLs need changing.
# =========================================================


STARS_URL = (
    "https://creativival.github.io/"
    "hipparcos_planetarium_data_creator/"
    "data/hip_lite_major.csv"
)


LINES_URL = (
    "https://creativival.github.io/"
    "hipparcos_planetarium_data_creator/"
    "data/hip_constellation_line.csv"
)


# =========================================================
# DOWNLOAD
# =========================================================

def download_text(url):

    print()
    print("Downloading:")
    print(url)

    request = urllib.request.Request(
        url,
        headers={
            "User-Agent":
                "Laura-Little-Sky/1.0"
        }
    )

    with urllib.request.urlopen(
        request
    ) as response:

        data = response.read()


    text = data.decode(
        "utf-8-sig"
    )


    if not text.strip():

        raise RuntimeError(
            "Downloaded file was empty."
        )


    print(
        f"Downloaded {len(data):,} bytes."
    )


    return text


# =========================================================
# NUMBER HELPERS
# =========================================================

def clean_number(value):

    return value.strip()


def to_float(value):

    return float(
        clean_number(value)
    )


def to_int(value):

    return int(
        clean_number(value)
    )


# =========================================================
# STAR CATALOGUE
# =========================================================

def convert_stars(csv_text):

    print()
    print(
        "Processing Hipparcos stars..."
    )


    stars = []

    reader = csv.reader(
        StringIO(csv_text)
    )


    for row_number, row in enumerate(
        reader,
        start=1
    ):

        if not row:
            continue


        # Remove whitespace.

        row = [
            value.strip()
            for value in row
        ]


        # -------------------------------------------------
        # Skip header
        # -------------------------------------------------

        first = row[0].lower()

        if (
            first == "hip"
            or
            first == "hipparcos"
        ):

            continue


        # -------------------------------------------------
        # We need at least:
        #
        # HIP
        # RA hour
        # RA minute
        # RA second
        # DEC sign
        # DEC degree
        # DEC minute
        # DEC second
        # MAG
        # -------------------------------------------------

        if len(row) < 9:

            continue


        try:

            hip = to_int(
                row[0]
            )

            ra_hour = to_float(
                row[1]
            )

            ra_minute = to_float(
                row[2]
            )

            ra_second = to_float(
                row[3]
            )

            dec_sign = to_int(
                row[4]
            )

            dec_degree = to_float(
                row[5]
            )

            dec_minute = to_float(
                row[6]
            )

            dec_second = to_float(
                row[7]
            )

            magnitude = to_float(
                row[8]
            )

        except (
            ValueError,
            IndexError
        ):

            print(
                f"Skipping invalid star row "
                f"{row_number}: {row}"
            )

            continue


        # -------------------------------------------------
        # RA
        #
        # Convert:
        #
        # HH MM SS
        #
        # into decimal hours.
        # -------------------------------------------------

        ra = (
            ra_hour
            +
            ra_minute / 60.0
            +
            ra_second / 3600.0
        )


        # -------------------------------------------------
        # DEC
        # -------------------------------------------------

        dec = (
            dec_degree
            +
            dec_minute / 60.0
            +
            dec_second / 3600.0
        )


        if dec_sign == 0:

            dec = -dec


        # -------------------------------------------------
        # Basic validation
        # -------------------------------------------------

        if not (
            0 <= ra < 24
        ):

            print(
                f"Skipping HIP {hip}: "
                f"invalid RA {ra}"
            )

            continue


        if not (
            -90 <= dec <= 90
        ):

            print(
                f"Skipping HIP {hip}: "
                f"invalid DEC {dec}"
            )

            continue


        stars.append(
            {
                "hip": hip,
                "ra": round(
                    ra,
                    8
                ),
                "dec": round(
                    dec,
                    8
                ),
                "mag": round(
                    magnitude,
                    3
                )
            }
        )


    # =====================================================
    # REMOVE DUPLICATE HIP IDs
    # =====================================================

    unique = {}


    for star in stars:

        hip = star["hip"]


        if hip not in unique:

            unique[hip] = star


    stars = list(
        unique.values()
    )


    stars.sort(
        key=lambda star:
            star["hip"]
    )


    # =====================================================
    # SAVE
    # =====================================================

    with open(
        STARS_OUTPUT,
        "w",
        encoding="utf-8"
    ) as file:

        json.dump(
            stars,
            file,
            indent=2
        )


    print()
    print(
        "STAR CATALOGUE COMPLETE"
    )

    print(
        f"Stars downloaded: "
        f"{len(stars):,}"
    )

    print(
        f"Saved to: "
        f"{STARS_OUTPUT}"
    )


    return stars


# =========================================================
# CONSTELLATION LINES
# =========================================================

def convert_lines(
    csv_text,
    available_stars
):

    print()
    print(
        "Processing constellation lines..."
    )


    lines = []

    seen = set()


    reader = csv.reader(
        StringIO(csv_text)
    )


    available = set(
        available_stars
    )


    for row_number, row in enumerate(
        reader,
        start=1
    ):

        if not row:
            continue


        row = [
            value.strip()
            for value in row
        ]


        # -------------------------------------------------
        # Ignore obvious headers
        # -------------------------------------------------

        if row[0].lower() in (
            "hip",
            "constellation",
            "name",
            "star"
        ):

            continue


        # -------------------------------------------------
        # The published line file can contain additional
        # information depending on its version.
        #
        # Find HIP-looking integer values.
        # -------------------------------------------------

        numbers = []


        for value in row:

            try:

                number = int(
                    value
                )

                numbers.append(
                    number
                )

            except ValueError:

                continue


        if len(numbers) < 2:

            continue


        hip_a = numbers[-2]

        hip_b = numbers[-1]


        # -------------------------------------------------
        # Make sure both stars actually exist.
        # -------------------------------------------------

        if (
            hip_a not in available
            or
            hip_b not in available
        ):

            continue


        # -------------------------------------------------
        # Ignore self-connections.
        # -------------------------------------------------

        if hip_a == hip_b:

            continue


        # -------------------------------------------------
        # Treat A-B and B-A as identical.
        # -------------------------------------------------

        key = tuple(
            sorted(
                (
                    hip_a,
                    hip_b
                )
            )
        )


        if key in seen:

            continue


        seen.add(
            key
        )


        lines.append(
            [
                hip_a,
                hip_b
            ]
        )


    # =====================================================
    # SAVE
    # =====================================================

    with open(
        LINES_OUTPUT,
        "w",
        encoding="utf-8"
    ) as file:

        json.dump(
            lines,
            file,
            indent=2
        )


    print()
    print(
        "CONSTELLATION DATA COMPLETE"
    )

    print(
        f"Connections: "
        f"{len(lines):,}"
    )

    print(
        f"Saved to: "
        f"{LINES_OUTPUT}"
    )


    return lines


# =========================================================
# VALIDATION
# =========================================================

def validate(
    stars,
    lines
):

    print()
    print(
        "=========================================="
    )

    print(
        "VALIDATING HISTORICAL SKY DATA"
    )

    print(
        "=========================================="
    )


    hip_ids = {
        star["hip"]
        for star in stars
    }


    duplicate_ids = (
        len(stars)
        -
        len(hip_ids)
    )


    broken_lines = []


    for line in lines:

        if (
            line[0] not in hip_ids
            or
            line[1] not in hip_ids
        ):

            broken_lines.append(
                line
            )


    print(
        f"Unique stars: "
        f"{len(hip_ids):,}"
    )

    print(
        f"Constellation connections: "
        f"{len(lines):,}"
    )

    print(
        f"Duplicate HIP IDs: "
        f"{duplicate_ids}"
    )

    print(
        f"Broken constellation lines: "
        f"{len(broken_lines)}"
    )


    if duplicate_ids != 0:

        raise RuntimeError(
            "Duplicate HIP IDs remain."
        )


    if broken_lines:

        raise RuntimeError(
            "Constellation lines reference "
            "missing stars."
        )


    print()
    print(
        "VALIDATION PASSED ✓"
    )


# =========================================================
# MAIN
# =========================================================

def main():

    print()
    print(
        "=========================================="
    )

    print(
        "       LAURA'S LITTLE SKY"
    )

    print(
        "   REAL HISTORICAL SKY GENERATOR"
    )

    print(
        "=========================================="
    )


    # -----------------------------------------------------
    # Download stars
    # -----------------------------------------------------

    stars_csv = download_text(
        STARS_URL
    )


    # -----------------------------------------------------
    # Download constellation lines
    # -----------------------------------------------------

    lines_csv = download_text(
        LINES_URL
    )


    # -----------------------------------------------------
    # Convert stars
    # -----------------------------------------------------

    stars = convert_stars(
        stars_csv
    )


    # -----------------------------------------------------
    # Convert constellation lines
    # -----------------------------------------------------

    lines = convert_lines(
        lines_csv,
        {
            star["hip"]
            for star in stars
        }
    )


    # -----------------------------------------------------
    # Validate everything
    # -----------------------------------------------------

    validate(
        stars,
        lines
    )


    print()
    print(
        "=========================================="
    )

    print(
        "             ALL DONE"
    )

    print(
        "=========================================="
    )

    print()

    print(
        "Created:"
    )

    print(
        f"  {STARS_OUTPUT}"
    )

    print(
        f"  {LINES_OUTPUT}"
    )

    print()

    print(
        "Your historical sky is ready."
    )

    print()


if __name__ == "__main__":

    main()