const express = require('express')
const router = express.Router()

const Todo = require('../models/todoModel')





router.get('/',async (req, res)=>{
   const todoList = await Todo.find()
    res.json(todoList)
})

router.post('/',async (req, res)=>{
try {
    const { todo } = req.body
    const todoItem = {
        todo: todo,
        isCompleted: false,
    } 

    await Todo.create(todoItem)
    const todoList = await Todo.find()
    const newTodo = todoList[todoList.length-1]
    res.json(newTodo)
   
    

} catch (error) {
    res.status(400).json({
        message:error.message,
    })
}
})

router.put('/', async (req, res)=>{
    try {
        const {todo, _id, status} = req.body
    
    const fieldsToUpdate = {
        todo:todo,
        status:status
    }

    const updateData = await Todo.findByIdAndUpdate(_id, fieldsToUpdate, {new: true})
   
    await Todo.find()

    if(updateData){
    return res.json(updateData)
    }

    }catch (error) {
        res.status(404).json({
            message: error.message
        })
    }     
})


router.delete('/', async (req, res)=>{
    try {
        const { _id } = req.body

   const deletItem = await Todo.findByIdAndDelete(_id)

  
   res.json(deletItem)
    
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
    
})


module.exports = router