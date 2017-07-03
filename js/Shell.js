function Shell(p) {
  this.p = p
  this.position = p.createVector(p.random(50, p.width - 50), p.height)
  this.velocity = p.createVector(p.random(-0.2, 0.2), p.random(-6.75, -3.5))
  this.gravity = p.createVector(0, 0.05)
  this.maxY = p.height
  this.alpha = p.random(1)
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
    p.fill(100, this.alpha)
    p.ellipse(this.position.x, this.position.y, 5, 5)
  }
}
