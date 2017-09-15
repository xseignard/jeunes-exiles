window.createAnchor = (session, pattern, pictogram, url, onRenderFcts) => {
	const markerParams = {
		type: 'pattern',
		patternUrl: pattern,
		changeMatrixMode: 'cameraTransformMatrix',
		markersAreaEnabled: false,
	};
	const anchor = new ARjs.Anchor(session, markerParams);
	onRenderFcts.push(() => {
		anchor.update();
	});
	const anchorWorldRoot = anchor.object3d;
	anchorWorldRoot.userData.url = url;
	const axis = new THREE.AxisHelper();
	anchorWorldRoot.add(axis);

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
		anchorWorldRoot.add(mesh);
		mesh.addEventListener('click', () => {
			console.log('test');
		});
		onRenderFcts.push(delta => {
			mesh.rotation.y += Math.PI * delta / 2;
		});
	});
	return anchor;
};
