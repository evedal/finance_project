export default {
    missingInput: (fieldName) => {
        return fieldName ? fieldName + " må fylles" : "Feltet må fylles";
    },
    serverError: "Det er oppstått problemer med server, forespørselen ble ikke utført",
    requestError: "Det er en feil med forespørselen, kanskje objektet allerede eksisterer",
    company: {
        wrongTickerFormat: "Kun store bokstaver og tall. Mellom 1 og 10 karakterer.",
        wrongNameFormat: "Mellom 1 og 50 karakterer",
        wrongDescFormat: "Mellom 50 og 1000 karakterer"
    },
    userAdmin: {
        password: "Minst 8 bokstaver",
        passwordRe: "Passordene matcher ikke"
    }
}