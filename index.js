const express = require('express');
require('./services/passport');

const app = express();
const port =process.env.PORT || 5000;

require('./routes/authRoutes')(app);


//app.get('/', (req, res) => res.send({hi: 'there'}));
app.listen(port);
