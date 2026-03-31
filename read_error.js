const fs = require('fs');
const content = fs.readFileSync('prisma_error.txt', 'utf16le');
console.log(content);
