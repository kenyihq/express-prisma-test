import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
// Importando Prisma Client
// Importando Prisma Client
import { PrismaClient } from '@prisma/client'

dotenv.config();

// Iniciando el cliente
const prisma = new PrismaClient()
const app: Express = express();
const port = process.env.PORT;
app.use(express.json());
app.get('/', (req: Request, res: Response) => {
  res.send('We ya tienes el servidor encendido =)');
});

app.listen(port, () => {
  console.log(`El servidor se ejecuta en http://localhost:${port}`);
});

app.post("/author", async (req, res) => {
  const { name, email } = req.body;
  const user = await prisma.user.create({
    data: {
      name: name,
      email: email,
    },
  });
  res.json(user);
});

app.post("/post", async (req, res) => {
  const { title, content, author } = req.body;
  const result = await prisma.post.create({
    data: {
      title: title,
      content: content,
      author: { connect: { id: author } },
    },
  });
  res.json(result);
});

// GET

app.get("/authors", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.get("/authors/:id", async (req, res) => {
  const { id } = req.params;
  const user = await prisma.user.findMany({
    where: { id: parseInt(id) },
  });
  res.json(user);
});
