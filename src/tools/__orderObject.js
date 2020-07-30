/**
 * 实现一个有序对象
 * */


function orderify() {
  let index = 0
  let obj = Object.create(null)

  obj.$set = function (key, value) {
    this[key] = {value, index: index++}
  }

  return obj
}

let obj = orderify()

console.log(obj)

obj.$set("name", "xie")
obj.$set("age", 22)
obj.$set("gender", "male")

console.log(obj)


let obj1 = orderify()

console.log(obj1)

obj1.$set("name", "hu")
obj1.$set("age", 21)
obj1.$set("gender", "female")

console.log(obj1)

for (let key in obj) {
  console.log(key)
}
