const express = require("express");
const instagram = require("user-instagram");
const consola = require("consola");
const firebase = require("firebase");
// const serviceAccount = require("./key.json");
const bodyParser = require("body-parser");

const {
  Nuxt,
  Builder
} = require("nuxt");
const app = express();
app.use(bodyParser.json());
firebase.initializeApp({
  apiKey: "AIzaSyDkP8-8yzzz3Oh51DOakCVCXEDGnL93Sdw",
  authDomain: "gift-devace.firebaseapp.com",
  databaseURL: "https://gift-devace.firebaseio.com",
  projectId: "gift-devace",
  storageBucket: "gift-devace.appspot.com",
  messagingSenderId: "1004486343977",
  appId: "1:1004486343977:web:08bc0da3e899ae84aa8b38",
  measurementId: "G-J9492DF339"
});

// Import and Set Nuxt.js options
const config = require("../nuxt.config.js");
config.dev = process.env.NODE_ENV !== "production";

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config);

  const {
    host,
    port
  } = nuxt.options.server;

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt);
    await builder.build();
  } else {
    await nuxt.ready();
  }

  // Give nuxt middleware to express
  app.use(nuxt.render);

  // Listen the server
  app.listen(port, host);
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  });
}
start();
app.post("/register", async (req, res) => {
  const {
    email,
    password,
    link_instagram
  } = req.body;
  try {
    await instagram(link_instagram)
      .then(result => {
        if (result.isPrivate === false) {
          firebase
            .auth()
            .createUserWithEmailAndPassword(email, password).then(data => {
              firebase.firestore().collection("users/").add({
                link_inst: link_instagram,
                id_inst: result.id,
                avatar: result.avatar,
                id: data.user.uid
              })
              return res.status(200)
            })
            .catch(error => {
              return res.status(401).send(error)
            })
        } else {
          return res.status(401)
        }
      })
      .catch(e => {
        return res.status(500).json(e);
      });
  } catch (e) {
    return res.status(500).json(e);
  }

});
