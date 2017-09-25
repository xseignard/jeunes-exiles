import React, { Component } from 'react';
import initThree from './initThree';
import initAR from './initAR';
import createMarker from './createMarker';

import Button from '../Button';

import './style.css';

class AR extends Component {
	componentDidMount() {
		// array of functions for the rendering loop
		const onRenderFcts = [];
		// create the Three renderer, scene and camera
		const { renderer, scene, camera } = initThree(this.canvas);
		this.renderer = renderer;
		// create the AR source and context
		const { source, context } = initAR(onRenderFcts, renderer, camera, scene);
		this.source = source;
		const patterns = ['etrange-miroir', 'lamte', 'lucie', 'seitinta', 'tammam'];
		const markers = [];
		patterns.forEach(pattern => {
			let picto = pattern === 'lamte' || pattern === 'seitinta' ? 'casque' : 'play';
			markers.push(
				createMarker(
					context,
					scene,
					`assets/qr/pattern-${pattern}.patt`,
					`assets/img/picto-${picto}.png`,
					`https://lesautrespossibles.fr/jeunes-exiles-${pattern}/`,
					onRenderFcts
				)
			);
		});

		window.addEventListener('click', e => {
			const visibleMarkers = markers.filter(m => m.object3d.visible);
			if (visibleMarkers.length === 1) window.location = `${visibleMarkers[0].url}#AR`;
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
	}

	componentWillUnmount() {
		this.renderer.dispose();
		this.source.domElement.style.display = 'none';
		setTimeout(() => {
			// We can't reset the AR.js created elements (no dispose, reset or destroy methods available)
			window.location.reload();
		}, 50);
	}

	render() {
		return (
			<div>
				<div className="p20 back">
					<Button label="Retour" link="/" history={this.props.history} />
				</div>
				<canvas
					id="arCanvas"
					ref={canvas => {
						this.canvas = canvas;
					}}
				/>
			</div>
		);
	}
}

export default AR;
