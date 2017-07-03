let debug = false

const sketch = p => {
  this.shells = []
  this.maxShells = 20
  this.sparks = []
  this.minSparks = 100
  this.maxSparks = 190
  this.chanceForNewShell = 1 / 10

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight).parent('sketch')
    p.colorMode(p.HSB, 100, 100, 100, 1.0)
    p.background(10)
    this.shells.push(new Shell(p))
    this.shells.push(new Shell(p))
    this.shells.push(new Shell(p))
  }

  p.draw = () => {
    p.background(10, 0.15)

    if (
      this.shells.length <= this.maxShells &&
      p.random() < this.chanceForNewShell
    ) {
      this.shells.push(new Shell(p))
    }

    for (let i = this.shells.length - 1; i >= 0; i--) {
      const shell = this.shells[i]

      if (shell.remove()) {
        const numSparks = p.random(this.minSparks, this.maxSparks)
        const colors = []
        for (let c = 0; c < p.random(3); c++) {
          const color = p.color(p.random(100), 100, 100)
          colors.push(color)
        }
        for (let i = 0; i < numSparks; i++) {
          const color = colors[p.floor(p.random(colors.length))]
          sparks.push(new Spark(p, shell.position.copy(), color))
        }
        this.shells.splice(i, 1)
        continue
      }

      shell.update()
      shell.render()
    }
    for (let i = this.sparks.length - 1; i >= 0; i--) {
      const spark = sparks[i]

      if (spark.remove()) {
        this.sparks.splice(i, 1)
        continue
      }

      spark.update()
      spark.render()
    }
    debug &&
      console.log(
        'Sparks: ' + this.sparks.length + ' Shells: ' + this.shells.length
      )
  }
}

function Spark(p, position, color) {
  this.p = p
  this.position = position
  this.velocity = p5.Vector.random2D()
  this.velocity.mult(p.random(-3, 3))
  this.gravity = p.createVector(0, 0.02)
  this.color = color
  this.maxY = p.height
}

Spark.prototype.remove = function() {
  return this.position.y > this.maxY + 100
}

Spark.prototype.update = function() {
  this.position.add(this.velocity)
  this.velocity.add(this.gravity)
}

Spark.prototype.render = function() {
  if (this.velocity.y < 0) {
    const p = this.p
    p.fill(this.color)
    p.ellipse(this.position.x, this.position.y, 4, 4)
  }
}

function Shell(p) {
  this.p = p
  this.position = p.createVector(p.random(0, p.width), p.height)
  this.velocity = p.createVector(p.random(-0.2, 0.2), p.random(-7.75, -4.5))
  this.gravity = p.createVector(0, 0.05)
  this.maxY = p.height
  // console.log(this.velocity.y)
}

Shell.prototype.remove = function() {
  return this.velocity.y > -1.5
}

Shell.prototype.update = function() {
  this.position.add(this.velocity)
  this.velocity.add(this.gravity)
}

Shell.prototype.render = function() {
  if (this.velocity.y < 0) {
    const p = this.p
    p.fill(100, 0.9)
    p.ellipse(this.position.x, this.position.y, 5, 5)
  }
}

const mySketch = new p5(sketch)
