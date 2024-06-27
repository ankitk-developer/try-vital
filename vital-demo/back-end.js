const { VitalClient, VitalEnvironment } = require("@tryvital/vital-node");
const cors = require("cors");

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(cors());
app.use(bodyParser.json());
const port = 5000;
app.post("/", async (req, res) => {
  const { name } = req.body;
  console.log(name);
  let data, link, resultLink;
  const client = new VitalClient({
    apiKey: "sk_us_7KEMAKR91P3cuer9fH028SFEYiPm6Vbhh4Klb-uwaEY",
    environment: VitalEnvironment.Sandbox,
  });
  if (name) {
    let input = { clientUserId: name };
    data = await client.user.create(input);
    console.log(JSON.stringify(data));
  }

  if (data.userId) {
    const request = {
      userId: data.userId,
      // provider: "google_fit",
      redirectUrl: "http://localhost:3000/",
    };
    link = await client.link.token(request);
    console.log("link data", JSON.stringify(link));
  }
  if (link.linkToken) {
    resultLink = `https://link.tryvital.io/?token=${link.linkToken}&env=sandbox&region=us`;
    return res.send({ link: resultLink });
  }
  console.log("executed");

  return res.send("Error: Could not generate link");
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
