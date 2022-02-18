const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json"); // <== Will be created later
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 5000; // <== You can change the port

server.use(middlewares);
// server.use(jsonServer.rewriter({
//   // '/api/*': '/$1',
//   // '/http://localhost:5000/appointments/*': '/$1',
//   // '/blog/:resource/:id/show': '/:resource/:id'
// }))
server.use('/api', router)
server.use(router);

server.listen(port);