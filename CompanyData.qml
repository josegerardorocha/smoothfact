pragma Singleton

import QtQuick

QtObject {
    id: companyData

    property string name: ""
    property string address: ""
    property string nif: ""
    property string niss: ""
    property string iban: ""
    property string banco: ""
    property string cae: ""

    function loadData() {
        HttpRequest.get("backend/info.php", function(success, response) {
            if (success) {
                name    = response.name
                address = response.address
                nif     = response.nif
                niss    = response.niss
                iban    = response.iban
                banco   = response.banco
                cae     = response.cae
                console.log("Company data loaded")
            } else {
                console.log("Failed to load data")
            }
        })
    }

    function submitData() {
        var params =
                "&name="    + encodeURIComponent(name)         +
                "&address=" + encodeURIComponent(address)      +
                "&nif="     + encodeURIComponent(nif)          +
                "&niss="    + encodeURIComponent(niss)         +
                "&iban="    + encodeURIComponent(iban)         +
                "&banco="   + encodeURIComponent(banco)        +
                "&cae="     + encodeURIComponent(cae)
        // console.log("submitData params=", params)
        HttpRequest.post("backend/info.php", params, function(success, response) {
            if (success) {
                console.log("Update successful:", JSON.stringify(response))
            } else {
                console.log("Update failed")
            }
        })
    }
}
