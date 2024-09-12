module.exports=app=>{
const task=require("../controller/controller.task.js")
let router= require("express").Router();
router.post("/",task.create)
router.get("/",task.findAll)
router.get("/search/",task.findSearch)
router.get("/:id",task.findOne)
router.put("/:id",task.update)
router.delete("/:id",task.deleteById)
router.delete("/",task.deleteAll)
router.patch("/:id",task.updateOne)


app.use('/api/task',router);

    
}