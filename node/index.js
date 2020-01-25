const instagram = require("user-instagram");
const bodyParser = require("body-parser");
const express = require("express");
const admin = require("firebase-admin");
const serviceAccount = require("./key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://gift-devace.firebaseio.com"
});
const db = admin.firestore();

const app = express();
app.use(bodyParser.json());

// app.post("/register", async function (req, res) {
//   const {
//     login,
//     password,
//     link_instagram
//   } = req.body;
//   if (login == "" || password == "" || link_instagram == "") return res.send("Данные пустые")
//   await instagram(link_instagram)
//     .then(res => {
//       const data = {
//         link_inst: link_instagram,
//         id_inst: res.id,
//         avatar: res.avatar
//       };
//       db.collection("Users")
//         .doc(login)
//         .set(data);
//     })
//     .catch(e => {
//       console.error(data);
//     });

//   return res.send("true");
// });
app.post("/register", (req, res) => {
  return res.send("hi");
});
app.listen(5000, () => console.log(`Server is run in port: 5000`));
