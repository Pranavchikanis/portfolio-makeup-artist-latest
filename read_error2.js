const { execSync } = require('child_process');
try {
  execSync('npx prisma validate', { stdio: 'pipe' });
} catch (err) {
  console.log(err.stderr.toString());
  console.log(err.stdout.toString());
}
