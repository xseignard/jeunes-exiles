const initThree = canvas => {
	const renderer = new THREE.WebGLRenderer({
		antialias: true,
		alpha: true,
		canvas,
	});
	renderer.shadowMap.enabled = true;
	renderer.setClearColor(new THREE.Color('lightgrey'), 0);
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.domElement.style.position = 'absolute';
	renderer.domElement.style.top = '0px';
	renderer.domElement.style.left = '0px';
	document.body.appendChild(renderer.domElement);
	const scene = new THREE.Scene();
	const camera = new THREE.Camera();
	scene.add(camera);
	const ambient = new THREE.AmbientLight(0x666666);
	scene.add(ambient);
	const directionalLight = new THREE.DirectionalLight('white');
	directionalLight.position.set(1, -2, 0.3).setLength(2);
	directionalLight.shadow.mapSize.set(128, 128);
	directionalLight.shadow.camera.bottom = -0.6;
	directionalLight.shadow.camera.top = 0.6;
	directionalLight.shadow.camera.right = 0.6;
	directionalLight.shadow.camera.left = -0.6;
	directionalLight.castShadow = true;
	scene.add(directionalLight);

	return { renderer, scene, camera, directionalLight };
};

export default initThree;
