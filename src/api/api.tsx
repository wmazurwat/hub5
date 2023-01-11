import axios from "axios";

const URL = "http://localhost:8000";
export const getVideoInfo = async (url: string) => {
  console.log(url);

  const info = await axios
    .post(URL + "/yt-info", {
      url,
    })
    .then((resp) => resp.data);
  return info;
};

export const getMp3 = async (url: string, samplingRate: number) => {
  console.log(url);
  const x = await fetch(URL + "/yt-new", {
    method: "POST",
    body: JSON.stringify({ url, samplingRate }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.body)
    .then((body) => {
      const reader = body?.getReader();
      return new ReadableStream({
        start(controller) {
          return pump();
          // @ts-ignore
          function pump() {
            return reader?.read().then(({ done, value }) => {
              // When no more data needs to be consumed, close the stream
              if (done) {
                controller.close();
                return;
              }
              // Enqueue the next data chunk into our target stream
              controller.enqueue(value);
              return pump();
            });
          }
        },
      });
    })
    .then((stream) => new Response(stream))
    .then((response) => response.blob())
    .catch((err) => console.error(err));
  return x;

  // const mp3 = await axios
  //   .post(URL + "/yt-new", {
  //     url,
  //   })
  //   .then((resp) => {
  //     console.log(resp.headers);
  //     return resp.data;
  //   });
  // return mp3;
};
