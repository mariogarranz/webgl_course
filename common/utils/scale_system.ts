export class ScaleSystem {

    public static resizeCanvasToDisplaySize(canvas: HTMLCanvasElement, gl: WebGL2RenderingContext) {

        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;

        gl.viewport(0, 0, canvas.width, canvas.height);
    }

}