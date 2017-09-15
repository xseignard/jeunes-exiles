(() => {
	const renderer = new THREE.WebGLRenderer({
		// antialias: true,
		alpha: true,
	});
	renderer.autoClear = false;
	renderer.setClearColor(new THREE.Color('lightgrey'), 0);
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.domElement.style.position = 'absolute';
	renderer.domElement.style.top = '0px';
	renderer.domElement.style.left = '0px';
	document.body.appendChild(renderer.domElement);
	// array of functions for the rendering loop
	const onRenderFcts = [];

	const scene = new THREE.Scene();
	const camera = ARjs.Utils.createDefaultCamera('artoolkit');
	scene.add(camera);

	// const arProfile = new ARjs.Profile()
	// 	.sourceWebcam()
	// 	.trackingMethod(trackingMethod)
	// 	.checkIfValid();

	const sourceParams = { sourceType: 'webcam' };
	const contextParams = {
		cameraParametersUrl: 'assets/camera_para.dat',
		maxDetectionRate: 30,
		canvasWidth: 80 * 3,
		canvasHeight: 60 * 3,
	};

	const arSession = new ARjs.Session({
		scene,
		renderer,
		camera,
		sourceParameters: sourceParams,
		contextParameters: contextParams,
	});
	onRenderFcts.push(() => {
		arSession.update();
	});

	const patterns = ['etrange-miroir', 'lamte', 'lucie', 'seitinta', 'tammam'];
	const anchors = [];
	patterns.forEach(pattern => {
		anchors.push(
			createAnchor(
				arSession,
				`assets/qr/pattern-${pattern}.patt`,
				'assets/img/voir-la-video2.png',
				`https://lesautrespossibles.fr/jeunes-exiles-${pattern}/`,
				onRenderFcts
			)
		);
	});
	console.log(anchors);

	// const hitTesting = new ARjs.HitTesting(arSession);
	// onRenderFcts.push(() => {
	// 	anchors.forEach(anchor => {
	// 		hitTesting.update(camera, anchor.object3d, anchor.parameters.changeMatrixMode);
	// 	});
	// });

	onRenderFcts.push(() => {
		renderer.clear();
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
})();
