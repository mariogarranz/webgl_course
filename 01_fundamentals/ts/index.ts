import { ScaleSystem } from "../../common/utils/scale_system";

const loadFileSync = function(url: string) {
    var req = new XMLHttpRequest();
    req.open("GET", url, false);
    req.send(null);
    return (req.status === 200) ? req.responseText : null;
};

const createShader = function(gl: WebGL2RenderingContext, type: number, source: string) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if(gl.getShaderParameter(shader, gl.COMPILE_STATUS)){
        return shader;
    }

    console.log('Error creating shader');
    console.log(shader);
    gl.deleteShader(shader);
}

const createProgram = function(gl: WebGL2RenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader) {
    const program = gl.createProgram();

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);

    gl.linkProgram(program);

    if(gl.getProgramParameter(program, gl.LINK_STATUS)){
        return program;
    }

    console.log('Error creating program');
    console.log(program);

    gl.deleteProgram(program);
}

const setRectangle = function(gl: WebGL2RenderingContext, x: number, y: number, width: number, height: number) {
    const x0 = x;
    const x1 = x + width;
    const y0 = y;
    const y1 = y + height;

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
        x0, y0,
        x1, y0,
        x0, y1,
        x0, y1,
        x1, y0,
        x1, y1
    ], ), gl.STATIC_DRAW);
}

const randomInt = function(range: number) {
    return Math.floor(Math.random() * range);
}

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const gl = canvas.getContext("webgl2");

ScaleSystem.resizeCanvasToDisplaySize(canvas, gl);

const vertexShader = createShader(gl, gl.VERTEX_SHADER, loadFileSync('./01_fundamentals/shaders/vertex_shader.glsl'));
const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, loadFileSync('./01_fundamentals/shaders/fragment_shader.glsl'));

const program = createProgram(gl, vertexShader, fragmentShader);

const positionAttributeLocation = gl.getAttribLocation(program, "a_position");
const positionBuffer = gl.createBuffer();

const resolutionUniformLocation = gl.getUniformLocation(program, "u_resolution");
const colorUniformLocation = gl.getUniformLocation(program, "u_color");

gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);


// const positions = [
//     10, 20,
//     80, 20,
//     10, 30,
//     10, 30,
//     80, 20,
//     80, 30
// ];
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(), gl.STATIC_DRAW);

const vertexArrayObject = gl.createVertexArray();
gl.bindVertexArray(vertexArrayObject);

gl.enableVertexAttribArray(positionAttributeLocation);

const size = 2;
const type = gl.FLOAT;
const normalize = false;
const stride = 0;
const offset = 0;
gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);

// Clear the canvas
gl.clearColor(0, 0, 0, 0);
gl.clear(gl.COLOR_BUFFER_BIT);

gl.useProgram(program);
gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);

gl.bindVertexArray(vertexArrayObject);

// gl.drawArrays(gl.TRIANGLES, 0, 6);

for(let i = 0; i < 50; i++) {
    setRectangle(gl, randomInt(gl.canvas.width), randomInt(gl.canvas.height), randomInt(300), randomInt(300));
    gl.uniform4f(colorUniformLocation, Math.random(), Math.random(), Math.random(), 1);

    gl.drawArrays(gl.TRIANGLES, 0, 6);
}