const { notFound, errHandler } = require("../middlewares");
const userRouter = require("./user.routes");
const galleryRouter = require("./gallery.routes");
const conversationRouter = require("./conversation.routes");
const rootApiV1 = "/api/v1";

const initRoute = (app) => {
  app.use(`${rootApiV1}/user`, userRouter);
  app.use(`${rootApiV1}/gallery`, galleryRouter);
  app.use(`${rootApiV1}/conversation`, conversationRouter);
  app.use(notFound);
  app.use(errHandler);
};

module.exports = initRoute;
