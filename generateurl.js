function generateImageUrl(name, input) {
  const baseUrl = "https://s3.ap-northeast-2.amazonaws.com/helperit-s3/media/";
  const pattern = new RegExp(`${name}/[a-z0-9-]+/[a-z0-9]+\\.PNG`, "i");
  const match = input.match(pattern);
  if (match) {
    return baseUrl + match[0];
  }
  return input;
}
// 예제 사용
const resultUrl = generateImageUrl(
  "message",
  "message/dd372fd4-8291-4d9a-ad9a-772194d519f7/2761021eb484aaeeeb8e3ab530cfde7a.PNG"
);
console.log(resultUrl); // "https://s3.ap-northeast-2.amazonaws.com/helperit-s3/media/message/dd372fd4-8291-4d9a-ad9a-772194d519f7/2761021eb484aaeeeb8e3ab530cfde7a.PNG"
console.log(generateImageUrl("message", "하이"));
console.log(resultUrl.startsWith("https://"));
console.log(
  "message/dd372fd4-8291-4d9a-ad9a-772194d519f7/2761021eb484aaeeeb8e3ab530cfde7a.PNG".startsWith(
    "message"
  )
);
