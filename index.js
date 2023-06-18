const express = require('express');
const cors = require('cors');

const PORT = 8080;
const app = express();

app.use(express.static('public'));

app.use(express.json());
app.use(cors());

const {
  authRoute,
  tweetsRoute,
  // productRouter,
  // usersRoute,
  // categoriesRoute,
  // orderMenuRoute,
  // transactionRoute,
} = require('./routers');

app.use('/auth', authRoute);
app.use('/tweet', tweetsRoute);
// app.use('/products', productRouter);
// app.use('/categories', categoriesRoute);
// app.use('/users', usersRoute);
// app.use('/ordermenu', orderMenuRoute);
// app.use('/transactions', transactionRoute);

app.listen(PORT, () => {
  console.log(`server started successfully on port ${PORT}`);
});
