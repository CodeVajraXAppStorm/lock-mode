const $ = id => document.getElementById(id);
const FL = () => window.Capacitor && Capacitor.Plugins && Capacitor.Plugins.FocusLock;
let tick;

function show(lock) {
  $('setup').classList.toggle('hidden', lock);
  $('lock').classList.toggle('hidden', !lock);
}
function fmt(ms) {
  const s = Math.max(0, Math.ceil(ms / 1000));
  return String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0');
}
function run() {
  const st = JSON.parse(localStorage.getItem('fl') || 'null');
  if (!st) return show(false);
  show(true);
  $('lockMsg').textContent = st.msg;
  clearInterval(tick);
  const upd = () => {
    const left = st.end - Date.now();
    $('timer').textContent = fmt(left);
    if (left <= 0) release();
  };
  upd();
  tick = setInterval(upd, 500);
  try { FL() && FL().start(); } catch (e) {}
}
function release() {
  clearInterval(tick);
  localStorage.removeItem('fl');
  $('pwBox').classList.add('hidden');
  try { FL() && FL().stop(); } catch (e) {}
  show(false);
}

$('startBtn').onclick = () => {
  const mins = parseFloat($('mins').value);
  const pw = $('pw').value;
  if (!mins || mins <= 0 || !pw) return alert('समय और पासवर्ड डालो');
  localStorage.setItem('fl', JSON.stringify({
    end: Date.now() + mins * 60000,
    msg: $('msg').value,
    pw: pw
  }));
  run();
};
$('unlockBtn').onclick = () => {
  $('pwBox').classList.remove('hidden');
  $('pwIn').value = '';
  $('err').textContent = '';
};
$('pwCancel').onclick = () => $('pwBox').classList.add('hidden');
$('pwOk').onclick = () => {
  const st = JSON.parse(localStorage.getItem('fl') || 'null');
  if (st && $('pwIn').value === st.pw) release();
  else $('err').textContent = 'गलत पासवर्ड';
};
run();
