const initThree = canvas => {
	const renderer = new THREE.WebGLRenderer({
		// antialias: true,
		alpha: true,
		canvas,
	});
	renderer.setClearColor(new THREE.Color('lightgrey'), 0);
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.domElement.style.position = 'absolute';
	renderer.domElement.style.top = '0px';
	renderer.domElement.style.left = '0px';
	document.body.appendChild(renderer.domElement);
	const scene = new THREE.Scene();
	const camera = new THREE.Camera();
	scene.add(camera);
	return { renderer, scene, camera };
};

export default initThree;
