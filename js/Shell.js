function Shell(p) {
  this.p = p
  this.position = p.createVector(p.random(50, p.width - 50), p.height)
  const x = this.position.x
  const randomX =
    x < p.width * 0.33
      ? p.random(0.1, 0.2)
      : x > p.width * 0.66 ? p.random(-0.2, -0.1) : 0
  const yVelScale = p.height / 100 + 1
  this.velocity = p.createVector(randomX, p.random(-yVelScale, -yVelScale / 2))
  this.gravity = p.createVector(0, 0.05)
  this.maxY = p.height
  this.alpha = p.random(1)
}

Shell.prototype.remove = function() {
  return this.velocity.y > -1.5 || this.position.y < -30
}

Shell.prototype.update = function() {
  this.position.add(this.velocity)
  this.velocity.add(this.gravity)
}

Shell.prototype.render = function() {
  if (this.velocity.y < 0) {
    const p = this.p
    p.fill(100, this.alpha)
    p.ellipse(this.position.x, this.position.y, 5, 5)
  }
}
