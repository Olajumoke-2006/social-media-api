const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');

const authRoutes = require('./routes/auth.routes');
const postRoutes = require('./routes/post.routes');
const followRoutes = require('./routes/follow.routes');
const likeRoutes = require('./routes/like.routes');
const userRoutes = require('./routes/user.routes');

const errorHandler = require('./middleware/error.middleware');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/follow', followRoutes);
app.use('/api/likes', likeRoutes);
app.use('/api/users', userRoutes);

app.use(errorHandler);

module.exports = app;