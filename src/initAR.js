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
		detectionMode: 'mono',
		maxDetectionRate: 20,
		canvasWidth: 80 * 3,
		canvasHeight: 60 * 3,
	});
	context.init(() => {
		camera.projectionMatrix.copy(context.getProjectionMatrix());
	});

	onRenderFcts.push(() => {
		if (source.ready === false) return;
		context.update(source.domElement);
	});

	return { source, context };
};

export default initAR;
