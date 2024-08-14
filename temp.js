let a = 1
function fn(a = 3) {
  a = 2
}
fn((a = 4))
console.log(a)
