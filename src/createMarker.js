const createMarker = (context, scene, pattern, pictogram, url, onRenderFcts) => {
	const markerRoot = new THREE.Group();
	scene.add(markerRoot);

	const marker = new THREEx.ArMarkerControls(context, markerRoot, {
		type: 'pattern',
		patternUrl: pattern,
		// changeMatrixMode: 'cameraTransformMatrix',
		minConfidence: 0.6,
	});
	marker.url = url;

	const plane = new THREE.PlaneGeometry(1.1, 1.1, 1.1);
	const colorMaterial = new THREE.MeshBasicMaterial({
		color: '#d67c30',
		side: THREE.DoubleSide,
	});

	const planeMesh = new THREE.Mesh(plane, colorMaterial);
	planeMesh.rotation.x = Math.PI / 2;
	markerRoot.add(planeMesh);
	const loader = new THREE.TextureLoader();
	loader.load(pictogram, texture => {
		const geometry = new THREE.PlaneGeometry(1, 1, 1);
		const material = new THREE.MeshBasicMaterial({
			map: texture,
			transparent: true,
			side: THREE.DoubleSide,
		});
		const mesh = new THREE.Mesh(geometry, material);
		mesh.position.y = geometry.parameters.height / 2;
		markerRoot.add(mesh);
		onRenderFcts.push(delta => {
			mesh.rotation.y += Math.PI * delta / 2;
		});
	});
	return marker;
};

export default createMarker;
