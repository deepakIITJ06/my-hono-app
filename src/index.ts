import { Hono } from 'hono'

const app = new Hono()

async function middleware(c: any,next: any) {
  if(c.req.header("Authorization")) {
    next();
  }else {
    return c.json({
      msg: "Good to go"
    });
  }
}

// app.use(middleware); // --> every time request goes it will run

app.post('/',middleware, async (c) => {
  // body, headers, query parameters, middlewares, connecting to a database
  const bod = await c.req.json();
  console.log(bod);
  const head = c.req.header("Authorization");
  console.log(head);
  console.log(c.req.query("param"));
  return c.text('Hello Hono!')
})

export default app
