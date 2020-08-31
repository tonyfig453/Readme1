const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");

inquirer
    .prompt([
        {
            type: "input",
            message: "What is your user name?",
            name: "userName"
        },
        {
            type: "input",
            message: "what is your email?",
            name: "userEmail",

        },
        {
            type: "input",
            message: "what is your project URL?",
            name: "projectUrl"
        },
        {
            type: "input",
            message: "what is your project's name?",
            name: "projectName",
        },
        {
            type: "input",
            message: "please write a short decription of your project",
            name: "projectDescription",
        },
        {
            type: "list",
            message: "what kind of license should your project have",
            name: "projectLicense",
            choices: ["MIT", "Apache 2.0", "GPL 3.0", "BSD 3", "None"],
        },
        {
            type: "input",
            message: "What command should be run to install dependencies?",
            name: "projectInstall",
            default: "npm i",
        },
        {
            type: "input",
            message: "what command should be run to run tests?",
            name: "projectTests",
            default: "npm test",
        },
        {
            type: "input",
            message: "what does the user need to know about using the repo?",
            name: "projectRepo",
        },
        {
            type: "input",
            message: "what does the user need to know about the contributing to the repo?",
            name: "projectContribute",
        },
        
    ])

    .then(function (response) {
        console.log(response.userName)
        const queryUrl = `https://api.github.com/users/${response.userName}/repos?per_page=100`;
        
        axios
        .get(queryUrl)
        
        .then(function (res) {
            let resultString = `# ${response.projectName} [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)]\n 
            \n## Table of contents\n\n*[Installation](#installation)\n\n*[Usage](#Usage)\n\n*[License](#Licence)\n\n*[Contribution](#Contribution)\n\n*[Tests](#Tests)\n\n*[Questions](#Questions)
            \n Description \n${response.projectDescription}
            \n## Installation \n\n
            To install run the following ${response.projectInstall}\n\n
            \n## Usage \n\n${response.projectRepo}\n\n
            \n## Licence \n\n
            Licenced by ${response.projectLicense}\n\n
            \n## Contribution \n${response.projectContribute}
            \n## Tests \n\n
            To run test run the following ${response.projectTests}
            \n## Questions \n\nif you have any questions contact me at [${response.userName}](${response.projectUrl}) at ${response.userEmail} `;
            console.log(res.data);
            writeToFile("README.md", resultString )
        });
        console.log(response.userName)
        console.log(response.userEmail)
        console.log(response.projectUrl)
        console.log(response.projectName)
        console.log(response.projectDescription)
        console.log(response.projectLicense)
        console.log(response.projectInstall)
        console.log(response.projectTests)
        console.log(response.projectRepo)
        console.log(response.projectContribute)


    });

   









// // array of questions for user
// const questions = ["what is your email?",
//     "the URL to your project?",
//     "what is your project's name?",
//     "Please write a short description of your project",


// ];

// function to write README file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, function (err) {
        if (err) throw err;
        console.log('Saved!');
      });
}

// function to initialize program
function init() {
  

}

// function call to initialize program
init();
