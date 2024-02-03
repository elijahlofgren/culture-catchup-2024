const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger_output.json'; // This is where the output will be saved
const endpointsFiles = ['./app.js']; // Replace './app.js' with the path to your main file where you define your endpoints

swaggerAutogen(outputFile, endpointsFiles).then(() => {
    console.log('Swagger JSON generated');
});
