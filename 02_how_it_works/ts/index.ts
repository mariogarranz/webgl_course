import { WebGLHelper } from "../../common/utils/webgl_helper";
import { ScaleSystem } from "../../common/utils/scale_system";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const gl = canvas.getContext('webgl2');

const program = WebGLHelper.createProgramFromShaderFiles(
    gl,
    './02_how_it_works/shaders/vertex_shader.glsl',
    './02_how_it_works/shaders/fragment_shader.glsl'
);

function setGeometry(gl: WebGL2RenderingContext) {
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([
            100, 100,
            300, 800,
            900, 500
        ]),
        gl.STATIC_DRAW
    );
}

function drawScene(vertexArrayObject: WebGLVertexArrayObject, resolutionUniformLocation: WebGLUniformLocation) {
    gl.useProgram(program);

    ScaleSystem.resizeCanvasToDisplaySize(canvas, gl);
    gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);

    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.bindVertexArray(vertexArrayObject);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
}

// Look up where the vertex data needs to go
const positionLocation = gl.getAttribLocation(program, 'a_position');
const resolutionUniformLocation = gl.getUniformLocation(program, "u_resolution");

// Create a set of attributes
const vertexArrayObject = gl.createVertexArray();
gl.bindVertexArray(vertexArrayObject);

// Create a buffer
const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

// Set geometry
setGeometry(gl);

// Tell the position attribute how to pull data out of the current ARRAY_BUFFER
gl.enableVertexAttribArray(positionLocation);
const size = 2; // 2 components per iteration
const type = gl.FLOAT; // the data is 32bit floats
const normalize = false; // don't normalize the data
const stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next position
const offset = 0; // start at the beginning of the buffer
gl.vertexAttribPointer(positionLocation, size, type, normalize, stride, offset);

drawScene(vertexArrayObject, resolutionUniformLocation);

function updateLoop() {

}