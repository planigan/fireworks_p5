function Shell(p) {
  this.p = p
  this.position = p.createVector(p.random(50, p.width - 50), p.height)
  const x = this.position.x
  // scale velocity based on canvas size
  const yVelScale = p.height / 100 + 2
  // give a little bit of random x towards the middle from the outer 1/3s
  const randomX =
    x < p.width * 0.33
      ? p.random(2 / yVelScale, 4 / yVelScale)
      : x > p.width * 0.66 ? p.random(-2 / yVelScale, -4 / yVelScale) : 0
  this.velocity = p.createVector(randomX, p.random(-yVelScale, -yVelScale / 2))
  this.gravity = p.createVector(0, 0.06)
  this.maxY = p.height
  this.alpha = p.random(1)
}

Shell.prototype.remove = function() {
  // explode when the shell gets slow or after leaving the top of the canvas
  return this.velocity.y > -1.5 || this.position.y < -30
}

Shell.prototype.update = function() {
  this.position.add(this.velocity)
  this.velocity.add(this.gravity)
}

Shell.prototype.render = function() {
  const p = this.p
  p.fill(100, this.alpha)
  p.ellipse(this.position.x, this.position.y, 5, 5)
}
