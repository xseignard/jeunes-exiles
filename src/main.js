import initThree from './initThree';
import initAR from './initAR';
import createMarker from './createMarker';
import './main.css';

// current detected url
// const url = document.querySelector('#url');
let currentUrl = '';

// array of functions for the rendering loop
const onRenderFcts = [];
// create the Three renderer, scene and camera
const { renderer, scene, camera } = initThree();
// create the AR source and context
const { source, context } = initAR(onRenderFcts, renderer, camera, scene);

const patterns = ['etrange-miroir', 'lamte', 'lucie', 'seitinta', 'tammam'];
const markers = [];
patterns.forEach(pattern => {
	markers.push(
		createMarker(
			context,
			scene,
			`assets/qr/pattern-${pattern}.patt`,
			`assets/img/picto-${pattern}.png`,
			`https://lesautrespossibles.fr/jeunes-exiles-${pattern}/`,
			onRenderFcts
		)
	);
});
console.log(markers);
// HACKY: give time for the context to be intialized before attaching the event listener
setTimeout(() => {
	context.arController.addEventListener('getMarker', e => {
		if (e.data.marker.idPatt !== -1) {
			// console.log(e);
			const current = markers.filter(m => e.data.marker.idPatt === m.id)[0];
			if (currentUrl !== current.url) {
				currentUrl = current.url;
				console.log(currentUrl);
			}
		}
	});
}, 1000);

onRenderFcts.push(() => {
	renderer.render(scene, camera);
});

let lastTimeMsec = null;
const animate = nowMsec => {
	requestAnimationFrame(animate);
	lastTimeMsec = lastTimeMsec || nowMsec - 1000 / 60;
	const deltaMsec = Math.min(200, nowMsec - lastTimeMsec);
	lastTimeMsec = nowMsec;
	onRenderFcts.forEach(onRenderFct => {
		onRenderFct(deltaMsec / 1000, nowMsec / 1000);
	});
};
requestAnimationFrame(animate);
