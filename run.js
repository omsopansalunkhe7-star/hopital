const { spawn } = require('child_process');
const path = require('path');

function runService(name, dir, command, args) {
  console.log(`Starting ${name}...`);
  const child = spawn(command, args, {
    cwd: path.join(__dirname, dir),
    shell: true,
    stdio: 'inherit'
  });

  child.on('error', (err) => {
    console.error(`Failed to start ${name}:`, err);
  });

  child.on('exit', (code) => {
    if (code !== 0) {
        console.error(`${name} exited with code ${code}`);
    } else {
        console.log(`${name} exited successfully.`);
    }
  });
}

runService('backend', 'backend', 'node', ['index.js']);
runService('frontend', 'frontend', 'npm', ['start']);