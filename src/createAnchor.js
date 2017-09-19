const createAnchor = (context, scene, camera, pattern, pictogram, url, onRenderFcts) => {
	const marker = new THREEx.ArMarkerControls(context, camera, {
		type: 'pattern',
		patternUrl: pattern,
		changeMatrixMode: 'cameraTransformMatrix',
	});
	marker.url = url;

	const axis = new THREE.AxisHelper();
	scene.add(axis);

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
		scene.add(mesh);
		onRenderFcts.push(delta => {
			mesh.rotation.y += Math.PI * delta / 2;
		});
	});
	return marker;
};

export default createAnchor;
