function FireworksController(p) {
  this.p = p
  this.shells = []
  this.initialShells = 5
  this.maxShells = 10
  this.sparks = []
  this.minSparks = 100
  this.maxSparks = 190
  this.chanceForNewShell = 1 / 15

  for (let i = 0; i < this.initialShells; i++) {
    this.shells.push(new Shell(p))
  }
}

FireworksController.prototype.render = function() {
  const p = this.p
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
        this.sparks.push(new Spark(p, shell.position.copy(), color))
      }

      this.shells.splice(i, 1)
      continue
    }

    shell.update()
    shell.render()
  }

  for (let i = this.sparks.length - 1; i >= 0; i--) {
    const spark = this.sparks[i]

    if (spark.remove()) {
      this.sparks.splice(i, 1)
      continue
    }

    spark.update()
    spark.render()
  }
}
