export class WebGLHelper {

    public static loadFileSync(url: string) {
        const req = new XMLHttpRequest();

        req.open("GET", url, false);
        req.send(null);

        return (req.status === 200) ? req.responseText : null;
    };

    public static compileShader(gl: WebGL2RenderingContext, source: string, type: number) {
        const shader = gl.createShader(type);

        gl.shaderSource(shader, source);
        gl.compileShader(shader);

        const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);

        if(!success) {
            throw `Error compiling shader: ${gl.getShaderInfoLog(shader)}`;
        }

        return shader;
    }

    public static createProgram(gl: WebGL2RenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader) {
        const program = gl.createProgram();

        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);

        gl.linkProgram(program);

        const success = gl.getProgramParameter(program, gl.LINK_STATUS);

        if(!success) {
            throw `Error linking program: ${gl.getProgramInfoLog(program)}`;
        }

        return program;
    }

    public static createProgramFromShaderFiles(gl: WebGL2RenderingContext, vertexShaderFile: string, fragmentShaderFile: string): WebGLProgram {
        const vertexShaderSource = this.loadFileSync(vertexShaderFile);
        const fragmentShaderSource = this.loadFileSync(fragmentShaderFile);

        const fragmentShader = this.compileShader(gl, fragmentShaderSource, gl.FRAGMENT_SHADER);
        const vertexShader = this.compileShader(gl, vertexShaderSource, gl.VERTEX_SHADER);

        const program = this.createProgram(gl, vertexShader, fragmentShader);

        return program;
    }

}