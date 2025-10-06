// --- HttpRequest.js ---
// Base URL for all requests
const BASE_URL = "http://localhost/faturas/";

// POST request helper
function post(endpoint, params, callback) {
    var xhr = new XMLHttpRequest()
    xhr.open("POST", BASE_URL + endpoint)
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")

    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                try {
                    var response = JSON.parse(xhr.responseText)
                    callback(true, response)
                } catch (e) {
                    console.log("Error parsing JSON:", e)
                    callback(false, null)
                }
            } else {
                console.log("HTTP error:", xhr.status, xhr.statusText)
                callback(false, null)
            }
        }
    }

    xhr.send(params)
}

// GET request helper (optional)
function get(endpoint, callback) {
    var xhr = new XMLHttpRequest()
    xhr.open("GET", BASE_URL + endpoint)

    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                try {
                    var response = JSON.parse(xhr.responseText)
                    callback(true, response)
                } catch (e) {
                    console.log("Error parsing JSON:", e)
                    callback(false, null)
                }
            } else {
                console.log("HTTP error:", xhr.status, xhr.statusText)
                callback(false, null)
            }
        }
    }

    xhr.send()
}
