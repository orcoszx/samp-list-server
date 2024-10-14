const samp = require('samp-query');

const options = {
  host: '104.234.180.248', // Ganti dengan IP server Anda
  port: '7001', // Ganti dengan port server Anda
  timeout: 1000
};

samp(options, (error, response) => {
  if (error) {
    console.log('Server offline');
  } else {
    console.log('Server Online:', response);
  }
});
