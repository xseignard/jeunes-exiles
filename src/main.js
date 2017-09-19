import initThree from './initThree';
import initAR from './initAR';
import createAnchor from './createAnchor';
import './main.css';

// array of functions for the rendering loop
const onRenderFcts = [];
// create the Three renderer, scene and camera
const { renderer, scene, camera } = initThree();
// create the AR source and context
const { source, context } = initAR(onRenderFcts, camera, scene);

const patterns = ['etrange-miroir', 'lamte', 'lucie', 'seitinta', 'tammam'];
const anchors = [];
patterns.forEach(pattern => {
	anchors.push(
		createAnchor(
			context,
			scene,
			camera,
			`assets/qr/pattern-${pattern}.patt`,
			'assets/img/voir-la-video2.png',
			`https://lesautrespossibles.fr/jeunes-exiles-${pattern}/`,
			onRenderFcts
		)
	);
});
console.log(anchors);
setTimeout(() => {
	context.arController.addEventListener('getMarker', e => {
		if (e.data.marker.idPatt !== -1) {
			const current = anchors.filter(anchor => e.data.marker.idPatt === anchor.id)[0];
			console.log(e.data.marker.idPatt, current.url);
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
