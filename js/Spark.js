function Spark(p, position, color) {
  this.p = p
  this.position = position
  this.velocity = p5.Vector.random2D()
  this.velocity.mult(p.random(-1, 2.5))
  this.gravity = p.createVector(0, 0.015)
  this.color = color
  this.maxY = p.windowHeight
  this.maxX = p.windowWidth
  this.lifespan = 100
  this.framesLeft = this.lifespan
}

Spark.prototype.remove = function() {
  const done =
    this.position.y > this.maxY ||
    this.position.x < 0 ||
    this.position.x > this.maxX ||
    this.framesLeft <= 0
  if (done && debug) {
    console.log(this.position.y, this.velocity.x, this.velocity.y)
  }
  return done
}

Spark.prototype.update = function() {
  this.position.add(this.velocity)
  this.velocity.add(this.gravity)
  this.framesLeft--
}

Spark.prototype.render = function() {
  if (this.position.y < this.maxY) {
    const p = this.p
    const alpha = this.framesLeft / this.lifespan
    const newColor = p.color(p.hue(this.color), 100, 100, alpha)
    p.fill(newColor)
    p.ellipse(this.position.x, this.position.y, 4, 4)
  }
}
