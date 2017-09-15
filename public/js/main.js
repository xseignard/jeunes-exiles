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
	const camera = ARjs.Utils.createDefaultCamera('best');
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
	const markerParams = {
		type: 'pattern',
		patternUrl: 'assets/qr/pattern-tammam.patt',
		changeMatrixMode: 'cameraTransformMatrix',
		markersAreaEnabled: false,
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
	const arAnchor = new ARjs.Anchor(arSession, markerParams);
	onRenderFcts.push(() => {
		arAnchor.update();
	});
	const hitTesting = new ARjs.HitTesting(arSession);
	onRenderFcts.push(() => {
		hitTesting.update(camera, arAnchor.object3d, arAnchor.parameters.changeMatrixMode);
	});
	renderer.domElement.addEventListener(
		'click',
		e => {
			console.log(hitTesting.testDomEvent(e));
		},
		false
	);
	const arWorldRoot = arAnchor.object3d;
	const axis = new THREE.AxisHelper();
	arWorldRoot.add(axis);

	const loader = new THREE.TextureLoader();
	loader.load('assets/img/voir-la-video2.png', texture => {
		const geometry = new THREE.PlaneGeometry(1, 1, 1);
		const material = new THREE.MeshBasicMaterial({
			map: texture,
			transparent: true,
			side: THREE.DoubleSide,
		});
		const mesh = new THREE.Mesh(geometry, material);
		mesh.position.y = geometry.parameters.height / 2;
		arWorldRoot.add(mesh);
		onRenderFcts.push(delta => {
			mesh.rotation.y += Math.PI * delta / 2;
		});
	});

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
