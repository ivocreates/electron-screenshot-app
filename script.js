let screenshotInterval;
let screenshotCount = 0;

function showError(msg) {
  $('#errorMessage').text(msg).removeClass('d-none');
  setTimeout(() => $('#errorMessage').addClass('d-none'), 3000);
}

function captureScreenshot() {
  const container = $('#screenshotContainer');
  const div = $('<div class="col"></div>');
  const image = $('<div></div>')
    .css({
      height: '150px',
      backgroundColor: `hsl(${Math.random() * 360}, 70%, 60%)`,
      borderRadius: '10px'
    });
  div.append(image);
  container.prepend(div);
  screenshotCount++;
}

$('#startBtn').click(() => {
  if (screenshotInterval) return;

  const min = parseInt($('#intervalMin').val(), 10);
  const sec = parseInt($('#intervalSec').val(), 10);
  const intervalMs = ((min * 60) + sec) * 1000;

  if (intervalMs <= 0) {
    showError('Interval must be greater than 0');
    return;
  }

  captureScreenshot(); // immediate shot
  screenshotInterval = setInterval(captureScreenshot, intervalMs);
});

$('#stopBtn').click(() => {
  clearInterval(screenshotInterval);
  screenshotInterval = null;
});

$('#downloadBtn').click(() => {
  html2canvas(document.body).then(canvas => {
    const link = document.createElement('a');
    link.download = `screenshot_${Date.now()}.png`;
    link.href = canvas.toDataURL();
    link.click();
  });
});
