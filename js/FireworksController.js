function FireworksController(p) {
  this.p = p
  this.shells = []
  this.initialShells = 5
  this.maxShells = 10
  this.sparks = []
  this.minSparks = 100
  this.maxSparks = 190
  this.chanceForNewShell = 1 / 15
  this.whiteChance = 0.2
  this.minColors = 2
  this.maxColors = 3

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
      const numColors = p.round(p.random(this.minColors, this.maxColors))

      // Choose a random set of colors for a shell when it explodes
      for (let c = 0; c < numColors; c++) {
        // Some percentage of the time, bump saturation to 0 to get some white sparks
        const saturation =
          p.random(1) < this.whiteChance && numColors > 2 ? 0 : 100
        const color = p.color(p.random(100), saturation, 100)
        colors.push(color)
      }

      for (let i = 0; i < numSparks; i++) {
        const color = colors[p.floor(p.random(colors.length))]
        // get a copy of the parent shells position so everything is independent
        const sparkPosition = shell.position.copy()
        this.sparks.push(new Spark(p, sparkPosition, color))
      }

      // remove the spent shell and continue so we don't call update/render on it
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
