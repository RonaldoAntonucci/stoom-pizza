const jsonServer = require('json-server')
const data = require('./server.json')

const server = jsonServer.create()
const router = jsonServer.router('server.json')
const middlewares = jsonServer.defaults()


server.use(jsonServer.bodyParser)
server.use(middlewares)

server.use('/order', (req, res) => {
  console.log(req.body)

  let isDaily = true;

  if (data.recommendation.dough.id !== req.body.dough.id) {
    isDaily = false;
  }


  const requestIngredients = req.body.ingredients;

  data.recommendation.ingredients.forEach((ingredient, index) => {
    if (!requestIngredients[index] || requestIngredients[index].id !== ingredient.id) {
      isDaily = false;
    }
  })

  const response = req.body

  if (isDaily) {
    response.dailyRecommendation = true;
    response.points = data.recommendation.points
  }

  res.json(response)
})

server.use(router)



server.listen(3333, () => {
  console.log('JSON Server is running')
})