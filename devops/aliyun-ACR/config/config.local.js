'use strict';

const moduleList = require('./projects/index');

const projects = [];
moduleList.forEach((m) => {
  m.projects.forEach((project) => {
    project.token = m.token;
  });
  projects.push(...m.projects);
});

module.exports = {
  rancher: { projects },
};
