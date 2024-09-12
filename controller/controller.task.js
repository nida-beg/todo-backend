const db = require("../models");
const Task = db.task;
exports.create = (req, res) => {
    if (!req.body.title) {
        res.status(400).send({ message: "Title can not empty!" });
        return;
    }
    const task = new Task({
        title: req.body.title,
        description: req.body.description,
        status: req.body.status

    })
    task
        .save(task)
        .then(data => {
            res.send({ message: "task added successfully", data: data });
        })

        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the task"
            })
        }
        )


}
exports.findAll = (req, res) => {
    Task
        .find()
        .then(data => {
            res.send({ message: "data fetched successfully", data: data })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "some error occured while fething the tasks"
            })
        })

}

exports.findSearch = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
    Task.find( condition)
        .then(data => {
            res.send({ message: "data fetched successfully", data: data })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "some error occured while fething the tasks"
            })
        })

}

exports.update = (req, res) => {
    const id = req.params.id;
    const data = req.body;
    console.log("id", id)
    console.log("data", data)
    if (id === null || id === 'null') {
        res.status(400).send({
            message: "id cannot be empty."
        })
        return;
    }
    if (data === null || data === 'null' || Object.keys(data).length === 0) {
        res.status(400).send({
            message: "body cannot be empty."
        })
        return;
    }

    Task.findByIdAndUpdate(id, data).then(response => {
        res.status(200).send({
            message: "Data updated successfully."
        })
    })
        .catch(err => {
            res.status(500).send({
                message: err.message || "some error occured while updating the tasks"
            })
        })
}

exports.findOne = (req, res) => {
    Task.findById(req.params.id)
        .then(response => {
            res.status(200).send({
                message: "data fetched successfully", data: response
            })

        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "some error occured while fetching"
            })
        })
}
exports.deleteById = (req, res) => {
    Task.deleteOne({ _id: req.params.id })
        .then(response => {
            res.status(200).send({
                message: "data deleted successfully",
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "some error occured while deleting data"
            })
        })
}
exports.deleteAll = (req, res) => {
    Task.deleteMany()
        .then(() => {
            res.status(200).send({
                message: "All task has been deleted"

            })
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "some error occured while deleting "
            })
        })
}
exports.updateOne = (req, res) => {
    console.log("response",req.body)
    Task.findByIdAndUpdate(req.params.id, { status: req.body.status })
        .then((response) => {
            res.status(200).send({
                message: "updated successfully"
            })


        })

        .catch((err) => {
            res.status(500).send({
                message: "some error occured while updating status"
            })
        })

}



