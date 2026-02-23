document.addEventListener("keydown", function(event) {
if (document.hidden) return;

const activeElement = document.activeElement;
if (
activeElement &&
(activeElement.tagName === "INPUT" ||
activeElement.tagName === "TEXTAREA" ||
activeElement.isContentEditable)
) {
return;
}

const key = event.key.toLowerCase();
if (key !== "g" && key !== "a" && key !== "d") return;

const videos = getAllVideos(document);
const playingVideo = videos.find(function(v) {
return !v.paused && !v.ended && v.readyState > 2;
});

if (!playingVideo) return;

if (key === "g") {
playingVideo.playbackRate =
playingVideo.playbackRate === 1.8 ? 1.0 : 1.8;
}

if (key === "a") {
let newRate = playingVideo.playbackRate - 0.1;
if (newRate < 0.5) newRate = 0.5;
playingVideo.playbackRate = parseFloat(newRate.toFixed(1));
}

if (key === "d") {
let newRate = playingVideo.playbackRate + 0.1;
if (newRate > 3.0) newRate = 3.0;
playingVideo.playbackRate = parseFloat(newRate.toFixed(1));
}

attachPersistentIndicator(playingVideo);
});

function getAllVideos(root) {
const result = [];

function traverse(node) {
if (!node) return;

if (node.tagName === "VIDEO") {
  result.push(node);
}

if (node.shadowRoot) {
  traverse(node.shadowRoot);
}

node.childNodes.forEach(function(child) {
  traverse(child);
});

}

traverse(root);
return result;
}

function attachPersistentIndicator(video) {
let indicator = video.parentElement.querySelector(".speed-indicator");

if (!indicator) {
indicator = document.createElement("div");
indicator.className = "speed-indicator";

indicator.style.position = "absolute";
indicator.style.top = "10px";
indicator.style.left = "10px";
indicator.style.padding = "6px 10px";
indicator.style.background = "rgba(0, 0, 0, 0.3)";
indicator.style.color = "white";
indicator.style.fontSize = "14px";
indicator.style.borderRadius = "6px";
indicator.style.zIndex = "999999";
indicator.style.pointerEvents = "none";

const parent = video.parentElement;
parent.style.position = "relative";
parent.appendChild(indicator);

}

indicator.textContent = video.playbackRate.toFixed(1) + "x";
}