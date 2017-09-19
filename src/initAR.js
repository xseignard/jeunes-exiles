const initAR = (onRenderFcts, camera, scene) => {
	const source = new THREEx.ArToolkitSource({
		sourceType: 'webcam',
	});
	// handle resize
	const onResize = () => {
		source.onResize();
		source.copySizeTo(renderer.domElement);
		if (context.arController !== null) {
			source.copySizeTo(context.arController.canvas);
		}
	};
	source.init(() => onResize);
	window.addEventListener('resize', () => onResize);

	const context = new THREEx.ArToolkitContext({
		cameraParametersUrl: 'assets/camera_para.dat',
		maxDetectionRate: 30,
		canvasWidth: 80 * 3,
		canvasHeight: 60 * 3,
	});
	context.init(() => {
		camera.projectionMatrix.copy(context.getProjectionMatrix());
	});

	onRenderFcts.push(function() {
		if (source.ready === false) return;
		context.update(source.domElement);
		scene.visible = camera.visible;
	});
	return { source, context };
};

export default initAR;
