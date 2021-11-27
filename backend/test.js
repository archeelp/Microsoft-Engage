import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const { HACKEREARTH_SECRET_KEY } = process.env;

const autoGrade = async function (input) {
  var data = JSON.stringify({
    lang: "PYTHON3",
    memory_limit: 2463232,
    callback: "https://client.com/execute/result/",
    time_limit: 5,
    source: "print('hello world')",
    input: input,
    context: {
      submissionId: "test",
    },
  });

  var config = {
    method: "post",
    url: "https://api.hackerearth.com/v4/partner/code-evaluation/submissions/",
    headers: {
      "cache-control": "no-cache",
      "client-secret": HACKEREARTH_SECRET_KEY,
      "content-type": "application/json",
    },
    data: data,
  };
  console.log(config);

  return axios(config);
};

autoGrade("test")
  .then((r) => console.log(r.data.he_id))
  .catch(console.error);
