let debug = false

const sketch = p => {
  let controller

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight).parent('sketch')
    p.colorMode(p.HSB, 100, 100, 100, 1.0)
    p.background(10)
    controller = new FireworksController(p)
  }

  p.draw = () => {
    p.background(10, 0.15)
    controller.render()
  }
}

const mySketch = new p5(sketch)
