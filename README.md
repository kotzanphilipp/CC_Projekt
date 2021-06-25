# Cloud-Computing-Projekt

Webshop

Nutzerinfo Endpoints

https://europe-west3-webshop-316612.cloudfunctions.net/nutzerinfo

// get all users
usersApp.get("/"

// get user by Email
usersApp.get("/:email"

usersApp.post("/submit"
"INSERT INTO nutzerinformation " +
        "(email, nachname, vorname, telefonnummer, adresse) values (\"" +
        req.body.email +
        "\", \"" +
        req.body.nachname +
        "\", \"" +
        req.body.vorname +
        "\", \"" +
        req.body.telefonnummer +
        "\", \"" +
        req.body.adresse +
        "\" );",

usersApp.put("/edit/:email"

usersApp.delete("/delete/:email"

