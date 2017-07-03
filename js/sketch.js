let debug = false

const sketch = p => {
  this.shells = []
  this.initialShells = 5
  this.maxShells = 10
  this.sparks = []
  this.minSparks = 100
  this.maxSparks = 190
  this.chanceForNewShell = 1 / 15

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight).parent('sketch')
    p.colorMode(p.HSB, 100, 100, 100, 1.0)
    p.background(10)
    for (let i = 0; i < this.initialShells; i++) {
      this.shells.push(new Shell(p))
    }
  }

  p.draw = () => {
    p.background(10, 0.15)

    if (
      this.shells.length < this.maxShells &&
      p.random() < this.chanceForNewShell
    ) {
      this.shells.push(new Shell(p))
    }

    for (let i = this.shells.length - 1; i >= 0; i--) {
      const shell = this.shells[i]

      if (shell.remove()) {
        const numSparks = p.random(this.minSparks, this.maxSparks)
        const colors = []
        const numColors = p.random(3)

        for (let c = 0; c < numColors; c++) {
          const white = p.random(1) < 0.1 && numColors > 2 ? 0 : 100
          const color = p.color(p.random(100), white, 100)
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

const mySketch = new p5(sketch)
