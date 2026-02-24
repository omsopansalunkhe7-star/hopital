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
    console.log(`${name} exited with code ${code}`);
  });

  return child;
}

const backend = runService('Backend', 'backend', 'npm', ['start']);
const frontend = runService('Frontend', 'frontend', 'npm', ['start']);

process.on('SIGINT', () => {
  backend.kill();
  frontend.kill();
  process.exit();
});