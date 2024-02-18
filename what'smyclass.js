/** @format */

// static info setup ==> won't change
const infoList = [
    "",
    "ch2, lissa.vanderpluym (Van der Pluym L.), C02",
    "wisk6, fien.aelter (Aelter F.), D12",
    "Eng2, tine.vanpottelberghe (Van Pottelberghe T.), A12",
    "studie, , E01",
    "Ned3, lore.lamote (Lamote L.), C21",
    "ges2, sietske.meulebrouck (Meulebrouck S.), E12",
    "LOCLIL, lieven.cloet (Cloet L.), Temp1",
    "LOCLIL, lieven.cloet (Cloet L.), Temp1",
    "Ned4, lore.lamote (Lamote L.), C01",
    "fy2, tim.vanleirsberghe (Van Leirsberghe T.), C12",
    "wisk6, fien.aelter (Aelter F.), D12",
    "est1, niels.vermeulen (Vermeulen N.), C31",
    "ment, corneel.teerlinck (Teerlinck C.), E03",
    "fy2, tim.vanleirsberghe (Van Leirsberghe T.), C12",
    "godsd2, niels.vermeulen (Vermeulen N.), C31",
    "ges2, sietske.meulebrouck (Meulebrouck S.), E12",
    "aard1, annemie.vermeulen (Vermeulen A.), E11",
    "ch2, lissa.vanderpluym (Van der Pluym L.), C22",
    "keuzewisk, fien.aelter (Aelter F.), D11",
    "Eng2, tine.vanpottelberghe (Van Pottelberghe T.), D21",
    "Fra3, joke.descan (Descan J.), D21",
    "bio2, lissa.vanderpluym (Van der Pluym L.), C02",
    "infw, isabel.ternier (Ternier I.), D21",
    "Fra3, joke.descan (Descan J.), D21",
    "wisk6, fien.aelter (Aelter F.), ZB104",
    "wisk6, fien.aelter (Aelter F.), ZB104",
    "wisk6, fien.aelter (Aelter F.), ZB104",
    "wisk6, fien.aelter (Aelter F.), ZB104",
    "bio2, lissa.vanderpluym (Van der Pluym L.), C02",
    "Ned3, lore.lamote (Lamote L.), ZB101",
    "Fra3, joke.descan (Descan J.), B11",
    "Ned3, lore.lamote (Lamote L.), A12",
    "godsd2, niels.vermeulen (Vermeulen N.), A12",
];

const infoListNet = [
    "",
    "chemie, Van der Pluym L., C02",
    "wiskunde 6 uur, Aelter F., D12",
    "Engels, Van Pottelberghe T., A12",
    "studie, ?, E01",
    "Nederlands, Lamote L., C21",
    "geschiedenis, Meulebrouck S., E12",
    "LO, Cloet L., Temp1",
    "LO, Cloet L., Temp1",
    "Nederlands, Lamote L., C01",
    "fysica, Van Leirsberghe T., C12",
    "wiskunde 6 uur, Aelter F., D12",
    "esthetica, Vermeulen N., C31",
    "mentoraat, Teerlinck C., E03",
    "fysica, Van Leirsberghe T., C12",
    "godsdienst, Vermeulen N., C31",
    "geschiedenis, Meulebrouck S., E12",
    "aardrijkskunde, Vermeulen A., E11",
    "chemie, Van der Pluym L., C22",
    "keuzewisk, Aelter F., D11",
    "Engels, Van Pottelberghe T., D21",
    "Frans, Descan J., D21",
    "biologie, Van der Pluym L., C02",
    "informatica wetenschappen, Ternier I., D21",
    "Frans, Descan J., D21",
    "wiskunde 6 uur, Aelter F., ZB104",
    "wiskunde 6 uur, Aelter F., ZB104",
    "wiskunde 6 uur, Aelter F., ZB104",
    "wiskunde 6 uur, Aelter F., ZB104",
    "biologie, Van der Pluym L., C02",
    "Nederlands, Lamote L., ZB101",
    "Frans, Descan J., B11",
    "Nederlands, Lamote L., A12",
    "godsdienst, Vermeulen N., A12",
];

const days = {
    sunday: [0, 0],
    monday: [6, 0],
    tuesday: [8, 6, true],
    wednesday: [4, 6 + 8],
    thursday: [8, 6 + 8 + 4, true],
    friday: [7, 6 + 8 + 4 + 8],
    saturday: [0, 6 + 8 + 4 + 8 + 7],
};

const hoursNormaal = [
    ["8u21", "9u11"], //lesuur 1
    ["9u13", "10u03"], // 2
    ["10u06", "10u56"], //3
    ["11u10", "12u00"], //4
    ["13u21", "14u11"], //5
    ["14u13", "15u03"], //6
    ["15u05", "15u55"], //7
];

const hoursMiddaguur = [
    ["8u21", "9u11"], //lesuur 1
    ["9u13", "10u03"], // 2
    ["10u06", "10u56"], //3
    ["11u10", "12u00"], //4
    ["12u02", "12u52"], //5 = middaguur
    ["14u00", "14u50"], //6
    ["15u05", "15u55"], //7
    ["15u57", "16u45"], //8
];

function getClass() {
    // dynamic info setup ==> can change
    let date = new Date();
    let day = Object.keys(days)[date.getDay()];
    let timeString = `${date.getHours()}:${date.getMinutes()}`;
    let time = [date.getHours(), date.getMinutes()];

    const schedule = () => {
        let hours = days[day][days[day].length - 1] ? hoursMiddaguur : hoursNormaal;
        return hours.slice(0, days[day][0]);
    };

    // get current class
    const info = {
        day: day,
        timeString: timeString,
        time: time,
        minutes: time[0] * 60 + time[1],
        schedule: schedule(),
        starts: schedule()
            .flat()
            .filter((x, i) => i % 2 == 0),
    };

    info.lesuur = (() => {
        for (let i in info.schedule.flat()) {
            let time = info.schedule.flat()[i].split("u").map(Number);
            let minutes = time[0] * 60 + time[1];

            if (info.minutes <= minutes) {
                let result = i % 2 == 0 ? info.schedule.flat()[i] : info.schedule.flat()[i - 1];

                return info.starts.indexOf(result) + 1; //start bij 0 => +1
            }
        }
    })();

    info.les = (() => {
        let les = infoList[days[info.day][1] + info.lesuur];
        let les2 = infoListNet[days[info.day][1] + info.lesuur];

        let words = les ? les2.split(", ") : 0;
        let message = les ? `Je hebt ${words[0]} van ${words[1]} in lokaal ${words[2]}.` : "Je hebt nu geen les.";

        // document.querySelector("#message").innerHTML = les ? les : "";
        document.querySelector("#messageWords").innerHTML = message;

        return [les, message];
    })();

    info.volgendeLes = (() => {
        let next = infoList[days[info.day][1] + info.lesuur + 1];
        let next2 = infoListNet[days[info.day][1] + info.lesuur + 1];

        let words = next ? next2.split(", ") : 0;
        let message = next ? `Je hebt zometeen ${words[0]} van ${words[1]} in lokaal ${words[2]}.` : "Je hebt straks geen les.";

        // document.querySelector("#message2")?.innerHTML = next ? next : "";
        document.querySelector("#message2Words").innerHTML = message;

        return [next, message];
    })();

    console.log(info);
}
getClass()