import initThree from './initThree';
import initAR from './initAR';
import createMarker from './createMarker';
import './main.css';

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

window.addEventListener('click', e => {
	const visibleMarkers = markers.filter(m => m.object3d.visible);
	if (visibleMarkers.length === 1) window.location = visibleMarkers[0].url;
});

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
