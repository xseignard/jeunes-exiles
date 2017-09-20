const initAR = (onRenderFcts, renderer, camera, scene) => {
	const source = new THREEx.ArToolkitSource({
		sourceType: 'webcam',
	});
	// handle resize
	const onResize = () => {
		source.onResizeElement();
		source.copyElementSizeTo(renderer.domElement);
		if (context.arController !== null) {
			source.copyElementSizeTo(context.arController.canvas);
		}
	};
	source.init(onResize);
	window.addEventListener('resize', onResize);

	const context = new THREEx.ArToolkitContext({
		cameraParametersUrl: 'assets/camera_para.dat',
		maxDetectionRate: 10,
		canvasWidth: 80 * 6,
		canvasHeight: 60 * 6,
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
