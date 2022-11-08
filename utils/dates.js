import {format, parse, setGlobalDateMasks} from "fecha";

setGlobalDateMasks({
    sqlMask: "YYYY-MM-DD"
});
setGlobalDateMasks({
    polishMask: "DD-MM-YYYY"
});
setGlobalDateMasks({
    sqlMaskWithTime: "YYYY-MM-DD HH:mm"
});

export const polishLanguage = {
    dayNamesShort: ["Ndz", "Pon", "Wt", "Śr", "Czw", "Pt", "Sob"],
    dayNames: [
        "Niedziela",
        "Poniedziałek",
        "Wtorek",
        "Środa",
        "Czwartek",
        "Piątek",
        "Sobota"
    ],
    monthNamesShort: [
        "Sty",
        "Lut",
        "Mar",
        "Kwi",
        "Maj",
        "Cze",
        "Lip",
        "Sie",
        "Wrz",
        "Paź",
        "Lis",
        "Gru"
    ],
    monthNames: [
        "Styczeń",
        "Luty",
        "Marzec",
        "Kwiecień",
        "Maj",
        "Czerwiec",
        "Lipiec",
        "Sierpień",
        "Wrzesień",
        "Październik",
        "Listopad",
        "Grudzień"
    ]
};



// String to Date
export function parseDate(date, time = false, mask) {
    if (date && time) {
        return parse(date, mask || "sqlMaskWithTime", polishLanguage);
    } else if (date) {
        return parse(date, mask || "sqlMask", polishLanguage);
    } else {
        return null;
    }
}

// Date to String
export function prepareDate(date, time = false, mask) {
    if (date && time) {
        return format(date, mask || "sqlMaskWithTime", polishLanguage);
    } else if (date) {
        return format(date, mask || "sqlMask", polishLanguage);
    } else {
        return null;
    }
}

export function convertDate(date, time = true, mask = "D MMM YYYY H:mm") {
    if (date) {
        return prepareDate(
            parseDate(date, time, "isoDateTime"),
            true,
            mask
        )
    } else {
        return null
    }
}
