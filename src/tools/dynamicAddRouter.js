let data = [
  {name: "test", path: "/test", component: "@/views/test.vue"},
  {name: "test1", path: "/test1", component: "@/views/test1.vue"},
];

let routers = [];

(function (data) {
  data.forEach(detail => {
    let {name, path, component} = detail
    routers.push({
      name,
      path,
      ["component"]() {
        import(component)
      }})
  })

})(data)

console.log(routers)



