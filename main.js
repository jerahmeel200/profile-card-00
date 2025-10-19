function updateUTCTime() {
	const utcTimeElement = document.getElementById("currentTime");
	const now = new Date();
	utcTimeElement.textContent = now.toUTCString();
}

updateUTCTime();
setInterval(updateUTCTime, 1000);




