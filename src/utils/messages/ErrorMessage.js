export default {
    missingInput: (fieldName) => {
        return fieldName ? fieldName + " er obligatorisk" : "Feltet er obligatorisk";
    },
    serverError: "Det er oppstått problemer med server, forespørselen ble ikke utført",
    requestError: "Det er en feil med forespørselen, kanskje objektet allerede eksisterer",
    company: {
        wrongTickerFormat: "Ticker kan kun inneholde store bokstaver og tall, og være under ti karakterer",
        wrongNameFormat: "Navnet må være under 50 karakterer langt",
        wrongDescFormat: "Beskrivelsen må være mellom 50 og 1000 karakterer"
    }
}