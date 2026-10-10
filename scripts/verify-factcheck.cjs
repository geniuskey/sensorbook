const fs = require('node:fs'), vm = require('node:vm'), assert = require('node:assert/strict');
const path = require('node:path');
let checks = 0;
function check(v, message) { assert(v, message); checks++; }
function fn(chapter, name) {
  const text = fs.readFileSync(path.join(__dirname, '../chapters', chapter + '.html'), 'utf8');
  const start = text.indexOf('function ' + name + '('), end = text.indexOf('\n    }', start);
  assert(start >= 0 && end > start);
  return vm.runInNewContext('(' + text.slice(start, end + 6) + ')');
}
const fit = fn('characterization', 'linearityFit');
// Independent regression: transform y = c + bx into 1 = c/y + bx/y,
// then solve the two-variable normal system and verify orthogonality.
for (const a of [0, .005, .015, .06]) for (const knee of [4, 20, 40]) {
  const all = Array.from({length: 48}, (_, i) => {
    const x = .02 + 1.28 * i / 47, u = x / (1 + x ** knee) ** (1 / knee);
    return [x, 4000 * u * (1 - a * u)];
  });
  const top = Math.max(...all.map(p => p[1])), points = all.filter(p => p[1] >= .05 * top && p[1] <= .95 * top);
  const r = fit(points);
  let uu = 0, uv = 0, vv = 0, u1 = 0, v1 = 0;
  for (const [x, y] of points) { const u = 1/y, v = x/y; uu += u*u; uv += u*v; vv += v*v; u1 += u; v1 += v; }
  const det = uu*vv-uv*uv, c = (u1*vv-v1*uv)/det, b=(v1*uu-u1*uv)/det;
  const le = points.reduce((s,[x,y]) => s+100*Math.abs(y/(c+b*x)-1),0)/points.length;
  check(Math.abs(r.b-b)<1e-7 && Math.abs(r.c-c)<1e-7, 'weighted regression');
  check(Math.abs(r.le-le)<1e-9, 'mean absolute deviation');
}
const exact = fit([[1,5],[2,8],[3,11],[4,14]]);
check(Math.abs(exact.c-2)<1e-12 && Math.abs(exact.b-3)<1e-12 && exact.le<1e-12, 'exact line');
// Extract function with its own two-space indentation.
const noise = fs.readFileSync(path.join(__dirname,'../chapters/noise.html'),'utf8');
const start = noise.indexOf('function patchTheory('), end = noise.indexOf('\n  }',start);
const patch = vm.runInNewContext('('+noise.slice(start,end+4)+')');
let cases = 0;
for (const FWC of [2450,9800,45000]) for (const G of [1,4,16,64]) for (const dark of [0,10,1000]) for (const ratio of [.001,.5,.99,1,2,100]) {
  const limit = Math.min(FWC,FWC/G), signal = ratio*limit;
  const M = {eW: signal*255/48, FWC,G,dark,K0:FWC/959,sr:2};
  const r=patch(M), saturated=signal+dark>=limit;
  check(Math.abs(r.Sg-signal)<1e-8,'patch reflectance');
  check(r.saturated===saturated,'ADC or well saturation');
  check(saturated?r.snr===null:Math.abs(r.snr-signal/Math.sqrt(signal+dark+4+(M.K0/G)**2/12))<1e-8,'linear SNR'); cases++;
}
const chapterFiles=fs.readdirSync(path.join(__dirname,'../chapters')).filter(f=>f.endsWith('.html'));
const shutter = fs.readFileSync(path.join(__dirname,'../chapters/shutter.html'),'utf8');
const hs = shutter.indexOf('function hdrWeight('), he = shutter.indexOf('\n    }',hs);
const hdrWeight = vm.runInNewContext('('+shutter.slice(hs,he+6)+')', { RN: 3 });
for (const k of [1,10,100]) for (const signal of [0,1,100,10000]) {
  const radianceVariance = (signal+9)/(k*k);
  check(Math.abs(hdrWeight(k,signal)*radianceVariance-1)<1e-12, 'HDR inverse radiance variance');
}
check(hdrWeight(16,0)/hdrWeight(1,0)===256, 'read noise dominated HDR weights scale quadratically');
const nx = .00055*2/(2*.0008), mtf = 2/Math.PI*(Math.acos(nx)-nx*Math.sqrt(1-nx*nx));
check(Math.abs(mtf-.19958271899979174)<1e-12,'quiz diffraction MTF');
const advanced = fs.readFileSync(path.join(__dirname,'../chapters/advanced.html'),'utf8');
check(advanced.includes('\\operatorname{atan2}(Q_{90}-Q_{270},\\ Q_0-Q_{180})\\bmod 2\\pi'), 'full-circle iToF formula');
for (const phase of [.1,1,2,3,4,5,6]) {
  const x=Math.cos(phase), y=Math.sin(phase), wrapped=(Math.atan2(y,x)+2*Math.PI)%(2*Math.PI);
  check(Math.abs(wrapped-phase)<1e-12,'iToF quadrant recovery');
}
check(Math.ceil(4000*3000*12*30/2.5e9)===2,'payload lane minimum');
let scripts=0;
for (const f of chapterFiles) {
  const html=fs.readFileSync(path.join(__dirname,'../chapters',f),'utf8');
  for (const [,attrs,js] of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)) if(!/src=|ld\+json/.test(attrs)&&js.trim()) {new vm.Script(js,{filename:f});scripts++;}
}
console.log(JSON.stringify({checks,linearityCases:12,patchCases:cases,chapters:chapterFiles.length,scripts}));
